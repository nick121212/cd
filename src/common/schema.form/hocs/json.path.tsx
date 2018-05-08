
import React from "react";
import { compose, shouldUpdate, onlyUpdateForKeys } from "recompose";
import { connect } from "react-redux";
import merge from "lodash.merge";
import Immutable from "immutable";
import { SchemaFormItemBaseProps, RC, ThemeHocOutProps, conFactory, UtilsHocOutProps } from "fx-schema-form-react";
import { BaseFactory } from "fx-schema-form-core";
import jpp from "json-pointer";
import { BaseComponent } from "../../component/index";
/**
 * 特殊的field hoc
 * 这里更改了uiSchema的配置，来实现动态更改字段显示方式的功能
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {
    dataPath: ""
}) => {
    return (Component: any): RC<SchemaFormItemBaseProps, any> => {
        @(onlyUpdateForKeys(["condition"]) as any)
        class ComponentHoc extends React.PureComponent<SchemaFormItemBaseProps &
        UtilsHocOutProps & { condition: any, actions: any }, any> {

            private calcJsonPath() {
                const { condition, ...extraProps } = this.props;
                const { keys } = extraProps.mergeSchema;
                let dataKeys = extraProps.getPathKeys(keys, settings.dataPath);
                let data = condition.getIn(dataKeys).toJS();
                let options = [], optionsMap = {};

                jpp.walk(data, (val: any, key: string) => {
                    let keyA = key.split("/");

                    keyA.shift();
                    keyA = keyA.map((k: any) => {
                        if (!Number.isNaN(Number(k))) {
                            return "";
                        }
                        if (k) {
                            return `"${k}"`;
                        }
                        return null;
                    });

                    keyA = keyA.filter((k: string) => {
                        return !!k;
                    });

                    if (!optionsMap.hasOwnProperty(keyA.join("."))) {
                        options.push({
                            display: keyA.join("->").replace(/\"/ig, ""),
                            id: keyA.join(".")
                        });
                        optionsMap[keyA.join(".")] = true;
                    }
                });

                extraProps.actions.updateItemMeta({
                    keys,
                    meta: {
                        options
                    }
                });
            }

            public componentDidUpdate(props: any) {
                this.calcJsonPath();
            }

            // public componentDidMount() {
            //     this.calcJsonPath();
            // }

            public render(): JSX.Element {
                const { condition, ...extraProps } = this.props;

                return <Component key={extraProps.mergeSchema.keys.join("jsonpath")} {...extraProps} />;
            }
        }

        return ComponentHoc as any;
    };
};
