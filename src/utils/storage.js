const getFromStorage = key => {
	if (!key) {
		return null;
	}
	try {
		const valueStr = localStorage.getItem(key);
		if (valueStr) {
			return JSON.parse(valueStr);
		}
		return null;
	} catch (err) {
		return null;
	}
};

const setInStorage = (key, obj) => {
	if (!key) {
		console.error('Error: Key is missing');
	}
	try {
		localStorage.setItem(key, JSON.stringify(obj));
		return null;
	} catch (err) {
		console.error(err);
	}
};

const removeFromStorage = key => {
	if (!key) {
		console.error('Error: Key is missing');
	}
	try {
		localStorage.setItem(key);
		return null;
	} catch (err) {
		console.error(err);
	}
}

export {
	getFromStorage,
	setInStorage,
	removeFromStorage,
};
