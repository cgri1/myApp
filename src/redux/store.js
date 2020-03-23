import { createStore } from "redux";
import { setData } from "./reducer";
import { combineReducers } from "redux";

const reducercombined = combineReducers({ setData });

export const store = createStore(reducercombined);
