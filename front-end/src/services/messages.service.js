import apiUrl from './apiUrl'

export const messagesService = {
    send_message,
    get_message,
    get_inbox,
    get_sent,
    get_notifications
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


function send_message(sender, receiver, message) {
    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            sender,
            receiver,
            message
        })
    };

    console.log('sending message')

    return fetch(`${apiUrl}/messages/sendmessage`, requestOptions)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        return response;
    });  
}

function get_message(message_id, open_id) {
    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            open_id,
            message_id
        })
    };

    return fetch(`${apiUrl}/messages/message`, requestOptions)
    .then(response => response.json())
    .then(response => {
        return response;
    });  
}

function get_inbox(user_id) {
    const requestOptions = {
        mode: 'cors',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${apiUrl}/messages/inbox/${user_id}`, requestOptions)
    .then(response => response.json())
    .then(response => {
        return response;
    });  
}


function get_sent(user_id) {
    const requestOptions = {
        mode: 'cors',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${apiUrl}/messages/sent/${user_id}`, requestOptions)
    .then(response => response.json())
    .then(response => {
        return response;
    });  
}


function get_notifications(user_id) {
    const requestOptions = {
        mode: 'cors',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${apiUrl}/messages/notifications/${user_id}`, requestOptions)
    .then(response => response.json())
    .then(response => {
        return response;
    });  
}
