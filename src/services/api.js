import axios from 'axios';

const API_HOST = process.env.API_HOST || "http://192.168.0.22:5000/api";

let API = {

    get : async () => {
        return axios.get(API_HOST);
    },
    save : async (data) => {
        return axios.post(API_HOST, data);
    }

}



export default API;
