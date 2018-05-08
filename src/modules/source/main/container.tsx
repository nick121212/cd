import { Dispatch } from "redux";
import { connect } from "react-redux";
import { compose, withHandlers, lifecycle, } from "recompose";
import Immutable from "immutable";
import { Action } from "redux-act";

import {
    reducerKey, reducerKeys, SourceMainProps,
    listProxyModel, removeProxyModel, proxySettings,
    paginationModel, removeConfirm
} from "./constant";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        $listProxyModel: state.getIn(reducerKeys.concat(["$listProxyModel"])),
        $removeProxyModel: state.getIn(reducerKeys.concat(["$removeProxyModel"]))
    };
};

export const hoc = compose<SourceMainProps, any>(
    connect(mapStateToProps),
    withHandlers({
        listHandle: (props: SourceMainProps) => {
            return async () => {
                let { $listProxyModel } = props;

                if ($listProxyModel.get("loading")) {
                    return;
                }

                let data: Action<any, any> = await listProxyModel.actions.execute({
                    params: {
                        size: 5000
                    }
                }, Object.assign({}, proxySettings.fetch, { loading: listProxyModel.actions.loading }));
            };
        }
    }),
    withHandlers({
        _confirmExecute: (props: SourceMainProps) => {
            return async (item: any) => {
                let data: Action<any, any> = await removeProxyModel.actions.execute({
                    params: {
                        id: item.get("id")
                    }
                }, Object.assign({}, proxySettings.remove, { loading: removeProxyModel.actions.loading }));

                if (!data.meta.loaded) {
                    throw data.payload;
                }
                props.listHandle();
            };
        },
    })
);

export const hocList = compose<SourceMainProps, any>(
    removeConfirm.getContainer(hoc),
    lifecycle<SourceMainProps, any>({
        componentDidMount: function () {
            this.props.listHandle();
        }
    }));
