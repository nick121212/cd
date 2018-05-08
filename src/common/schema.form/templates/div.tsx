import React from "react";
import classNames from "classnames";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { BaseComponent } from "../../component/index";

export interface DivTempProps extends SchemaFormItemProps {
    tempKey: string;
}

export class DivTemp extends BaseComponent<DivTempProps, any> {
    public render(): JSX.Element {
        const { children, tempKey, getTempOptions } = this.props;
        const { className, ...tempOptions } = getTempOptions(this.props, tempKey);

        return <div {...tempOptions} className={classNames("relative div", className)}>
            {children}
        </div>;
    }
}
