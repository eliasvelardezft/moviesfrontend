const post = (url, data) => {
    return fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
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

export default post;