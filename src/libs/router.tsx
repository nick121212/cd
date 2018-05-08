import React from "react";
import { TransitionGroup } from "react-transition-group";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import * as Immutable from "immutable";
import { createHashHistory, History } from "history";

import * as main from "../modules/main";
import * as panel from "../modules/panel";
import * as preview from "../modules/preview";
import * as source from "../modules/source";
import * as message from "../modules/message";
// import * as article from "../modules/article";

/**
 * 返回history的实例
 */
export const historyInstance: History = createHashHistory({ basename: "/" });

/**
 * 路由元素
 */
export default (
    <Router>
        <div>
            <Switch>
                <Route path="/preview1/:id" component={preview.CreateComponent} />
                <Route path="/preview2/:id" component={preview.ComponentPreview} />
                <Route>
                    <div>
                        <main.Component />
                        <Switch>
                            <Route path="/panel" component={panel.Component} />
                            <Route path="/preview" component={preview.Component} />
                            <Route path="/source" component={source.Component} />
                            {/* <Route path="/article" component={article.Component} /> */}
                        </Switch>
                    </div>
                </Route>
            </Switch>
            <message.Component />
        </div>
    </Router>
);
