import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Component as LayoutComponent } from "./main";
import { Component as CreateComponent } from "./create";

// import { ComponentWithHoc as HeadComponent } from "./head";
// import { ComponentWithHoc as FooterComponent } from "./footer";

/**
 * 路由元素
 */
export default class Component extends React.PureComponent<any, any> {
    public render() {
        return [
            <Route key="source-main" path="/source" component={LayoutComponent} />,
            <Route key="source-create" path="/source/create" component={CreateComponent} />,
            <Route key="source-edit" path="/source/edit/:id" component={CreateComponent} />,
            // <Route key="main-content" component={MainLayoutComponent} />,
            // <Route key="main-footer" component={FooterComponent} />
        ];
    }
}

