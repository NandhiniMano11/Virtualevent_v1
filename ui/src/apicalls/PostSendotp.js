 export default function PostSendotp(value,callback) {
    return fetch('//localhost:4000/api/sendOtp',{
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)    
    })
    .then((response) => response.json())
    .then((resData) => {
      if (resData === undefined) {
        callback(null, []);
      } else {
        callback(null, resData);
      }
    }).catch(err => { callback("err",err);
    })
  
  }

  