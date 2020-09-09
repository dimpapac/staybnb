import apiUrl from './apiUrl'

export const authenticationService = {
	login,
	logout,
	registerUser
};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


function login(username, password) {

	const requestOptions = {
		mode: 'cors',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password })
	};

	return fetch(`${apiUrl}/login`, requestOptions)
		.then(handleResponse)
		.then(user => {
			return user;
		})

}

function registerUser(username, password, email, firstName, lastName) {

	const requestOptions = {
		mode: 'cors',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ 
			username, 
			password, 
			email,
			firstName, 
			lastName 
		})
	};

	return fetch(`${apiUrl}/registerUser`, requestOptions)
		.then(handleResponse)
		.then(text => {
			return text;
		})

}

function logout() {
	localStorage.removeItem('user');
}
