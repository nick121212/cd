import { combineReducers } from "redux-immutable";
import { PanelComponent } from "../../../common/widgets/index";
import { listProxyModel, removeProxyModel, reducerKey, paginationModel, removeConfirm } from "./constant";

export { Component } from "./component";
export { reducerKey } from "./constant";
export const reducer = combineReducers({
    $listProxyModel: listProxyModel.reducer,
    $removeProxyModel: removeProxyModel.reducer,
    $removeConfirm: removeConfirm.getReducer()
});

export const actions = [
    listProxyModel.actions.execute,
    removeProxyModel.actions.execute,
    paginationModel.actions.setInfo,
    paginationModel.actions.next,
    paginationModel.actions.prev,
    ...removeConfirm.getActions()
];
export const sagas = [
    listProxyModel.saga.bind(listProxyModel),
    removeProxyModel.saga.bind(listProxyModel)];
