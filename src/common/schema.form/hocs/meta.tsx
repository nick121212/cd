
import React from "react";
import { compose, shouldUpdate, onlyUpdateForKeys } from "recompose";
import { connect } from "react-redux";
import merge from "lodash.merge";
import Immutable from "immutable";
import { SchemaFormItemBaseProps, RC, ThemeHocOutProps, conFactory } from "fx-schema-form-react";
import { BaseFactory } from "fx-schema-form-core";
import { createSelector } from "reselect";


let defaultCON = conFactory.get("default");

const mapMetaStateToProps = (keys: Array<string>) => {

    if (!keys || !keys.length) {
        return {};
    }

    return createSelector([defaultCON.getItemMeta.bind(defaultCON)], (meta: any) => {
        let rtns: Immutable.Map<string, any> = Immutable.fromJS({});

        if (!keys || !meta) {
            return {};
        }

        keys.forEach((k: string) => {
            if (meta.has(k)) {
                rtns = rtns.set(k, meta.get(k));
            }
        });

        return { meta: rtns };
    });
};

/**
 * 特殊的field hoc
 * 这里更改了uiSchema的配置，来实现动态更改字段显示方式的功能
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {}) => {
    return (Component: any): RC<SchemaFormItemBaseProps, any> => {
        @(shouldUpdate(() => false) as any)
        @connect(mapMetaStateToProps(settings.keys))
        // @(onlyUpdateForKeys(["meta"]) as any)
        class ComponentHoc extends React.PureComponent<SchemaFormItemBaseProps, any> {
            public render(): JSX.Element {
                return <Component {...this.props} />;
            }
        }

        return ComponentHoc as any;
    };
};
