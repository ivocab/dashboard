export const defaultState = {
	// location: "HOME",
};

const types = {
	// SET_LOCATION: "SET_LOCATION",
};

export default function Dashboard(state = defaultState, action) {
	switch (action.type) {
		// case types.SET_LOCATION:
		// 	return { ...state, location: action.payload };
		default:
			return state;
	}
}

// export const SetLocation = (payload) => ({ type: types.SET_LOCATION, payload });
