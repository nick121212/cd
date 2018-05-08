import { combineReducers } from "redux-immutable";
import undoable from "redux-undo-immutable";
import { Action } from "redux";

import { PanelComponent } from "../../../common/widgets/index";
import { updateProxyModel, reducerKey, schemaFormModel, formOptions } from "./constant";

const actionCanUndoRedo = ["添加元素", "更新表单值", "删除元素"];


export { Component } from "./component";
export { reducerKey } from "./constant";
export const reducer = combineReducers({
    $updateProxyModel: updateProxyModel.reducer,
    [formOptions.schemaKey]: undoable(schemaFormModel.reducer, {
        limit: 30,
        actionFilter: (action: Action) => {
            return actionCanUndoRedo.reduce((prev: boolean, cur: string) => {
                return prev || new RegExp(cur).test(action.type);
            }, false);
        }
    })
});

export const actions = [
    updateProxyModel.actions.execute
];
export const sagas = [
    updateProxyModel.saga.bind(updateProxyModel)
];
