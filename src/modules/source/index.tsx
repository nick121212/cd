import { combineReducers } from "redux-immutable";

import * as main from "./main";
import * as create from "./create";

export { default as Component } from "./route";
export { rootReducerKey as reducerKey } from "./constant";

export const sagas = [...main.sagas, ...create.sagas];
export const reducer = combineReducers({
    [main.reducerKey]: main.reducer,
    [create.reducerKey]: create.reducer
});
export const actions = [...main.actions, ...create.actions];
