
import React from "react";
import { compose, shouldUpdate } from "recompose";
import { connect } from "react-redux";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IconButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import classnames from "classnames";
import Immutable from "immutable";
import {
    SchemaFormItemBaseProps, RC,
    ThemeHocOutProps, UtilsHocOutProps, ArrayHocOutProps,
    SchemaFormCreate
} from "fx-schema-form-react";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { mapFormItemDataProps, mapMetaStateToProps } from "fx-schema-form-react/libs/hocs/select";
import { SchemaForm } from "fx-schema-form-react/libs/components/form";
import { BaseFactory } from "fx-schema-form-core";

import { ExtraFieldHocOutProps } from "./field";
import { globalOptions } from "../index";
import MetaHoc from "./meta";
import { DesignFormOutProps } from "./design.form";

export interface OptHocOutProps extends SchemaFormItemBaseProps, ExtraFieldHocOutProps,
    ThemeHocOutProps, ArrayHocOutProps, UtilsHocOutProps, DesignFormOutProps {
    actions?: any;
}

/**
 * hoc
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {}) => {
    return (Component: any): RC<OptHocOutProps, any> => {
        @(shouldUpdate(() => false) as any)
        @(MetaHoc(hocFactory, {
            keys: ["isShow"]
        }) as any)
        class ComponentHoc extends React.PureComponent<OptHocOutProps, any> {
            private _menuButtonElement: any | null;

            /**
             * 获取上层的元素操作
             * 遍历arrayLevel数组，来确定当前往上有多少层
             */
            private getParentOpts() {
                let { mergeSchema, getFieldOptions, toggleItem,
                    getHocOptions, actions, schemaKey, arrayLevel } = this.props;
                let { keys } = mergeSchema;
                let menus: any = [];

                keys = keys.concat([]);
                for (let i = arrayLevel.length; i > 1; i--) {
                    let metaInfo = SchemaFormCreate.metas[schemaKey];

                    keys.length = keys.length - 2;

                    let originKeys = keys.concat([]);
                    let { designInfo = {} } = metaInfo.getMeta(keys.concat(["label"])) as any || {};

                    menus = menus.concat([{
                        key: "edit" + designInfo.label,
                        onClick: () => {
                            actions.updateItemMeta({
                                keys: mergeSchema.keys,
                                meta: { isShow: false }
                            });
                            actions.updateItemMeta({
                                keys: originKeys,
                                meta: { isShow: true }
                            });
                        },
                        name: "编辑" + designInfo.label,
                        icon: "Edit",
                        className: "ms-CommandBarItem"
                    }]);
                }


                return menus;
            }

            public componentWillMount() {
                let { actions, mergeSchema, updateItemMeta, toggleItem } = this.props;
                let options = this.props.getFormItemData(this.props);

                if (!options.label) {
                    return;
                }

                actions.updateItemMeta({
                    keys: mergeSchema.keys.concat("label"),
                    meta: {
                        designInfo: {
                            icon: options.icon,
                            label: options.label
                        }
                    }
                });
            }

            public render(): any {
                let { mergeSchema, getFieldOptions, getHocOptions, children, schemaFormOptions, schemaKey,
                    reducerKeys,
                    actions, arrayIndex, toggleItem, meta = {}, arrayLevel } = this.props;
                let { keys } = mergeSchema;
                let options = this.props.getFormItemData(this.props);
                let { isShow = undefined } = meta ? (Immutable.Map.isMap(meta) ? meta.toJS() : meta) : {};

                if (!options.label) {
                    return <Component key={keys.join("-") + "top"} {...this.props} />;
                }

                return [
                    <div key={keys.join("edit")}
                        className="absolute w-100"
                        style={{
                            left: 0,
                            top: 0,
                            zIndex: 999
                        }}>
                        <div className={"absolute"}
                            style={{
                                right: 0,
                                top: 0
                            }} >
                            <IconButton
                                iconProps={{ iconName: "MoreVertical" }}
                                onClick={() => {
                                    actions.updateItemMeta({
                                        keys,
                                        meta: { isShow: !isShow }
                                    });
                                }}
                            />
                        </div>
                        <Panel
                            isOpen={isShow}
                            hasCloseButton={false}
                            isHiddenOnDismiss={true}
                            isLightDismiss={true}
                            type={PanelType.medium}
                            onDismiss={() => {
                                actions.updateItemMeta({
                                    keys,
                                    meta: {
                                        isShow: false
                                    }
                                });
                            }}
                            onRenderHeader={() => {
                                return <CommandBar
                                    isSearchBoxVisible={false}
                                    items={[{
                                        key: "title",
                                        name: `${options.label} - ${arrayLevel.length} - ${arrayIndex + 1}`,
                                        icon: options.icon
                                    }]}
                                    overflowItems={this.getParentOpts()}
                                    farItems={[{
                                        key: "remove",
                                        disabled: arrayLevel.length < 2,
                                        onClick: () => {
                                            let pKeys = keys.concat([]);

                                            pKeys.pop();
                                            actions.removeItem({ keys: pKeys, index: arrayIndex });
                                        },
                                        name: "删除",
                                        icon: "Remove",
                                        className: "ms-CommandBarItem"
                                    }
                                        , {
                                        key: "up",
                                        disabled: arrayLevel.length < 2,
                                        onClick: () => {
                                            let pKeys = keys.concat([]);

                                            pKeys.pop();
                                            actions.switchItem({
                                                keys: pKeys,
                                                curIndex: arrayIndex, switchIndex: arrayIndex - 1
                                            });
                                        },
                                        name: "上移",
                                        icon: "ChevronUp",
                                        className: "ms-CommandBarItem"
                                    }, {
                                        key: "down",
                                        disabled: arrayLevel.length < 2,
                                        onClick: () => {
                                            let pKeys = keys.concat([]);

                                            pKeys.pop();
                                            actions.switchItem({
                                                keys: pKeys,
                                                curIndex: arrayIndex, switchIndex: arrayIndex + 1
                                            });
                                        },
                                        name: "下移",
                                        icon: "ChevronDown",
                                        className: "ms-CommandBarItem"
                                    }
                                    ]}
                                />;
                            }}>
                            <article className={classnames("center h-100 overflow-visible")}>
                                {/* {keys.join("edit") + options.label + arrayIndex} */}
                                <SchemaForm
                                    key={keys.join("edit") + options.label + arrayIndex}
                                    arrayIndex={arrayIndex}
                                    schemaFormOptions={schemaFormOptions}
                                    schemaKey={schemaKey}
                                    arrayLevel={arrayLevel}
                                    reducerKeys={reducerKeys}
                                    schema={options.edit.schema}
                                    parentKeys={mergeSchema.originKeys.concat(["data"])}
                                    uiSchema={options.edit.uiSchema ?
                                        options.edit.uiSchema(mergeSchema.originKeys) : ["*"]}
                                    globalOptions={globalOptions}>
                                </SchemaForm>
                            </article>
                        </Panel>
                    </div>,
                    <Component key={keys.join("-") + arrayIndex + "comonent"} {...this.props} />];
            }
        }

        return ComponentHoc as any;
    };
};
