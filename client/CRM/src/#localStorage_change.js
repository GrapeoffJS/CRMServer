const localStorage_change = (token) => {
	localStorage.removeItem('tokenID');
	localStorage.setItem('tokenID', token);
};

export default localStorage_change;