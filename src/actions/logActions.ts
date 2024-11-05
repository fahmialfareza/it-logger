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
} from "./types";
import { Dispatch } from "redux";

// Define Log type
interface Log {
  id: number;
  message: string;
  attention: boolean;
  date: string;
  [key: string]: any; // Add other fields if necessary
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

type LogActionTypes =
  | GetLogsAction
  | AddLogAction
  | DeleteLogAction
  | UpdateLogAction
  | SearchLogsAction
  | SetCurrentAction
  | ClearCurrentAction
  | SetLoadingAction
  | LogsErrorAction;

// Get logs from server
export const getLogs = () => async (dispatch: Dispatch<LogActionTypes>) => {
  try {
    dispatch(setLoading());

    const res = await fetch("/logs");
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: LOGS_ERROR,
      payload: e instanceof Error ? e.message : "An error occurred",
    });
  }
};

// Add new log
export const addLog =
  (log: Log) => async (dispatch: Dispatch<LogActionTypes>) => {
    try {
      dispatch(setLoading());

      const res = await fetch("/logs", {
        method: "POST",
        body: JSON.stringify(log),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({
        type: ADD_LOG,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: LOGS_ERROR,
        payload: e instanceof Error ? e.message : "An error occurred",
      });
    }
  };

// Delete log from server
export const deleteLog =
  (id: number) => async (dispatch: Dispatch<LogActionTypes>) => {
    try {
      dispatch(setLoading());

      await fetch(`/logs/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: DELETE_LOG,
        payload: id,
      });
    } catch (e) {
      dispatch({
        type: LOGS_ERROR,
        payload: e instanceof Error ? e.message : "An error occurred",
      });
    }
  };

// Update log on server
export const updateLog =
  (log: Log) => async (dispatch: Dispatch<LogActionTypes>) => {
    try {
      dispatch(setLoading());

      const res = await fetch(`/logs/${log.id}`, {
        method: "PUT",
        body: JSON.stringify(log),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({
        type: UPDATE_LOG,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: LOGS_ERROR,
        payload: e instanceof Error ? e.message : "An error occurred",
      });
    }
  };

// Search logs from server
export const searchLogs =
  (text: string) => async (dispatch: Dispatch<LogActionTypes>) => {
    try {
      dispatch(setLoading());

      const res = await fetch(`/logs?q=${text}`);
      const data = await res.json();

      dispatch({
        type: SEARCH_LOGS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: LOGS_ERROR,
        payload: e instanceof Error ? e.message : "An error occurred",
      });
    }
  };

// Set current log
export const setCurrent = (log: Log): SetCurrentAction => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

// Clear current log
export const clearCurrent = (): ClearCurrentAction => {
  return {
    type: CLEAR_CURRENT,
  };
};

// Set loading to true
export const setLoading = (): SetLoadingAction => {
  return {
    type: SET_LOADING,
  };
};
