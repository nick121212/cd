import React from "react";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import {
    Spinner,
    SpinnerSize
} from "office-ui-fabric-react/lib/Spinner";

import { BaseComponent } from "../../../common/component";
import { SourceMainProps } from "./constant";
import { hoc } from "./container";

export class Component extends BaseComponent<SourceMainProps, any> {
    public render() {
        const { $listProxyModel, $removeProxyModel, listHandle, history } = this.props;
        const { loading, loaded } = $listProxyModel.toJS();

        return (
            <CommandBar
                isSearchBoxVisible={false}
                items={[{
                    key: "back",
                    name: "",
                    icon: "Back",
                    onClick: () => {
                        history.push("/");
                    }
                }, {
                    key: "title",
                    name: "数据源",
                    icon: "Database"
                }]}
                farItems={[{
                    key: "loading" + loading,
                    className: "flex items-center",
                    onRender: () => {
                        return loading ? <Spinner size={SpinnerSize.small} /> : null;
                    }
                }, {
                    key: "refresh" + loading,
                    disabled: loading,
                    name: "刷新",
                    icon: "Refresh",
                    onClick: () => {
                        listHandle();
                    }
                }, {
                    key: "new" + loading,
                    disabled: loading,
                    name: "新建",
                    icon: "Add",
                    className: "ms-CommandBarItem",
                    onClick: () => {
                        history.push("/source/create");
                    }
                }]}
            />
        );
    }
}

export const ComponentWithHoc = hoc(Component);
