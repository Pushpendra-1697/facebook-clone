// Auth Actions here

import axios from "axios"
import { USER_AUTH_SIGN_IN_ERROR, USER_AUTH_SIGN_IN_LOADING, USER_AUTH_SIGN_IN_SUCCESS, USER_AUTH_SIGN_OUT, USER_AUTH_SIGN_UP_ERROR, USER_AUTH_SIGN_UP_LOADING, USER_AUTH_SIGN_UP_SUCCESS } from "./userAuth.types"



export const userAuthLogin=(creds)=>async(dispatch)=>{

    dispatch({type:USER_AUTH_SIGN_IN_LOADING})



    try{
        let authresponse=await axios.post('https://graceful-fox-apron.cyclic.app/user/login',creds)

        dispatch({type: USER_AUTH_SIGN_IN_SUCCESS,payload:authresponse.data})

        return authresponse.data && alert( `${authresponse.data.massege}`)

    }


    catch(err){

        dispatch({type:USER_AUTH_SIGN_IN_ERROR,payload:err.message})

    }
}

//signup

export const userAuthSignUP=(creds)=>async(dispatch)=>{

    dispatch({type:USER_AUTH_SIGN_UP_LOADING})



    try{
        let authresponse=await axios.post('https://graceful-fox-apron.cyclic.app/user/register',creds)

        dispatch({type: USER_AUTH_SIGN_UP_SUCCESS,payload:authresponse.data})

        return authresponse.data

    }


    catch(err){

        dispatch({type:USER_AUTH_SIGN_UP_ERROR,payload:err.message})

    }
}






export const authlogout=()=>({type:USER_AUTH_SIGN_OUT})
