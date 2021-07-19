const httpdelete = (url, token) => {
    return fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            Authorization: `Authorization ${token}`,
            'Content-type': 'application/json',
        }
    })
        .then(res => res);
};

export default httpdelete;