import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Component as LayoutComponent } from "./main";
import { Component as CreateComponent } from "./create";

/**
 * 路由元素
 */
export default class Component extends React.PureComponent<any, any> {
    public render() {
        return [
            <Route key="panel-main" path="/panel" component={LayoutComponent} />,
            <Route key="panel-create" path="/panel/create" component={CreateComponent} />,
            <Route key="panel-edit" path="/panel/edit/:id" component={CreateComponent} />,
        ];
    }
}

