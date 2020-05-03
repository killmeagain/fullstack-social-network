import { SET_AUTH_DATA } from "../action-types/action-types";

const initialState = {
  email: null,
  firstname: null,
  lastname: null,
  isAuth: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        ...action.data
      }
    default:
      return state;
  }
}

export default authReducer;
