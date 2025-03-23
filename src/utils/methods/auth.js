// this will have login sign up api logout api call
// front end call


import axios from 'axios';
import {API_URL} from "../../constants/constant"

const serviceApiURL ="";


 export const loginCall = async (data) =>{

    try{
        const response = await axios.post(`${API_URL}login`,data);
        return response.data

    }catch(err){

        throw new Error("Error while calling api:" + err.message);
    }
}

export const formApiservice = async (formData) =>{

    
    try{
        const response = await axios.post("",formData)

    }catch(err){

        console.warn("Error while calling api:" + err.message)
    }finally {
        setLoading(false);
      }
}