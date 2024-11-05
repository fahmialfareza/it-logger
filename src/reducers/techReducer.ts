import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
} from "../actions/types";

// Define Tech type
interface Tech {
  id: number;
  name: string;
  [key: string]: any;
}

// Define initial state type
interface TechsState {
  techs: Tech[] | null;
  loading: boolean;
  error: string | null;
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

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface TechsErrorAction {
  type: typeof TECHS_ERROR;
  payload: string;
}

type TechsActionTypes =
  | GetTechsAction
  | AddTechAction
  | DeleteTechAction
  | SetLoadingAction
  | TechsErrorAction;

const initialState: TechsState = {
  techs: null,
  loading: false,
  error: null,
};

export default (state = initialState, action: TechsActionTypes): TechsState => {
  switch (action.type) {
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
        loading: false,
      };
    case ADD_TECH:
      return {
        ...state,
        techs: state.techs
          ? [...state.techs, action.payload]
          : [action.payload],
        loading: false,
      };
    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs
          ? state.techs.filter((tech) => tech.id !== action.payload)
          : null,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TECHS_ERROR:
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
