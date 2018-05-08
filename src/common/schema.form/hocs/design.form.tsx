
import React from "react";
import { compose, shouldUpdate } from "recompose";
import { connect } from "react-redux";
import { Callout, DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IconButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import classnames from "classnames";
import {
    SchemaFormItemBaseProps, RC,
    ThemeHocOutProps, UtilsHocOutProps, ArrayHocOutProps,
    SchemaFormCreate
} from "fx-schema-form-react";
import { mapFormItemDataProps, mapMetaStateToProps } from "fx-schema-form-react/libs/hocs/select";
import { SchemaForm } from "fx-schema-form-react/libs/components/form";
import { BaseFactory } from "fx-schema-form-core";

import { ExtraFieldHocOutProps } from "./field";
import { globalOptions } from "../index";
import MetaHoc from "./meta";
import { BaseComponent } from "../../component/index";

export interface DesignFormOutProps extends SchemaFormItemBaseProps, ExtraFieldHocOutProps,
    ThemeHocOutProps, ArrayHocOutProps, UtilsHocOutProps {
    designComponent?: any;
}

/**
 * hoc
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {}) => {
    return (Component: any): RC<DesignFormOutProps, any> => {
        @(shouldUpdate(() => false) as any)
        class ComponentHoc extends BaseComponent<DesignFormOutProps, any> {
            public render(): any {
                let { mergeSchema, schemaFormOptions, schemaKey,
                    reducerKeys,
                    formItemData, arrayIndex, toggleItem, meta = {}, arrayLevel } = this.props;
                let { keys } = mergeSchema;
                let options = this.props.getFormItemData(this.props);
                const hocOptions = this.props.getHocOptions(this.props, "designForm");

                if (hocOptions.design === false) {
                    return [
                        <Component key={keys.join("-") + "design.form1"} {...this.props} />,
                        <span key={keys.join("-") + "design.form2"} className="dn">
                            {
                                options.edit ? <SchemaForm
                                    arrayIndex={arrayIndex}
                                    schemaFormOptions={schemaFormOptions}
                                    schemaKey={schemaKey}
                                    arrayLevel={arrayLevel}
                                    reducerKeys={reducerKeys}
                                    schema={options.edit.schema}
                                    parentKeys={mergeSchema.originKeys.concat(["data"])}
                                    uiSchema={options.edit.uiSchemaPrd ?
                                        options.edit.uiSchemaPrd(mergeSchema.originKeys) :
                                        (options.edit.uiSchema(mergeSchema.originKeys) || ["*"])}
                                    globalOptions={globalOptions}>
                                </SchemaForm> : null
                            }
                        </span>
                    ];
                }

                return <Component key={keys.join("-") + "design.form"} {...this.props} designComponent={
                    options.edit ? <SchemaForm
                        key={keys.join("-") + "edit.form" + options.label}
                        arrayIndex={arrayIndex}
                        schemaFormOptions={schemaFormOptions}
                        schemaKey={schemaKey}
                        arrayLevel={arrayLevel}
                        reducerKeys={reducerKeys}
                        schema={options.edit.schema}
                        parentKeys={mergeSchema.originKeys.concat(["data"])}
                        uiSchema={options.edit.uiSchema ? options.edit.uiSchema(mergeSchema.originKeys) : ["*"]}
                        globalOptions={globalOptions}>
                    </SchemaForm> : null
                } />;
            }
        }

        return ComponentHoc as any;
    };
};
