
import React from "react";
import { onlyUpdateForKeys } from "recompose";
import Immutable from "immutable";
import { SchemaFormItemBaseProps, RC, UtilsHocOutProps } from "fx-schema-form-react";
import { BaseFactory } from "fx-schema-form-core";
import { ConditionHocOutProps } from "./condition";
import { BaseComponent } from "../../component/index";

export interface ShHocOutProps extends SchemaFormItemBaseProps, UtilsHocOutProps, ConditionHocOutProps {
}

export interface ShHocOutSettings {
    path: string;
    jsonata?: string;
    uiSchemas?: any[];
}

/**
 * oneof装饰器
 * 这里解析一种特殊的schema字段oneof
 * {
 *  "name":{
 *      "oneof":[{"type":"string"},{"type":"number"}]
 *  }
 * }
 * 必须接口conditionHoc使用
 * @param hocFactory  hoc的工厂方法
 * @param Component   需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: ShHocOutSettings = { path: "", jsonata: "" }) => {
    return (Component: any): RC<ShHocOutProps, any> => {
        @(onlyUpdateForKeys(["condition"]) as any)
        class ComponentHoc extends BaseComponent<ShHocOutProps, any> {
            public render(): JSX.Element {
                let { getPathKeys, mergeSchema } = this.props;
                let { condition, ...extraProps } = this.props;
                const { path = null, jsonata = null, uiSchemas = {} } = settings || {};
                const { keys } = mergeSchema;

                if (!path) {
                    return <Component {...this.props} />;
                }

                let keys1 = getPathKeys(keys, path);
                let data = condition.getIn(keys1);

                if (mergeSchema.oneOf && uiSchemas[data]) {
                    let { index, uiSchema } = uiSchemas[data];
                    let mergeNewSchema = Object.assign({}, this.props.mergeSchema, mergeSchema.oneOf[index], {
                        keys: keys
                    });

                    mergeNewSchema.uiSchema.items = uiSchema;

                    return <Component key={keys.join("-") + data} {...extraProps} mergeSchema={mergeNewSchema} />;
                }

                return <Component {...extraProps} />;
            }
        }

        return ComponentHoc as any;
    };
};
