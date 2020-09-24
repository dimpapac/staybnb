import apiUrl from './apiUrl'

export const bookingService = {
    get_bookings
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


function get_bookings(id ) { //only control center makes this call

	const requestOptions = {
		mode: 'cors',
        method: 'POST',
        headers : {"Content-Type" : 'application/json'  },
        body: JSON.stringify({ 
			id
		})
	};  

    return fetch(`${apiUrl}/bookings/`, requestOptions)
    .then(response => response.json())
    .then(response => {
        return response;
    });	

}
