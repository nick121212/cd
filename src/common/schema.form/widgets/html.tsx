import React, {SyntheticEvent} from "react";
import {SchemaFormItemProps} from "fx-schema-form-react";
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from "react-html-parser";
import {BaseComponent} from "../../component/index";

export interface Props extends SchemaFormItemProps {}

export class HtmlWidget extends BaseComponent <Props, any> {

    public render(): JSX.Element {
        const {getWidgetOptions, formItemData} = this.props;
        const widgetOptions = getWidgetOptions(this.props, "hr");

        return <div {...widgetOptions} {...this.setDefaultProps() }>
            {formItemData ? ReactHtmlParser(formItemData.toJS().html) : null }
        </div>;
    }

    private setDefaultProps(): any {
        let props: any = {};

        // props = this.props.formItemData
        //     ? this
        //         .props
        //         .formItemData
        //         .toJS()
        //     : {};

        return props;
    }
}
