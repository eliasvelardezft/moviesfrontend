const patch = (url, data) => {
    return fetch(url, {
      mode: 'cors',
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return res.status;
        }
    })
    .then(res => res);
};

export default patch;