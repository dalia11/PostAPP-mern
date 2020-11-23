const axios = require('axios');
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  axios.defaults.baseURL = 'http://localhost:5000/';
} else {
  // production code
  axios.defaults.baseURL = '/';
}
export function Authenticate(){
  let data = localStorage.getItem('token');
  // let data = localStorage.getItem('token');
  if(data){
    //axios.defaults.auth = { username: data.split(',')[0], password: data.split(',')[1] };
    axios.defaults.headers.common.Authorization = data;
    return 1
  }else{
    return 0
  }

}
export default axios;
