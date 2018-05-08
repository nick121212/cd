import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import merge from "lodash.merge";
// import handleViewport from "react-in-viewport";

import { Image, ImageCoverStyle, ImageFit } from "office-ui-fabric-react/lib/Image";
import { BaseComponent } from "../../component/index";

export interface Props extends SchemaFormItemProps {
}

const textareaStyle = {
    top: 0,
    right: 0,
    left: 0,
    background: "rgba(255,255,255,.5)",
    outline: "none",
    border: "none",
    resize: "none",
    pointerEvents: "none"
};

const aStyle = {
    top: 0,
};

export class ImageWidget extends BaseComponent<Props, any> {

    public render(): JSX.Element {
        const { mergeSchema, getTitle, getWidgetOptions } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const widgetOptions = getWidgetOptions(this.props, "image");
        let { title, className, srcs, link, style, ...options } = this.setDefaultProps();

        if (srcs) {
            if (srcs.constructor === String) {
                srcs = [srcs];
            }
            if (srcs.constructor !== Array) {
                srcs = [];
            }
        }

        return <div className={"relative " + className}>
            {
                srcs ? srcs.map((src: string, index: number) => {
                    return <Image
                        key={index}
                        className={className}
                        {...widgetOptions}
                        {...options }
                        src={src}
                    />;
                }) : null
            }

            <a style={aStyle}
                className={"absolute w-100 h-100 dib"} href={link ? link : "javascript:;"}>
                {title ? <textarea className="absolute b w-100 tr pa1 f7" style={textareaStyle}
                    readOnly value={title}></textarea> : null}
            </a>
        </div>;
    }

    private setDefaultProps(): any {
        const { mergeSchema, meta } = this.props;
        let props: any = {};
        let { formItemData = {} } = meta ? meta.toJS() : {};

        if (this.props.formItemData !== undefined) {
            props = this.props.formItemData.toJS();
        }

        props = merge({}, props, formItemData || {});

        return props;
    }
}
