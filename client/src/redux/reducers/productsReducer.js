const initialState = {
    products : [],
    searchWord : ''
}

const productsReducer = (state = initialState,action)=>{
    switch(action.type){
        case "GET_PRODUCTS" : 
        return{
            ...state,
            products : action.payload.products
        }
        case "GET_SEARCHWORD" :
            return{
                ...state,
                searchWord : action.payload
            }



       default : return state 
    }
    
}

export default productsReducer