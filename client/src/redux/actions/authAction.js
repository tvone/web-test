import axios from 'axios'

export const fetchUser = async (token)=>{
   const res = await axios.get('/user/info',{
       headers :{Authorization : token}
   })
   return res
}

export const getInfoUser = (res)=>{
   return{
       type : 'GET_INFO_USER',
       payload : {
           user : res.data,
           isAdmin : res.data.role === 1 ? true : false,
           cart : res.data.cart
       }
   }
}
