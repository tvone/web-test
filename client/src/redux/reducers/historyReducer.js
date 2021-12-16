const initialState = {
    history : [],
}

const historyReducer = (state = initialState,action)=>{
  switch(action.type){
      case "GET_HISTORY":
          return{
              ...state,
              history : action.payload
          }
          default : return state
  }
}

export default historyReducer