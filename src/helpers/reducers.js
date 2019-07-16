const infoReducer = (state, action) => {
	switch (action.type) {
	case 'ADD_INFO':
		return {
			...state,
			name: action.payload.name,
			lastname: action.payload.lastname,
			city: action.payload.city,
			drinks: action.payload.drinks,
		};
	default:
		return state;
	}
};

export { infoReducer };
