import apiUrl from './apiUrl'

export const adService = {
    get_available_ads,
    get_ad,
    add_booking
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


function get_available_ads(start, count , startDate , endDate ) { //only control center makes this call

	const requestOptions = {
		mode: 'cors',
        method: 'GET',
        headers : {"Content-Type" : 'application/json'  }
	};  

    return fetch(`${apiUrl}/ads/available/?start=${start}&count=${count}&startDate=${startDate}&endDate=${endDate}`, requestOptions)
    .then(response => response.json())
    .then(response => {
        return response;
    });	

}

function get_ad(id ) { //only control center makes this call

	const requestOptions = {
		mode: 'cors',
        method: 'GET',
        headers : {"Content-Type" : 'application/json'  }
	};  

    return fetch(`${apiUrl}/ads/${id}`, requestOptions)
    .then(response => response.json())
    .then(response => {
        return response;
    });	

}

function add_booking(hostId,renterId,adId,bookedFrom,bookedTill){
    const requestOptions = {
		mode: 'cors',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ 
			hostId,
			renterId,
			adId,
			bookedFrom,
			bookedTill
		})
	};

	return fetch(`${apiUrl}/ads/addBooking`, requestOptions)
		.then(handleResponse)
		.then(text => {
			return text;
		})
}

