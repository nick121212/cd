
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
import { SchemaFormCreate } from "fx-schema-form-react/libs/libs/create";

export interface JsonataOutProps extends SchemaFormItemProps, UtilsHocOutProps, ConditionHocOutProps {
    actions: any;
}

export interface JsonataOutSettings {
    dataPath: string;
    mergePath: string;
}

/**
 * 控制显示隐藏的hoc
 * 必须接口conditionHoc使用
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>,
    settings: JsonataOutSettings = { dataPath: "", mergePath: "" }) => {
    return (Component: any): RC<JsonataOutProps, any> => {
        // 匹配{}中的内容
        const regexp = /@(S*?)[^@]*@/ig;

        @connect(mapFormItemDataProps)
        // @(onlyUpdateForKeys(["condition"]) as any)
        class ComponentHoc extends BaseComponent<JsonataOutProps, any> {
            private _timeId: any;

            private calcCalue() {
                let { dataPath, mergePath } = settings;
                let { getPathKeys, mergeSchema, actions, formItemData, schemaKey,
                    condition, updateItemData, updateItemMeta, validate } = this.props;
                let { keys } = mergeSchema;
                let metaInfo = SchemaFormCreate.metas[schemaKey];

                if (!dataPath || !mergePath) {
                    return;
                }

                let data = condition.getIn(getPathKeys(keys.concat(["/"]), dataPath));
                let mergeKeys = getPathKeys(keys.concat(["/"]), mergePath);
                let curMetaData = metaInfo.getMeta(mergeKeys);

                if (!data || !formItemData || formItemData.constructor !== String) {
                    return actions.updateItemMeta({
                        keys,
                        meta: {
                            formItemData: null
                        }
                    });
                }

                let matchs = formItemData.match(regexp);
                data = data.toJS();

                if (matchs && matchs.length) {
                    matchs.forEach(element => {
                        let match = element.replace(/^@|@$/ig, "");

                        try {
                            formItemData = formItemData.replace(element, Jsonata(match).evaluate(data));
                        } catch (e) {
                            formItemData = formItemData.replace(element, "<!--语法错误-->");
                        }
                    });
                    actions.updateItemMeta({
                        keys,
                        meta: {
                            formItemData: formItemData
                        }
                    });
                } else {
                    actions.updateItemMeta({
                        keys,
                        meta: {
                            formItemData: null
                        }
                    });
                }
            }

            public componentWillUnmount() {
                this.props.actions.removeItemMap({
                    keys: this.props.mergeSchema.keys
                });
            }

            public componentWillMount() {
                this.calcCalue();
            }

            public componentDidUpdate() {
                this.calcCalue();
            }

            public render(): JSX.Element {
                let { keys } = this.props.mergeSchema;
                let { condition, ...extraProps } = this.props;

                // console.log("jsonata render",this.props.);

                return <Component key={keys.join("jsonata")} {...extraProps} />;
            }
        }

        return ComponentHoc as any;
    };
};
