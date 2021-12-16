import axios from "axios"

export const fetchHistories = async (token) =>{
    const res = await axios.get('/user/all_history',{
        headers : {Authorization : token}
    })
    return res
}

export const getAllHistories = (res)=>{
    return {
        type : "GET_ALL_HISTORIES",
        payload : res.data
    }
}