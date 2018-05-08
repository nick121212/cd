import React from "react";
import { SchemaFormItemProps, hocFactory } from "fx-schema-form-react";
import { connect } from "react-redux";
import { shouldUpdate, compose, onlyUpdateForKeys } from "recompose";
import isEqual from "lodash.isequal";
import { mapMetaStateToProps } from "fx-schema-form-react/libs/hocs/select";

import MetaHoc from "../hocs/meta";
import { BaseComponent } from "../../component/index";

export interface FormItemTempProps extends SchemaFormItemProps {
    tempKey: string;
}

@(MetaHoc(hocFactory as any, {
    keys: ["isShow", "dirty", "isValid", "errorText", "isShow", "isLoading"]
}) as any)
export class FormItemTemp extends BaseComponent<FormItemTempProps, any> {
    public render(): JSX.Element {
        const { children, ItemButtons, mergeSchema, tempKey, meta, getTitle } = this.props;
        const { dirty = false, isValid = true, errorText = "",
            isShow = true, isLoading = false } = meta ? meta.toJS() : {};
        const ItemButtonsComponent: JSX.Element = ItemButtons ? <ItemButtons /> :
            <h4 className="ma1 pa0">{getTitle(this.props) || [].concat(mergeSchema.keys).pop()}</h4>;

        return (
            <div className="ma3">
                <label className="f6 b db mb2">
                    {ItemButtonsComponent}
                    {mergeSchema.isRequired ? <span className="normal black-60">(required)</span> : null}
                </label>
                {children}
                {mergeSchema.description ?
                    <small id="name-desc" className="f7 ma2 black-60 db">{mergeSchema.description}</small> : null}
                {isValid ? null : <small id="name-desc" className="f7 red db ma2">{errorText}</small>}
            </div>
        );
    }
}
