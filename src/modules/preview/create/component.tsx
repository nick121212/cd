import React from "react";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import classnames from "classnames";
import { shouldUpdate } from "recompose";

import { BaseComponent } from "../../../common/component";
import { ComponentWithHoc as HeaderComponent } from "./header";
import { ComponentWithHoc as DegisnComponent } from "./design";
import { ComponentWithHoc as FormComponent } from "./form";
import { ComponentWithHoc as FormPreviewComponent } from "./form.preview";
import { SourceCreateProps } from "./constant";


@(shouldUpdate(() => false) as any)
class ComponentWithDrog extends React.PureComponent<SourceCreateProps, any> {
    public render() {
        let { match, location, history } = this.props;

        return <div className="ms-Grid-row h-100 pa0 ma0 overflow-hidden">
            <div className="ms-Grid-col ms-sm12 overflow-auto pa0 ma0 h-100">
                <DegisnComponent history={history} match={match} location={location} />
            </div>
            <div className="dn">
                <FormComponent history={history} match={match} location={location} />
            </div>
        </div>;
    }
}

@(shouldUpdate(() => false) as any)
class ComponentWithDrogPreview extends React.PureComponent<SourceCreateProps, any> {
    public render() {
        let { match, location, history } = this.props;

        return <div className="ms-Grid-row h-100 pa0 ma0 overflow-hidden">
            <div className="ms-Grid-col ms-sm12 overflow-auto pa0 ma0 h-100">
                <DegisnComponent history={history} match={match} location={location} />
            </div>
            <div className="dn">
                <FormPreviewComponent history={history} match={match} location={location} />
            </div>
        </div>;
    }
}

@(shouldUpdate(() => false) as any)
export class Component extends BaseComponent<SourceCreateProps, any> {
    public render() {
        const { children, history, match, location } = this.props;

        return (
            <Panel isOpen={true}
                key={"panel-design"}
                className="h-100"
                onRenderNavigation={() => {
                    return <HeaderComponent history={history} match={match} location={location} />;
                }}
                onRenderBody={() => {
                    return <ComponentWithDrog history={history} match={match} location={location} />;
                }}
                type={PanelType.smallFluid}>
            </Panel>
        );
    }
}
@(shouldUpdate(() => false) as any)
export class ComponentPreview extends BaseComponent<SourceCreateProps, any> {
    public render() {
        const { children, history, match, location } = this.props;

        return (
            <Panel isOpen={true}
                key={"panel-design"}
                className="h-100"
                hasCloseButton={false}
                onRenderNavigation={() => {
                    return null;
                }}
                onRenderHeader={() => {
                    return null;
                }}
                onRenderBody={() => {
                    return <ComponentWithDrogPreview history={history} match={match} location={location} />;
                }}
                type={PanelType.smallFluid}>
            </Panel>
        );
    }
}
@(shouldUpdate(() => false) as any)
export class ComponentNoTitle extends BaseComponent<SourceCreateProps, any> {
    public render() {
        const { children, history, match, location } = this.props;

        return (
            <Panel isOpen={true}
                key={"panel-design"}
                className="h-100"
                headerClassName="dn"
                hasCloseButton={false}
                onRenderNavigation={() => {
                    return null;
                }}
                onRenderHeader={() => {
                    return null;
                }}
                onRenderBody={() => {
                    return <ComponentWithDrog history={history} match={match} location={location} />;
                }}
                type={PanelType.smallFluid}>
            </Panel>
        );
    }
}
