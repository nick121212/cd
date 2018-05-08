
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
    SchemaFormItemBaseProps, RC, UtilsHocOutProps, SchemaFormItemProps, SchemaFormCreate
} from "fx-schema-form-react";
import { mapFormItemDataProps, mapMetaStateToProps, mapFormDataToProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
import { ConditionHocOutProps } from "./condition";
import { BaseComponent } from "../../component/index";

export interface JsonataOutProps extends SchemaFormItemProps, UtilsHocOutProps, ConditionHocOutProps {
    actions: any;
}

export interface JsonataOutSettings {
    dataPath: string;
    mergePath: string;
    pathKeys: Array<string>;
    removeKeys: Array<string>;

    replace?: boolean;
}

/**
 * 控制显示隐藏的hoc
 * 必须接口conditionHoc使用
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>,
    settings: JsonataOutSettings = { dataPath: "", mergePath: "", pathKeys: [], removeKeys: [] }) => {
    return (Component: any): RC<JsonataOutProps, any> => {
        // 匹配{}中的内容
        const regexp = /\{\{((?:.|\n)+?)\}\}/g;

        @(compose(
            onlyUpdateForKeys(["condition"]),
            connect(mapFormItemDataProps)
        ) as any)
        class ComponentHoc extends BaseComponent<JsonataOutProps, any> {
            private _timeId: any;

            private calcCalue(remove: boolean = false) {
                let { dataPath, mergePath, pathKeys, removeKeys, replace = false } = settings;
                let { getPathKeys, mergeSchema, actions, formItemData,
                    condition, updateItemMeta, schemaKey } = this.props;
                let { keys } = mergeSchema;
                let metaInfo = SchemaFormCreate.metas[schemaKey];

                if (!dataPath || !mergePath || !pathKeys || !removeKeys) {
                    return;
                }

                let data = condition.getIn(getPathKeys(keys.concat(["/"]), dataPath));
                let mergeKeys = getPathKeys(keys.concat(["/"]), mergePath);
                let arrayLevel = this.props.arrayLevel.concat([]);

                let pathKey = jpp.compile(pathKeys.map((key: string) => {
                    if (key === "-") {
                        return arrayLevel.pop().toString();
                    }
                    return key;
                }));
                arrayLevel = this.props.arrayLevel.concat([]);
                let removeKey = jpp.compile(removeKeys.map((key: string) => {
                    if (key === "-") {
                        return arrayLevel.pop().toString();
                    }
                    return key;
                }));

                let curMetaData = metaInfo.getMeta(mergeKeys) || {};
                let matchs = formItemData ? formItemData.match(regexp) : null;

                // console.log("jsonata start", keys, Date.now());
                if (data && matchs && matchs.length && !remove) {
                    data = data.toJS();

                    matchs.forEach(element => {
                        let match = element.replace(/^{{|}}$/ig, "");
                        // replace负责处理字符串的部分
                        if (replace) {
                            try {
                                formItemData = formItemData.replace(element, Jsonata(match).evaluate(data) || "");
                            } catch (e) {
                                formItemData = formItemData.replace(element, "<!--语法错误-->");
                            }
                        } else {
                            try {
                                formItemData = Jsonata(match).evaluate(data);
                            } catch (e) {
                                console.log(e);
                            }
                            return false;
                        }
                    });


                    if (formItemData) {
                        jpp(curMetaData).set(pathKey, formItemData);
                        actions.updateItemMeta({
                            keys: mergeKeys,
                            meta: curMetaData
                        });
                    }
                } else {
                    if (jpp(curMetaData).has(pathKey)) {
                        jpp(curMetaData).remove(pathKey);
                    }

                    actions.updateItemMeta({
                        keys: mergeKeys,
                        meta: curMetaData
                    });
                }

                // console.log("jsonata end", keys, Date.now());
            }

            public componentWillUnmount() {
                // this.props.actions.removeItemMap({
                //     keys: this.props.mergeSchema.keys
                // });
                // clearTimeout(this._timeId);
                this.calcCalue(true);
            }

            public componentDidUpdate() {
                // clearTimeout(this._timeId);
                // this._timeId = setTimeout(() => {
                this.calcCalue();
                // }, 300);
            }

            public componentDidMount() {
                // clearTimeout(this._timeId);
                // this._timeId = setTimeout(() => {
                // this.calcCalue();
                // }, 300);
            }

            public render(): JSX.Element {
                let { keys } = this.props.mergeSchema;
                let { ...extraProps } = this.props;

                return <Component key={keys.join("jsonata")} {...extraProps} />;
            }
        }

        return ComponentHoc as any;
    };
};
