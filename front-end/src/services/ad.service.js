import apiUrl from './apiUrl'

export const adService = {
    get_available_ads,
    get_ad,
    add_booking,
    add_ad
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


function get_available_ads(start, count , startDate , endDate , visitors , location) { //only control center makes this call

	const requestOptions = {
		mode: 'cors',
        method: 'GET',
        headers : {"Content-Type" : 'application/json'  }
	};  

    return fetch(`${apiUrl}/ads/available/?start=${start}&count=${count}&startDate=${startDate}&endDate=${endDate}&location=${location}&visitors=${visitors}`, requestOptions)
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

function add_ad(ad){

    const data = new FormData();

    if(ad.photos != null ){
        Array.from(ad.photos).forEach( photo => { 
            data.append('productImage',photo,photo.name) 
        });
    }

    data.append('title',ad.title)
    data.append('type',ad.type)
    data.append('price',ad.price)
    data.append('capacity',ad.capacity)
    data.append('address',ad.address)
    data.append('area',ad.location)
    data.append('latitude',ad.lat)
    data.append('longitude',ad.lng)
    data.append('description',ad.description)
    data.append('locationInfo',ad.locationInfo)
    data.append('airco',ad.airco)
    data.append('heat',ad.heat)
    data.append('wifi',ad.wifi)
    data.append('kitchen',ad.kitchen)
    data.append('parking',ad.parking)
    data.append('tv',ad.tv)
    data.append('elevator',ad.elevator)
    const requestOptions = {
		mode: 'cors',
		method: 'POST',
		body: data
    };
    

	return fetch(`${apiUrl}/ads/newAd`, requestOptions)
		.then(handleResponse)
		.then(text => {
			return text;
		})
}

