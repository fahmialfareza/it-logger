import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  SEARCH_LOGS,
} from "../actions/types";

// Define Log type
interface Log {
  id: number;
  message: string;
  attention: boolean;
  date: string;
  [key: string]: any;
}

// Define initial state type
interface LogsState {
  logs: Log[] | null;
  current: Log | null;
  loading: boolean;
  error: string | null;
}

// Define action types
interface GetLogsAction {
  type: typeof GET_LOGS;
  payload: Log[];
}

interface AddLogAction {
  type: typeof ADD_LOG;
  payload: Log;
}

interface DeleteLogAction {
  type: typeof DELETE_LOG;
  payload: number;
}

interface UpdateLogAction {
  type: typeof UPDATE_LOG;
  payload: Log;
}

interface SearchLogsAction {
  type: typeof SEARCH_LOGS;
  payload: Log[];
}

interface SetCurrentAction {
  type: typeof SET_CURRENT;
  payload: Log;
}

interface ClearCurrentAction {
  type: typeof CLEAR_CURRENT;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface LogsErrorAction {
  type: typeof LOGS_ERROR;
  payload: string;
}

type LogsActionTypes =
  | GetLogsAction
  | AddLogAction
  | DeleteLogAction
  | UpdateLogAction
  | SearchLogsAction
  | SetCurrentAction
  | ClearCurrentAction
  | SetLoadingAction
  | LogsErrorAction;

const initialState: LogsState = {
  logs: null,
  current: null,
  loading: false,
  error: null,
};

export default (state = initialState, action: LogsActionTypes): LogsState => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
      };
    case ADD_LOG:
      return {
        ...state,
        logs: state.logs ? [...state.logs, action.payload] : [action.payload],
        loading: false,
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs
          ? state.logs.filter((log) => log.id !== action.payload)
          : null,
        loading: false,
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs
          ? state.logs.map((log) =>
              log.id === action.payload.id ? action.payload : log
            )
          : null,
      };
    case SEARCH_LOGS:
      return {
        ...state,
        logs: action.payload,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
