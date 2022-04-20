export const defaultState = {
	isAuth: false,
};

const types = {
	SET_AUTH: "SET_AUTH",
};

export default function Auth(state = defaultState, action) {
	switch (action.type) {
		case types.SET_AUTH:
			return { ...state, isAuth: action.payload };
		default:
			return state;
	}
}

export const SetAuth = (payload) => ({ type: types.SET_AUTH, payload });
