const categories = []

const categoriesReducer = (state = categories,action)=>{
   switch(action.type){
       case "GET_CATEGORIES" :
           return(action.payload)

    default : return state
   }
}
export default categoriesReducer