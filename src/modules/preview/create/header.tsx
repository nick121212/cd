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
        const { $updateProxyModel, history, saveHandle } = this.props;
        const { loading, loaded, error, data } = $updateProxyModel.toJS();

        return (
            <CommandBar
                isSearchBoxVisible={false}
                items={[{
                    key: "back",
                    name: "",
                    icon: "Back",
                    onClick: () => {
                        history.push("/preview");
                    }
                }, {
                    key: "title",
                    name: "预览" + (data ? "--" + data.name : ""),
                    icon: "View"
                }, {
                    key: "loading" + loading,
                    className: "flex items-center",
                    onRender: () => {
                        return loading ? <Spinner size={SpinnerSize.small} /> : null;
                    }
                }]}
            />
        );
    }
}

export const ComponentWithHoc = hoc(Component);
