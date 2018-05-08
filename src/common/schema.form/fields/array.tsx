import React from "react";
import { connect } from "react-redux";
import { nsFactory, SchemaForm, SchemaFormItemProps, RC, hocFactory } from "fx-schema-form-react";
import { mapFormItemDataProps } from "fx-schema-form-react/libs/hocs/select";
import { compose, shouldUpdate } from "recompose";
import { BaseComponent } from "../../component/index";

export interface ArryFieldProps extends SchemaFormItemProps {

}

/**
 * 数组字段的生成规则
 */
// @(compose(connect(mapFormItemDataProps)) as any)
@(compose(
    shouldUpdate(() => false) as any,
    connect(mapFormItemDataProps),
    shouldUpdate((prev: ArryFieldProps, next: ArryFieldProps) => {
        let { formItemData } = prev;
        let { formItemData: formItemData1 } = next;

        if (!formItemData || !formItemData1) {
            return true;
        }

        if (formItemData.size === formItemData1.size) {
            return false;
        }

        return true;
    })
) as any)
export class ArrayField extends BaseComponent<ArryFieldProps, any> {
    /**
     * 遍历数据，生成子表单
     * @param idx 数组的索引
     */
    private renderItem(idx: number): JSX.Element {
        const { mergeSchema, schemaKey, globalOptions, schemaFormOptions, reducerKeys,
            getCurrentState, ItemChildButtons, arrayLevel = [], getFieldOptions
            } = this.props;
        const { uiSchema, keys } = mergeSchema;

        return (
            <SchemaForm
                key={idx}
                schema={mergeSchema}
                arrayIndex={idx}
                reducerKeys={reducerKeys}
                arrayLevel={arrayLevel.concat([idx])}
                ItemButtons={(props) => <ItemChildButtons {...this.props} { ...props} arrayIndex={idx} />}
                parentKeys={mergeSchema.originKeys}
                RootComponent={getFieldOptions(this.props, "array").root}
                schemaKey={schemaKey}
                uiSchema={uiSchema.items || ["*"]}
                schemaFormOptions={schemaFormOptions}
                globalOptions={globalOptions}>
            </SchemaForm>
        );
    }

    /**
     * 渲染页面
     */
    public render(): JSX.Element | null {
        const { mergeSchema, currentTheme, WidgetComponent, schemaKey, globalOptions, schemaFormOptions, formItemData,
            meta = { dirty: false, isValid: true, isShow: true }
        } = this.props;
        const { uiSchema, title } = mergeSchema;
        let child;

        child = formItemData && formItemData.map((data: any, idx: number) => {
            return this.renderItem(idx);
        });

        return child || null;
    }
}
