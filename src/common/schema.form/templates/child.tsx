import React from "react";
import classNames from "classnames";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { BaseComponent } from "../../component/index";

export interface DivTempProps extends SchemaFormItemProps {
    tempKey: string;
}

export class ChildTemp extends BaseComponent<DivTempProps, any> {
    public render(): any {
        const { children, globalOptions, tempKey, uiSchemaOptions, mergeSchema, getTempOptions } = this.props;
        const { className, ...tempOptions } = getTempOptions(this.props, tempKey);

        return children;
    }
}
