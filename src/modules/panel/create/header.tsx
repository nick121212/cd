import React from "react";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import {
    Spinner,
    SpinnerSize
} from "office-ui-fabric-react/lib/Spinner";

import { BaseComponent } from "../../../common/component";
import { SourceCreateProps } from "./constant";
import { hoc } from "./container";

export class Component extends BaseComponent<SourceCreateProps, any> {
    public render() {
        const { $updateProxyModel, history, saveHandle, undo, redo, $schemaFormPast, $schemaFormFuture } = this.props;
        const { loading, loaded, error } = $updateProxyModel.toJS();

        return (
            <CommandBar
                isSearchBoxVisible={false}
                items={[{
                    key: "back",
                    name: "",
                    icon: "Back",
                    onClick: () => {
                        history.push("/panel");
                    }
                }, {
                    key: "title",
                    name: "设计面板",
                    icon: "SidePanel"
                }]}
                farItems={[{
                    key: "loading" + loading,
                    className: "flex items-center",
                    onRender: () => {
                        return loading ? <Spinner size={SpinnerSize.small} /> : null;
                    }
                }, {
                    key: "undo" + loading + $schemaFormPast.size,
                    disabled: loading || $schemaFormPast.size === 0,
                    onClick: () => {
                        undo();
                    },
                    name: "撤销",
                    icon: "Undo",
                    className: "ms-CommandBarItem"
                }, {
                    key: "redo" + loading + $schemaFormFuture.size,
                    disabled: loading || $schemaFormFuture.size === 0,
                    onClick: () => {
                        redo();
                    },
                    name: "恢复",
                    icon: "Redo",
                    className: "ms-CommandBarItem"
                }, {
                    key: "new" + loading,
                    disabled: loading,
                    onClick: () => {
                        saveHandle();
                    },
                    name: "保存",
                    icon: "Save",
                    className: "ms-CommandBarItem"
                }]}
            />
        );
    }
}

export const ComponentWithHoc = hoc(Component);
