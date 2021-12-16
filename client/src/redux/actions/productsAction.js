import axios from 'axios'

export const fetchProducts = async (searchWord)=>{
    const res = await axios.get(`/api/product?title[regex]=${searchWord}`)
    return res
}

export const getProducts = (res)=>{
    return {
        type : "GET_PRODUCTS",
        payload : res.data
    }
   
}