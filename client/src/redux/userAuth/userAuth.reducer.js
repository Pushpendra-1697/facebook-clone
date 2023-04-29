import { USER_AUTH_SIGN_IN_ERROR, USER_AUTH_SIGN_IN_LOADING, USER_AUTH_SIGN_IN_SUCCESS, USER_AUTH_SIGN_OUT, USER_AUTH_SIGN_UP_ERROR, USER_AUTH_SIGN_UP_LOADING, USER_AUTH_SIGN_UP_SUCCESS } from "./userAuth.types"


// Note: Do not update/change the initial state


export const authInitalState = {
  loading: false,
  data: {
    massege:"",
    token:"",
    _id: "",
    isAuthenticated: false,
  },
  error: false,
};




export const userAuthReducer = (state = authInitalState, {type,payload}) => {

  switch(type){

    case USER_AUTH_SIGN_IN_ERROR:{
  
      return{
        ...state,
        data:{isAuthenticated:false,id:""},
        loading:false,
        error:true
      }
    }

   
  
case USER_AUTH_SIGN_IN_SUCCESS:{

  localStorage.setItem('token',payload.token)
  localStorage.setItem('id',payload.id)

  return{
    ...state,
    data:{isAuthenticated:true, _id:payload.id, token:payload.token,massege:payload.massege},
    loading:false,
    error:false
  }
}


case USER_AUTH_SIGN_OUT:{
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  return{
    ...state,
    data:{isAuthenticated:false,id:"",token:""},
    loading:false,
    error:true
  }
}


case USER_AUTH_SIGN_IN_LOADING:{
      
  return{
    ...state,
    loading:true,
    error:false
  }
}

//signup

case USER_AUTH_SIGN_UP_ERROR:{
  
  return{
    ...state,
    // data:{isAuthenticated:false,id:""},
    loading:false,
    error:true
  }
}


case USER_AUTH_SIGN_UP_SUCCESS:{
  return{
    ...state,
    loading:false,
    error:false
  }
}


case USER_AUTH_SIGN_UP_LOADING:{
      
  return{
    ...state,
    loading:true,
    
  }
}





default:{
  return state
}


  }
};
