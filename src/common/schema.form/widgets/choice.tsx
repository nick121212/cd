
import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { ChoiceGroup, IChoiceGroupOption } from "office-ui-fabric-react/lib/ChoiceGroup";
import { ProxyHocOutProps } from "../hocs/proxy";
import { BaseComponent } from "../../component/index";

export interface ChoiceGroupWidgetProps extends SchemaFormItemProps, ProxyHocOutProps {
}

export class ChoiceGroupWidget extends BaseComponent<ChoiceGroupWidgetProps, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions, proxyInfo = {} } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const { onChange, ...widgetOptions } = getWidgetOptions(this.props, "choice");

        return <ChoiceGroup
            onChange={(ev: any, option: IChoiceGroupOption) => {
                updateItemData(option.key);
                updateItemMeta(option.key);

                if (onChange) {
                    onChange(this.props, option);
                }
            }}
            {...proxyInfo}
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
