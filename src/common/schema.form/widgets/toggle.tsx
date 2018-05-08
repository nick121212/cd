import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { Toggle, IToggleProps } from "office-ui-fabric-react/lib/Toggle";
import { BaseComponent } from "../../component/index";

export interface ToggleProps extends SchemaFormItemProps {
}

export class ToggleWidget extends BaseComponent<ToggleProps, any> {

    public render(): JSX.Element {
        const { mergeSchema, arrayIndex, globalOptions,
            uiSchemaOptions, getWidgetOptions, updateItemMeta, updateItemData } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const { readonly = false } = uiSchema as any;

        return (
            <Toggle label={""}
                onChanged={(checked: boolean) => {
                    updateItemData(checked);
                    updateItemMeta(checked);
                }}
                readonly={readonly}
                {...getWidgetOptions(this.props, "toggle") }
                {...this.setDefaultProps() } />
        );
    }

    private setDefaultProps(): IToggleProps {
        const { mergeSchema } = this.props;
        const props: IToggleProps = {};

        if (this.props.formItemData !== undefined) {
            props.checked = this.props.formItemData;
        }

        return props;
    }
}
