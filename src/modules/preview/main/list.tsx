import React from "react";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { List } from "office-ui-fabric-react/lib/List";
import { IconButton } from "office-ui-fabric-react/lib/Button";

import { BaseComponent } from "../../../common/component";
import { SourceMainProps, removeConfirm } from "./constant";
import { hocList } from "./container";

export class Component extends BaseComponent<SourceMainProps, any> {
    public render() {
        const { $listProxyModel, $removeProxyModel, listHandle, toggleConfirm, history } = this.props;
        const { loading, loaded, data } = $listProxyModel.toJS();


        return (
            <FocusZone direction={FocusZoneDirection.vertical}>
                <div className="ms-Grid-row h-100 pa0 ma0 overflow-hidden">
                    {
                        data ? data.content.map((item: any, index: number) => {
                            return (
                                <article key={index.toString()} onClick={
                                    () => {
                                        history.push("/preview/edit/" + item.id);
                                    }
                                } className="ms-Grid-col bg-white pa3 ms-sm12 ms-md6 ms-xl4">
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
                                    </div>
                                </article>
                            );
                        }) : null
                    }
                </div>
            </FocusZone>
        );
    }
}

export const ComponentWithHoc = hocList(Component);
