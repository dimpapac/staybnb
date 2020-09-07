import apiUrl from './apiUrl'

export const apartmentService = {
	get_available_apartments
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


function get_available_apartments(start, count , startDate , endDate ) { //only control center makes this call

	const requestOptions = {
		mode: 'cors',
        method: 'GET',
        headers : {"Content-Type" : 'application/json'  }
	};  

    return fetch(`${apiUrl}/apartments/available/?start=${start}&count=${count}&startDate=${startDate}&endDate=${endDate}`, requestOptions)
    .then(response => response.json())
    .then(response => {
        return response;
    });	

}

