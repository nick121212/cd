import { combineReducers } from "redux-immutable";
import Immutable from "immutable";
import { syncHistoryWithStore } from "react-router-redux";
import { EmptyActionCreator } from "redux-act";
import { reducer as toastrReducer } from "react-redux-toastr";

import { historyInstance } from "./router";
import applyMiddlewares, { sagaMiddleware } from "./middleware";
import reactRouterReducer from "./router.reducer";

import * as main from "../modules/main";
import * as panel from "../modules/panel";
import * as preview from "../modules/preview";
import * as source from "../modules/source";
import * as message from "../modules/message";
// import * as article from "../modules/article";
/**
 * 合并reducers
 */
let reducers = combineReducers({
    modules: combineReducers({
        [main.reducerKey]: main.reducer,
        [panel.reducerKey]: panel.reducer,
        [preview.reducerKey]: preview.reducer,
        [source.reducerKey]: source.reducer,
        [message.reducerKey]: message.reducer,
        // [article.reducerKey]: article.reducer
    }),
    routing: reactRouterReducer,
    toastr: toastrReducer
});

/**
 * 创建store对象
 */
export const store = applyMiddlewares(historyInstance)(reducers, Immutable.Map());

// store.subscribe(() => {
//     console.log(store.getState().getIn(["modules", "panel", "create", "$panelCreateSchemaForm", "present", "meta"]).toJS());
// });

/**
 * 使用了Immutable，这里对react-router-redux特殊处理下
 */
export const history = syncHistoryWithStore(historyInstance as any, store, {
    selectLocationState(state: Immutable.Map<string, any>) {
        return state.get("routing").toJS();
    }
});

/**
 * saga实例方法加载
 */
[...source.sagas, ...main.sagas, ...panel.sagas, ...preview.sagas,
...message.sagas].forEach((saga) => {
    sagaMiddleware.run(saga);
});

/**
 * 初始化action，与store绑定
 */
[...source.actions, ...main.actions, ...panel.actions,
...preview.actions, ...message.actions].forEach((action: EmptyActionCreator) => {
    action.assignTo(store);
});
