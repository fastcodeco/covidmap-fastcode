import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:5000/api";

let API = {

    get : async () => {
        return axios.get(API_HOST);
    },
    save : async (data) => {
        return axios.post(API_HOST, data);
    },
    cases : async (data) =>{
        return axios.get('https://pomber.github.io/covid19/timeseries.json');
    }

}


export default API;
