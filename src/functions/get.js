const get = (url, token) => {
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Authorization: `Authorization ${token}`,
            'Content-type': 'application/json'
        }
    })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                return res.statusText;
            }
        })
};

export default get;