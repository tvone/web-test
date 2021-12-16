import axios from "axios"

export const fetchHistory = async (token)=>{
    const res = await axios.get('/user/history',{
        headers : {Authorization : token}
    })
    return res
}

export const getHistory = (res)=>{
   return {
       type : "GET_HISTORY",
       payload : res.data
   }
}