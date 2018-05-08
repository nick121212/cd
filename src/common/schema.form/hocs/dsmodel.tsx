
import React from "react";
import { compose, shouldUpdate, ComponentEnhancer, onlyUpdateForKeys } from "recompose";
import { connect } from "react-redux";
import { ModelProxy } from "modelproxy";
import merge from "lodash.merge";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";
import Jsonata from "jsonata";
import Immutable from "immutable";
import jpp from "json-pointer";

import {
    SchemaFormItemBaseProps, RC, UtilsHocOutProps, SchemaFormItemProps
} from "fx-schema-form-react";
import { mapFormItemDataProps, mapMetaStateToProps, mapFormDataToProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
import { ConditionHocOutProps } from "./condition";
import { BaseComponent } from "../../component/index";

export interface ShHocOutProps extends SchemaFormItemProps, UtilsHocOutProps, ConditionHocOutProps {
    actions: any;
}

export interface ShHocOutSettings {
    path: string;
    proxyInfo?: any;
    interval?: number;
}

/**
 * dsmodel包装器
 * 必须接口conditionHoc使用
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: ShHocOutSettings = {
    path: "", proxyInfo: {}, interval: 1000
}) => {
    return (Component: any): RC<ShHocOutProps, any> => {
        @(onlyUpdateForKeys(["condition"]) as any)
        @connect(mapFormItemDataProps)
        class ComponentHoc extends BaseComponent<ShHocOutProps, any> {
            private _timeid: any;
            private _isBusy: boolean = false;

            private getProxyData(id: number) {
                let proxy = this.props.getHocOptions(this.props, "proxy").proxy;
                let proxyInfo = settings.proxyInfo;

                return proxy.execute(proxyInfo.ns, proxyInfo.key, {
                    params: {
                        dsModelId: id,
                    }
                });
            }

            /**
             * 获取dsmodel的数据，并存储到字段数据中去
             * 判断数据是否存在
             * 数据中的meta建立，包括key，interval，以及updateAt
             * 判断now-updateAt>interval么，如果大于，则重新拉取数据
             */
            private async getModelData() {
                let { getPathKeys, mergeSchema, condition, actions, formItemData, updateItemData } = this.props;
                let { path = null } = settings || {};
                let { keys } = mergeSchema;

                if (!path) {
                    return;
                }

                let data = condition.getIn(getPathKeys(keys, path));

                if (!data) {
                    this._timeid = setTimeout(() => {
                        this.getModelData();
                    }, 1000);
                    return;
                }
                this._isBusy = true;

                data = data.toJS();

                formItemData.get("ids").mapKeys((k: string) => {
                    if (data.indexOf(Number(k)) < 0) {
                        let idInfo = formItemData.getIn(["ids", k]);

                        formItemData = formItemData.removeIn(["ids", k]);
                        formItemData = formItemData.removeIn(["data", idInfo.get("key")]);
                    }
                });

                // console.log("start fetch ds model", Date.now());
                let promises = [], now = Date.now();

                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        let id = data[key];
                        if (id) {
                            let interval = +formItemData.getIn(["ids", id.toString(), "interval"]),
                                updateAt = +formItemData.getIn(["ids", id.toString(), "updateAt"]);

                            // 如果meta中loaded不存在，获取间隔时间到，则重新拉取服务器数据
                            if (!formItemData.hasIn(["ids", id.toString(), "loaded"])
                                || (interval && now - updateAt > interval)) {
                                promises.push(this.getProxyData(+id).then((proxyInfo) => {
                                    formItemData = formItemData.setIn(["ids", id.toString()],
                                        Immutable.fromJS({
                                            loaded: true,
                                            key: proxyInfo.key,
                                            updateAt: Date.now(),
                                            interval: proxyInfo.timeGap
                                        }));
                                    formItemData = formItemData.setIn(["data", proxyInfo.key || id.toString()],
                                        Immutable.fromJS(proxyInfo.value));
                                }).catch((e) => {
                                    formItemData = formItemData.setIn(["ids", id.toString()],
                                        Immutable.fromJS({ loaded: false, errorMessage: e.message }));
                                }));
                            }
                        }
                    }
                }

                await Promise.all(promises).then(() => {
                    if (promises.length) {
                        // setTimeout(() => {
                        updateItemData(formItemData);
                        // }, 20);
                    }

                    this._isBusy = false;
                }).catch((e) => {
                    console.error(e);
                    this._isBusy = false;
                });


                this._timeid = setTimeout(() => {
                    this.getModelData();
                }, 1000);
            }

            public componentWillUnmount() {
                clearTimeout(this._timeid);
            }

            public componentWillMount() {
                this.getModelData();
            }

            public render(): JSX.Element {
                const { condition, ...extraProps } = this.props;

                return <Component key={extraProps.mergeSchema.keys.join("dsModels")} {...extraProps} />;
            }
        }

        return ComponentHoc as any;
    };
};
