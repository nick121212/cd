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
        const { $listProxyModel, $removeProxyModel, listHandle, toggleConfirm, history } = this.props;
        const { loading, loaded, data } = $listProxyModel.toJS();


        return (
            <FocusZone direction={FocusZoneDirection.vertical}>
                <ConfirmWidget {...this.props} dialogOptions={{
                    dialogContentProps: {
                        type: DialogType.close,
                        title: "删除面板",
                        subText: "是否确定要删除此面板？"
                    }
                }} />
                <div className="ms-Grid-row h-100 pa0 ma0 overflow-hidden">
                    {
                        data ? data.content.map((item: any, index: number) => {
                            return (
                                <article key={index.toString()}
                                    className="ms-Grid-col bg-white pa3 ms-sm12 ms-md6 ms-xl4">
                                    <div className="tc ba b--black-10 pa3">
                                        <Icon iconName="FormLibraryMirrored"
                                            className="h4 w4 dib f-headline pa2" />
                                        <h1 className="f3 mb2">
                                            {item.name}
                                        </h1>
                                        <h2 className="f5 fw4 gray mt0">
                                            {item.description}
                                        </h2>
                                        <p className="f6 gray mv1">
                                            {item.createUsername}
                                        </p>

                                        <div className="flex pt2 items-center justify-center">
                                            <a className="flex-auto tc white dib bg-animate bg-dark-blue hover-bg-blue"
                                                href="javascript:;"
                                                onClick={() => {
                                                    history.push("/panel/edit/" + item.id);
                                                }}>
                                                <IconButton
                                                    className="white"
                                                    iconProps={{ iconName: "Edit" }}
                                                    title="编辑"
                                                    ariaLabel="编辑"
                                                />
                                            </a>
                                            <a className="flex-auto tc white dib bg-animate bg-dark-red hover-bg-red"
                                                href="javascript:;"
                                                onClick={() => {
                                                    toggleConfirm(true, item);
                                                }}>
                                                <IconButton
                                                    className="white"
                                                    iconProps={{ iconName: "Delete" }}
                                                    title="删除"
                                                    ariaLabel="删除"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            );
                        }) : null
                    }
                </div>
                {/* <List
                    items={data ? (data.content || []) : []}
                    onRenderCell={(item: any, index: number | undefined) => {
                        return (
                            <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
                                <Icon iconName="SidePanel" className="f5 ma1" />
                                <div>
                                    {item.id}
                                </div>
                                <div className="pl3 flex-auto">
                                    <span className="f6 db black-70">
                                        {item.name}
                                    </span>
                                </div>
                                <div className="f6 flex-auto">
                                    {item.appType}
                                </div>
                                <div className="f6 flex-auto">
                                    {item.createUsername}
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
                                            history.push("/panel/edit/" + item.id);
                                        }}
                                    />
                                </div>
                            </li>
                        );
                    }}
                /> */}
            </FocusZone>
        );
    }
}

export const ComponentWithHoc = hocList(Component);
