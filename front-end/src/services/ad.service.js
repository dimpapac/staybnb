import apiUrl from './apiUrl'

export const adService = {
    get_available_ads,
    get_ad,
    add_booking,
    add_ad,
    add_review,
    update_user,
    get_host_ads,
    get_users,
    delete_user,
    approve_user
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

function add_booking(hostId,renterId,adId,bookedFrom,bookedTill,hostName,username){
    const requestOptions = {
		mode: 'cors',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ 
			hostId,
			renterId,
			adId,
			bookedFrom,
            bookedTill,
            hostName,
            username
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
    data.append('hostId',ad.hostId)
    data.append('hostName',ad.hostName)
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

function add_review(text,stars,adId,userid,username){
    const requestOptions = {
		mode: 'cors',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ 
            text,
            stars,
            adId,
            username
		})
    };

	return fetch(`${apiUrl}/ads/updateReview`, requestOptions)
		.then(handleResponse)
		.then(text => {
			return text;
        })
        
        
}


function update_user( userId , fName , lName , email ){

    const requestOptions = {
		mode: 'cors',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ 
            userId ,
            fName , 
            lName ,
            email
        })
    };
        
        return fetch(`${apiUrl}/ads/updateUser`, requestOptions)
		.then(handleResponse)
		.then(text => {
			return text;
        })
        

}

function get_host_ads(id){

    const requestOptions = {
		mode: 'cors',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ 
            id
        })
    };
        
        return fetch(`${apiUrl}/ads/hostAds`, requestOptions)
		.then(handleResponse)
		.then(text => {
			return text;
        })
        

}

function get_users(type){
    const requestOptions = {
		mode: 'cors',
        method: 'POST',
        headers : {"Content-Type" : 'application/json'  },
		body: JSON.stringify({ 
            type
        })
	};  

    return fetch(`${apiUrl}/ads/users`, requestOptions)
    .then(response => response.json())
    .then(response => {
        return response;
    });	
}

function delete_user(id){
    const requestOptions = {
		mode: 'cors',
        method: 'POST',
        headers : {"Content-Type" : 'application/json'  },
		body: JSON.stringify({ 
            id
        })
	};  

    return fetch(`${apiUrl}/ads/users/delete`, requestOptions)
    .then(response => response.json())
    .then(response => {
        return response;
    });	
}

function approve_user(id){
    const requestOptions = {
		mode: 'cors',
        method: 'POST',
        headers : {"Content-Type" : 'application/json'  },
		body: JSON.stringify({ 
            id
        })
	};  

    return fetch(`${apiUrl}/ads/users/approve`, requestOptions)
    .then(response => response.json())
    .then(response => {
        return response;
    });	
}


