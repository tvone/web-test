const initialState = {
    user : [],
    isLogged : false,
    isAdmin : false,
    cart : [],
}

const authReducer = (state = initialState,action)=>{
    switch(action.type){
       case 'LOGIN' : 
       return {
           ...state,
           isLogged : true
       }
       case "GET_INFO_USER":
           return{
               ...state,
               user : action.payload.user,
               isAdmin : action.payload.isAdmin,
           }
    case "GET_CART":{
        return{
            ...state,
            cart : action.payload
        }
    }

        default : return state
    }
}

export default authReducer