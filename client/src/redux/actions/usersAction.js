import axios from 'axios'

export const fetchAllUser = async (token,pageNumber)=>{
     const res = await axios.get(`/user/all_info?page=${pageNumber}`,{
         headers : {Authorization : token}
     })
     return res
}

export const getAllUser = (res)=>{
      return{
          type : "GET_ALL_USER",
          payload: res.data.users
      }
}