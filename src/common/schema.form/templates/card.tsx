import React from "react";
import { connect } from "react-redux";
import { shouldUpdate, compose, onlyUpdateForKeys } from "recompose";
import isEqual from "lodash.isequal";
import { mapMetaStateToProps } from "fx-schema-form-react/libs/hocs/select";
import { SchemaFormItemProps, ArrayHocOutProps, hocFactory } from "fx-schema-form-react";
import MetaHoc from "../hocs/meta";
import { BaseComponent } from "../../component/base";

export interface CardTempProps extends SchemaFormItemProps, ArrayHocOutProps {
    tempKey: string;
}

@(MetaHoc(hocFactory as any, {
    keys: ["isShow", "dirty", "isValid", "errorText", "isShow", "isLoading"]
}) as any)
export class CardTemp extends BaseComponent<CardTempProps, any> {
    public render(): JSX.Element {
        const { children, tempKey, ItemButtons, getTempOptions, getTitle, meta, mergeSchema } = this.props;
        const tempOptions = getTempOptions(this.props, tempKey);
        const { dirty = false, isValid = true, errorText = "", isShow = true } = meta ? meta.toJS() : {};
        const ItemButtonsComponent: JSX.Element = ItemButtons ? <ItemButtons /> :
            <div className="bb">
                <h3 className="ma2 pa0">{getTitle(this.props)}</h3>
            </div>;

        return (
            <div className={"ma1 ba b--dashed"}>
                {ItemButtonsComponent}
                <span style={{
                    display: isShow ? "block" : "none",
                    height: "100%"
                }}>
                    {children}
                </span>
                {isValid ? null : <small className="f6 red db mb2">{errorText}</small>}
                {mergeSchema.description ? <small className="f7 black db moon-gray ma1">
                    {mergeSchema.description}</small> : null}
            </div>
        );
    }
}
