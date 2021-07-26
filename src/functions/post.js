const post = (url, data, token=true) => {
  let he = {
    'Content-type': 'application/json'
  }  
  if(token) {
    he['Authorization'] = `Token ${localStorage.getItem('token')}`
  }


  return fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: he,
      body: JSON.stringify(data)
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return res.json();
        }
    })
    .then(res => res);
};

export default post;