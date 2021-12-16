const histories = []

const historiesReducer = (state = histories ,action) =>{
    switch(action.type){

        case "GET_ALL_HISTORIES" :
            return (action.payload)

        default : return state
    }
}
export default historiesReducer