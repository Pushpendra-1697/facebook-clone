// Auth Actions here

import axios from "axios"
import { AUTH_SIGN_IN_ERROR, AUTH_SIGN_IN_LOADING, AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_OUT } from "./auth.types"


export const authlogin=(creds)=>async(dispatch)=>{

    dispatch({type:AUTH_SIGN_IN_LOADING})



    try{
        let authresponse=await axios.post('https://reqres.in/api/login',creds)

        dispatch({type: AUTH_SIGN_IN_SUCCESS,payload:authresponse.data})

        return authresponse.data
      

    }


    catch(err){

        dispatch({type:AUTH_SIGN_IN_ERROR,payload:err.message})

    }
}


export const authlogout=()=>({type:AUTH_SIGN_OUT})
