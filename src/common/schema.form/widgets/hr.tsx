import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { BaseComponent } from "../../component/index";

export interface Props extends SchemaFormItemProps {
}

export class HrWidget extends BaseComponent<Props, any> {

    public render(): JSX.Element {
        const { getWidgetOptions, formItemData } = this.props;
        const widgetOptions = getWidgetOptions(this.props, "hr");

        return <hr {...widgetOptions} {...widgetOptions} {...this.setDefaultProps() } />;
    }

    private setDefaultProps(): any {
        let props: any = {};

        props = this.props.formItemData ? this.props.formItemData.toJS() : {};

        return props;
    }
}
