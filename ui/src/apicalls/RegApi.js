export default function PostReg(value,callback) {
  return fetch('http://localhost:4000/api/register',{
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),    
  })
  .then((response) => response.json())
  .then((resData) => {
    if (resData === undefined) {
      callback(null, []);
    } else {
      callback(null, resData);
    }
  }).catch(err => {
    callback("err",err);
  })

}