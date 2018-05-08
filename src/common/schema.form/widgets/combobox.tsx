import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import {
    ComboBox,
    IComboBoxProps,
    IComboBoxOption,
    VirtualizedComboBox
} from "office-ui-fabric-react/lib/ComboBox";
import { shouldUpdate } from "recompose";

import { BaseComponent } from "../../component/index";

export interface ComboBoxWidgetProps extends SchemaFormItemProps {
}

export class ComboBoxWidget extends BaseComponent<ComboBoxWidgetProps, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const { readonly = false } = uiSchema as any;
        const { onChanged, ...widgetOptions } = getWidgetOptions(this.props, "combobox");

        return <ComboBox
            onChanged={(option: IComboBoxOption, index: number, value: string) => {
                if (index !== undefined) {
                    updateItemData(option.key);
                    updateItemMeta(option.key);
                }

                if (onChanged) {
                    onChanged(this.props, option, index, value);
                }
            }}
            placeholder={getTitle(this.props)}
            disabled={readonly}
            {...widgetOptions}
            {...this.setDefaultProps() }
        />;
    }

    private setDefaultProps(): any {
        const { mergeSchema, meta } = this.props;
        const props: any = {};
        let { options = [] } = meta ? meta.toJS() : {};

        if (this.props.formItemData !== undefined) {
            props.selectedKey = this.props.formItemData;
        }

        if (options && options.length) {
            props.options = options;
        }

        return props;
    }
}
