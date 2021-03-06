
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

export interface JsonataOutProps extends SchemaFormItemProps, UtilsHocOutProps, ConditionHocOutProps {
    actions: any;
}

export interface JsonataOutSettings {
    dataPath: string;
    expPath: string;
}

/**
 * 控制显示隐藏的hoc
 * 必须接口conditionHoc使用
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: JsonataOutSettings = { dataPath: "", expPath: "" }) => {
    return (Component: any): RC<JsonataOutProps, any> => {
        @connect(mapFormItemDataProps)
        @(onlyUpdateForKeys(["condition"]) as any)
        class ComponentHoc extends React.Component<JsonataOutProps, any> {
            private _timeId: any;

            private calcCalue() {
                let { dataPath, expPath } = settings;
                let { getPathKeys, mergeSchema, actions,
                    condition, formItemData, updateItemData, updateItemMeta } = this.props;
                let { keys } = mergeSchema;

                if (!dataPath || !expPath) {
                    return;
                }

                let data = condition.getIn(getPathKeys(keys, dataPath));
                let expData = condition.getIn(getPathKeys(keys, expPath));

                if (!data || !expData) {
                    return;
                }

                data = data.toJS();

                expData.map((exp: string) => {
                    if (exp) {
                        try {
                            let aaa = Jsonata(exp).evaluate(data);
                            if (mergeSchema.type === "object" || mergeSchema.type === "array") {
                                formItemData = formItemData.mergeDeep(aaa);
                            } else {
                                formItemData = aaa;
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    }
                });

                // actions.updateItemMeta({
                //     keys,
                //     meta: formItemData
                // });
                // updateItemMeta({
                //     queueItem: {}
                // });
                updateItemData(formItemData);
            }

            public componentDidUpdate() {
                this.calcCalue();
            }

            public componentDidMount() {
                this.calcCalue();
            }

            public render(): JSX.Element {
                return <Component {...this.props} />;
            }
        }

        return ComponentHoc as any;
    };
};
