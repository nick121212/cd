import React from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { BaseComponent } from "../../component/index";

export interface Props extends SchemaFormItemProps {
}

export class NumberWidget extends BaseComponent<Props, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const widgetOptions = getWidgetOptions(this.props, "number");

        return <TextField
            onChanged={(val: any) => {
                if (!val) {
                    return updateItemData(0);
                }
                updateItemData(val * 1);
            }}
            onBlur={(e: any) => {
                updateItemMeta(1 * e.target.value);
            }}
            placeholder={getTitle(this.props)}
            {...widgetOptions}
            {...this.setDefaultProps() }
        />;
    }

    private setDefaultProps(): any {
        const { mergeSchema } = this.props;
        const props: any = {};

        if (this.props.formItemData) {
            props.value = this.props.formItemData.toString();
        } else {
            props.value = 0;
        }

        return props;
    }
}
