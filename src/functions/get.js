const get = (url, token, ...headers) => {
    let headersObj = {
        Authorization: `Token ${token}`,
        'Content-type': 'application/json',
    }
    // add each header from the function call to the request headers
    headers.forEach(p => {
        Object.keys(p).forEach(k => {
            headersObj[k] = p[k]
        })
    })
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: headersObj
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