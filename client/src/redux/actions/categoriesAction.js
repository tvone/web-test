import axios from "axios"

export const fetchCategories = async ()=>{
   const res = await axios.get('/api/category')
   return res
}

export const getCategories = (res)=>{
    return {
        type : "GET_CATEGORIES",
        payload : res.data
    }
}