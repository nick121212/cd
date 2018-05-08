import React from "react";
import Immutable from "immutable";
import { RouteComponentProps } from "react-router-dom";
import { ModelProxyReducer } from "../../../common/reducer/proxy";
import { rootReducerKey } from "../constant";
import { PaginationReducer } from "../../../common/reducer/pagination";
import { ConfirmComponent, ConfirmWidgetProps } from "../../../common/widgets/confirm/index";

export const reducerKey = "list";
export const reducerKeys = ["modules", rootReducerKey, reducerKey];
export interface SourceMainProps extends RouteComponentProps<any>, ConfirmWidgetProps {
    /**
     * 列表数据
     */
    $listProxyModel?: Immutable.Map<string, any>;
    /**
     * 删除数据
     */
    $removeProxyModel?: Immutable.Map<string, any>;

    /**
     * 拉取数据
     */
    listHandle?: () => void;
    /**
     * 删除数据
     */
    removeHandle?: (id: number) => void;
}
export const proxySettings = {
    fetch: { ns: "design", key: "dsmodelAll" },
    remove: { ns: "design", key: "dsmodelRemove" }
};
export const $InitialState = Immutable.fromJS({});
export const listProxyModel = new ModelProxyReducer();
export const removeProxyModel = new ModelProxyReducer();
export const paginationModel = new PaginationReducer();
export const removeConfirm = new ConfirmComponent(reducerKeys.concat("$removeConfirm"));
