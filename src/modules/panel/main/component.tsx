import React from "react";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";

import { BaseComponent } from "../../../common/component";
import { ComponentWithHoc as HeaderComponent } from "./header";
import { ComponentWithHoc as ListComponent } from "./list";
import { SourceMainProps } from "./constant";

export class Component extends BaseComponent<SourceMainProps, any> {
    public render() {
        const { children, history, match, location } = this.props;

        return (
            <Panel isOpen={true}
                onRenderNavigation={() => {
                    return <HeaderComponent history={history} match={match} location={location} />;
                }}
                type={PanelType.smallFluid}>
                <ListComponent history={history} match={match} location={location} />
            </Panel>
        );
    }
}
