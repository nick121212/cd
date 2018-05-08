
import React from "react";
import { compose, shouldUpdate } from "recompose";
import { connect } from "react-redux";

import { SchemaFormItemBaseProps, RC, ThemeHocOutProps, ValidateHocOutProps } from "fx-schema-form-react";
import { BaseFactory } from "fx-schema-form-core";

/**
 * hoc
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {}) => {
    return (Component: any): RC<SchemaFormItemBaseProps, any> => {
        @(shouldUpdate((prev: SchemaFormItemBaseProps, next: SchemaFormItemBaseProps) => {
            return false;
        }) as any)
        class ComponentHoc extends React.PureComponent<SchemaFormItemBaseProps, any> {
            public render(): JSX.Element {
                return <Component {...this.props} />;
            }
        }

        return ComponentHoc as any;
    };
};
