import { combineReducers } from "redux";
import logReducer from "./logReducer";
import techReducer from "./techReducer";

const rootReducer = combineReducers({
  log: logReducer,
  tech: techReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
