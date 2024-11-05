import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
} from "./types";
import { Dispatch } from "redux";

// Define Tech type
interface Tech {
  id: number;
  name: string;
  [key: string]: any; // Add other fields if necessary
}

// Define action types
interface GetTechsAction {
  type: typeof GET_TECHS;
  payload: Tech[];
}

interface AddTechAction {
  type: typeof ADD_TECH;
  payload: Tech;
}

interface DeleteTechAction {
  type: typeof DELETE_TECH;
  payload: number;
}

interface TechsErrorAction {
  type: typeof TECHS_ERROR;
  payload: string;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

type TechActionTypes =
  | GetTechsAction
  | AddTechAction
  | DeleteTechAction
  | TechsErrorAction
  | SetLoadingAction;

// Get techs
export const getTechs = () => async (dispatch: Dispatch<TechActionTypes>) => {
  try {
    dispatch(setLoading());

    const res = await fetch("/techs");
    const data = await res.json();

    dispatch({
      type: GET_TECHS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: TECHS_ERROR,
      payload: e instanceof Error ? e.message : "An error occurred",
    });
  }
};

// Add tech
export const addTech =
  (tech: Tech) => async (dispatch: Dispatch<TechActionTypes>) => {
    try {
      dispatch(setLoading());

      const res = await fetch("/techs", {
        method: "POST",
        body: JSON.stringify(tech),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({
        type: ADD_TECH,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: TECHS_ERROR,
        payload: e instanceof Error ? e.message : "An error occurred",
      });
    }
  };

// Delete Tech
export const deleteTech =
  (id: number) => async (dispatch: Dispatch<TechActionTypes>) => {
    try {
      dispatch(setLoading());

      await fetch(`/techs/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: DELETE_TECH,
        payload: id,
      });
    } catch (e) {
      dispatch({
        type: TECHS_ERROR,
        payload: e instanceof Error ? e.message : "An error occurred",
      });
    }
  };

// Set loading to true
export const setLoading = (): SetLoadingAction => {
  return {
    type: SET_LOADING,
  };
};
