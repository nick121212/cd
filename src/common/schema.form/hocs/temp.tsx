
import React from "react";
import { compose, shouldUpdate } from "recompose";
import { connect } from "react-redux";
import merge from "lodash.merge";
import isequal from "lodash.isequal";
import Immutable from "immutable";

import { SchemaFormItemBaseProps, RC, ThemeHocOutProps, SchemaForm } from "fx-schema-form-react";
import { mapFormItemDataProps, mapMetaStateToProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
import { UtilsHocOutProps } from "fx-schema-form-react/libs/hocs/item/utils";
import { ExtraFieldHocOutProps } from "./field";
import { globalOptions } from "../index";
import { BaseComponent } from "../../component/index";

export interface ExtraTempHocOutProps extends SchemaFormItemBaseProps, ThemeHocOutProps,
    ExtraFieldHocOutProps, UtilsHocOutProps {

}

/**
 * hoc
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {
    temp: "",
    children: null
}) => {
    return (Component: any): RC<ExtraTempHocOutProps, any> => {
        @(shouldUpdate(() => false) as any)
        @connect(mapFormItemDataProps)
        // @(shouldUpdate((prev: ExtraTempHocOutProps, next: ExtraTempHocOutProps) => {
        //     let prev1 = prev.formItemData.get("data");
        //     let next1 = next.formItemData.get("data");

        //     if (Immutable.Map.isMap(prev1) && Immutable.Map.isMap(next1)) {
        //         return !prev1.equals(next1);
        //     }

        //     return !isequal(prev1, next1);
        // }) as any)
        class ComponentHoc extends BaseComponent<ExtraTempHocOutProps, any> {
            /**
             * render
             */
            public render(): any {
                const { currentTheme, mergeSchema, formItemData, schemaFormOptions, schemaKey,
                    children, meta, arrayIndex, arrayLevel, reducerKeys } = this.props;
                const tempOptions = this.props.getHocOptions(this.props, "extraTemp");

                let { uiSchema } = mergeSchema;
                let { formItemData: formMetaItemData = {} } = meta || {};
                let options = this.props.getFormItemData(this.props);
                let { keys } = mergeSchema;

                if (options.uiSchema && options.uiSchema["ui:temp"]) {
                    if (Immutable.Map.isMap(formItemData.get("data"))) {
                        let copyData = formItemData.get("data").toJS();

                        if (tempOptions.design) {
                            if (!copyData.className) {
                                copyData.className = "";
                            }

                            copyData.className += " " + options.design.className;
                        }

                        options.uiSchema["ui:temp"].forEach(temp => {
                            uiSchema = merge({}, uiSchema, options.uiSchema, {
                                options: {
                                    template: {
                                        [temp]: merge(copyData, formMetaItemData)
                                    }
                                }
                            });
                        });
                    } else {
                        let copyData: any = {};

                        if (tempOptions.design) {
                            copyData.className += " " + options.design.className;
                        }

                        options.uiSchema["ui:temp"].forEach(temp => {
                            uiSchema = merge({}, uiSchema, options.uiSchema, {
                                options: {
                                    template: {
                                        [temp]: copyData
                                    }
                                }
                            });
                        });
                    }
                }

                return <Component {...this.props} mergeSchema={
                    merge({}, mergeSchema, { uiSchema: uiSchema })
                } />;
            }
        }

        return ComponentHoc as any;
    };
};
