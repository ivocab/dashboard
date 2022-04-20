export const defaultState = {
	token: "",
	userInfo: {},
};

const types = {
	SET: "SET",
};

export default function Dashboard(state = defaultState, action) {
	switch (action.type) {
		case types.SET:
			return { ...state, userInfo: action.payload };
		default:
			return state;
	}
}

export const SetUserInfo = (payload) => ({ type: types.SET, payload });
