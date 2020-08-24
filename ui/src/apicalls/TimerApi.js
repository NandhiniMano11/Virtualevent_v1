export default function TimerApi(callback) {

  return fetch('http://localhost:4000/api/admin/timer')
  .then((response) => response.json())
  .then((users) => {
    if (users === undefined) {
      callback(null, []);
    } else {
      callback(null, users);
    }
  }).catch(err => {
    callback(err);
  })

}