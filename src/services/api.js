import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:5000/api";

let API = {

    get : async () => {
        return axios.get(API_HOST);
    },
    save : async (data) => {
        return axios.post(API_HOST, data);
    },
    cases : async () =>{
        return axios.get('https://covid-19-api-2-8r12noffz.now.sh/api/countries/co');
    },
    status_local : async () =>{
        return axios.get(API_HOST + "/status");
    },
    get_co_details : async () => {
        return axios.get(API_HOST + "/details/co")
    }

}


export default API;
