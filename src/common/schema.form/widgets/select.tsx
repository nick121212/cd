import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import Select from "react-select-plus";

export interface Props extends SchemaFormItemProps {
}

export class SelectWidget extends React.Component<Props, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const { readonly = false } = uiSchema as any;
        const { onChange, ...widgetOptions } = getWidgetOptions(this.props, "select");

        return <Select
            onChange={(option: any) => {
                updateItemData(option.value);
                updateItemMeta(option.value);

                if (onChange) {
                    onChange(this.props, option);
                }
            }}
            options={
                [
                    {
                        label: "Primary Colors", options: [
                            { label: "Yellow", value: "yellow" },
                            { label: "Red", value: "red" },
                            { label: "Blue", value: "blue" }
                        ]
                    },
                    {
                        label: "Secondary Colors", options: [
                            { label: "Orange", value: "orange" },
                            {
                                label: "Purple", options: [
                                    { label: "Light Purple", value: "light_purple" },
                                    { label: "Medium Purple", value: "medium_purple" },
                                    { label: "Dark Purple", value: "dark_purple" }
                                ]
                            },
                            { label: "Green", value: "green" }
                        ]
                    },
                    {
                        label: "White",
                        value: "white",
                    }
                ]
            }
            disabled={readonly}
            {...widgetOptions}
            {...this.setDefaultProps() }
        />;
    }

    private setDefaultProps(): any {
        const { mergeSchema } = this.props;
        const props: any = {};

        if (this.props.formItemData !== undefined) {
            props.value = this.props.formItemData;
        }

        return props;
    }
}
