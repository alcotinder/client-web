const infoReducer = (state, action) => {
	switch (action.type) {
	case 'ADD_INFO':
		state.protected = action.payload.message;
		return state;
	default:
		return state;
	}
};

export { infoReducer };
