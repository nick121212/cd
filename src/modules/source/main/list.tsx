import React from "react";
import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { List } from "office-ui-fabric-react/lib/List";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { DialogType } from "office-ui-fabric-react/lib/Dialog";

import { BaseComponent } from "../../../common/component";
import { SourceMainProps, removeConfirm } from "./constant";
import { hocList } from "./container";

const ConfirmWidget = removeConfirm.getComponent();

export class Component extends BaseComponent<SourceMainProps, any> {
    public render() {
        const { $listProxyModel, history, $removeProxyModel, listHandle, toggleConfirm } = this.props;
        const { loading, loaded, data } = $listProxyModel.toJS();


        return (
            <FocusZone direction={FocusZoneDirection.vertical}>
                <ConfirmWidget {...this.props} dialogOptions={{
                    dialogContentProps: {
                        type: DialogType.close,
                        title: "删除数据源",
                        subText: "输出数据源可能会影响到一些面板的数据，是否确定要删除此数据源？"
                    }
                }} />
                <List
                    items={data ? (data.content || []) : []}
                    onRenderCell={(item: any, index: number | undefined) => {
                        return (
                            <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
                                <Icon iconName="Database" className="f5" />
                                <div>
                                    {item.id}
                                </div>
                                <div className="pl3 flex-auto">
                                    <span className="f6 db black-70">
                                        {item.name}
                                    </span>
                                    <span className="f6 db black-70">
                                        {item.type}
                                    </span>
                                </div>
                                <div className="f6">
                                    {item.createTime}
                                </div>
                                <div className="ml2">
                                    <IconButton
                                        iconProps={{ iconName: "Delete" }}
                                        title="删除"
                                        ariaLabel="删除"
                                        onClick={() => {
                                            toggleConfirm(true, item);
                                        }}
                                    />
                                    <IconButton
                                        iconProps={{ iconName: "Edit" }}
                                        title="编辑"
                                        ariaLabel="编辑"
                                        onClick={() => {
                                            history.push("/source/edit/" + item.id);
                                        }}
                                    />
                                </div>
                            </li>
                        );
                    }}
                />
            </FocusZone>
        );
    }
}

export const ComponentWithHoc = hocList(Component);
