import { AUTH_SIGN_IN_ERROR, AUTH_SIGN_IN_LOADING, AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_OUT } from "./auth.types";

// Note: Do not update/change the initial state


export const authInitalState = {
  loading: false,
  data: {
    token: "",
    isAuthenticated: false,
  },
  error: false,
};




export const authreducerdata = (state = authInitalState, {type,payload}) => {

  switch(type){

    case AUTH_SIGN_IN_ERROR:{
  
      return{
        ...state,
        data:{isAuthenticated:false,token:""},
        loading:false,
        error:true
      }
    }

   
  
case AUTH_SIGN_IN_SUCCESS:{
  localStorage.setItem('token',payload.token)
  return{
    ...state,
    data:{isAuthenticated:true,token:payload.token},
    loading:false,
    error:false
  }
}


case AUTH_SIGN_OUT:{
  localStorage.removeItem('token')
  return{
    ...state,
    data:{isAuthenticated:false,token:""},
    loading:false,
    error:true
  }
}


case AUTH_SIGN_IN_LOADING:{
      
  return{
    ...state,
    loading:true,
    error:false
  }
}



default:{
  return state
}


  }
};
