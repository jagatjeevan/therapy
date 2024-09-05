import { createContext } from "./createContext";

// Const
const ACTION_TYPES = {
  USER_LOGGED_IN: "USER_LOGGED_IN",
  USER_LOGGED_OUT: "USER_LOGGED_OUT",
};

// Initial State
const initialState = {
  isLoggedIn: false,
  user: null,
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.USER_LOGGED_IN:
      return { ...state, isLoggedIn: true, user: action.payload };

    case ACTION_TYPES.USER_LOGGED_OUT:
    default:
      return { ...state, isLoggedIn: false, user: null };
  }
};

// Actions
export const loginUser = (dispatch) => (user) => {
  dispatch({ type: ACTION_TYPES.USER_LOGGED_IN, payload: user });
};

export const logoutUser = (dispatch) => () =>
  dispatch({ type: ACTION_TYPES.USER_LOGGED_OUT });

// Context
export const { Provider, Context } = createContext(
  reducer,
  { loginUser, logoutUser },
  initialState
);

export function withAuth(Component) {
  return function contextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} authContext={context} />}
      </Context.Consumer>
    );
  };
}
