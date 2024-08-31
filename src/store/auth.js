export const defaultState = {
  isAuth: false,
  isLocalAuth: false,
  token: "",
  role: null,
};

const types = {
  LogOut: "LogOut",
  SET_LOCAL_AUTH: "SET_LOCAL_AUTH",
  SET_AUTH: "SET_AUTH",
};

export default function Auth(state = defaultState, action) {
  switch (action.type) {
    case types.LogOut:
      return { ...state, isAuth: false, isLocalAuth: false };
    case types.SET_LOCAL_AUTH:
      return { ...state, isLocalAuth: action.payload };
    case types.SET_AUTH:
      return { ...state, isLocalAuth: true, isAuth: action.payload, token: action.token, role: action.role };
    default:
      return state;
  }
}

export const LogOut = () => ({ type: types.LogOut });
export const SetLocalAuth = (payload) => ({ type: types.SET_LOCAL_AUTH, payload });
export const SetAuth = (payload, token, role) => ({ type: types.SET_AUTH, payload, token, role });
