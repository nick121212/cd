import { Dispatch } from "redux";
import { connect } from "react-redux";
import { compose, withHandlers, lifecycle, } from "recompose";
import Immutable from "immutable";
import { Action } from "redux-act";

import { userProxyModel, reducerKeys, proxySettings } from "./constant";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        $user: state.getIn(reducerKeys),
    };
};

export const hoc = compose<any, any>(
    connect(mapStateToProps),
    lifecycle({
        componentWillMount: function () {
            userProxyModel.actions.execute({
                params: {
                    redirect_uri: location.href
                }
            }, Object.assign({}, proxySettings.isLogin, { loading: userProxyModel.actions.loading }));
        }
    })
);
