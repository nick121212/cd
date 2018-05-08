import React from "react";
import { connect } from "react-redux";
import { nsFactory, SchemaForm, SchemaFormItemProps, RC, hocFactory } from "fx-schema-form-react";
import { mapFormItemDataProps } from "fx-schema-form-react/libs/hocs/select";
import { compose, shouldUpdate } from "recompose";
import { ExtraFieldHocOutProps } from "../hocs/field";
import { globalOptions as globalAllOptions } from "../index";
import { BaseComponent } from "../../component/index";

export interface DesignFieldProps extends SchemaFormItemProps, ExtraFieldHocOutProps {

}

/**
 * 数组字段的生成规则
 * 用于
 */
@(compose(
    shouldUpdate(() => false) as any,
    connect(mapFormItemDataProps),
    shouldUpdate((prev: DesignFieldProps, next: DesignFieldProps) => {
        let { formItemData } = prev;
        let { formItemData: formItemData1 } = next;
        let infoOptions = formItemData.get("infoOptions"),
            infoOptions1 = formItemData1.get("infoOptions");

        if (!infoOptions || !infoOptions1) {
            return infoOptions !== infoOptions1;
        }

        if (infoOptions.size === infoOptions1.size) {
            return false;
        }

        return true;
    })
) as any)
export class DesignField extends BaseComponent<DesignFieldProps, any> {
    /**
     * 遍历数据，生成子表单
     * @param idx 数组的索引
     */
    private renderItem(idx: number): JSX.Element {
        const { mergeSchema, schemaKey, globalOptions, schemaFormOptions,
            getCurrentState, ItemChildButtons, arrayLevel = [], arrayIndex, currentTheme, formItemData,
            getFieldOptions, reducerKeys } = this.props;
        const { uiSchema, keys } = mergeSchema;
        const { data = {} } = formItemData;

        delete mergeSchema.uiSchema;

        return (
            <SchemaForm
                key={keys.concat([idx]).join("/")}
                arrayIndex={idx}
                schemaFormOptions={schemaFormOptions}
                schemaKey={schemaKey}
                reducerKeys={reducerKeys}
                arrayLevel={arrayLevel.concat([idx])}
                schema={Object.assign({}, mergeSchema)}
                parentKeys={mergeSchema.originKeys}
                RootComponent={({ children }) => {
                    return children;
                }}
                uiSchema={[{ key: mergeSchema.originKeys.concat(["infoOptions/-"]).join("/") }]}
                globalOptions={globalOptions}>
            </SchemaForm>
        );
    }

    /**
     * 渲染页面
     */
    public render(): any {
        const { children, formItemData, getFormItemData, arrayLevel, reducerKeys, getFieldOptions,
            currentTheme, mergeSchema, arrayIndex, schemaFormOptions, schemaKey, globalOptions } = this.props;
        let child = formItemData && formItemData.get("infoOptions")
            && formItemData.get("infoOptions").map((d: any, idx: number) => {
                return this.renderItem(idx);
            });
        let options = getFormItemData(this.props);


        if (options.uiSchema && options.uiSchema.widget) {
            if (currentTheme.widgetFactory.has(options.uiSchema.widget)) {
                let WidgetComponent = currentTheme.widgetFactory.get(options.uiSchema.widget);

                delete mergeSchema.uiSchema;

                return [
                    <SchemaForm
                        key={mergeSchema.keys.concat(["data"]).join("widget") + options.uiSchema.widget}
                        arrayIndex={arrayIndex}
                        schemaFormOptions={schemaFormOptions}
                        schemaKey={schemaKey}
                        arrayLevel={arrayLevel}
                        reducerKeys={reducerKeys}
                        schema={mergeSchema}
                        parentKeys={mergeSchema.originKeys}
                        RootComponent={getFieldOptions(this.props, "design").root}
                        uiSchema={[{
                            key: mergeSchema.originKeys.concat(["data"]).join("/"),
                            field: "string",
                            widget: options.uiSchema.widget
                        }]}
                        globalOptions={globalOptions}>
                    </SchemaForm>
                ];
            }
        }

        return [children, child || null];
    }
}
