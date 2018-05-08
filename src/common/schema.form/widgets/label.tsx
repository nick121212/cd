import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { Label } from "office-ui-fabric-react/lib/Label";
import merge from "lodash.merge";
import { onlyUpdateForKeys, compose, shouldUpdate } from "recompose";
import { BaseComponent } from "../../component/index";

export interface Props extends SchemaFormItemProps {
}

export class LabelWidget extends BaseComponent<Props, any> {

    public render(): JSX.Element {
        const { getWidgetOptions, meta } = this.props;
        const widgetOptions = getWidgetOptions(this.props, "label");
        let { text = "", ...widgetOpts } = this.setDefaultProps();

        return <div {...widgetOptions} {...widgetOpts}>
            <span className="db" dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, "<br/>") }}>
            </span>
        </div>;
    }

    private setDefaultProps(): any {
        let { meta } = this.props;
        let props: any = {};
        let { formItemData = {} } = meta ? meta.toJS() : {};

        props = this.props.formItemData ? this.props.formItemData.toJS() : {};

        merge(props, formItemData);

        return props;
    }
}
