import React from 'react'
import {useState,useSelector} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
const ResetPassword = ()=>{
    const initialState ={
        password : '',
        cf_password : '',
        error : '',
        success : ''
    }
    const {token} = useParams()

    const [reset,setReset] = useState(initialState)

    const {password,cf_password,error,success} = reset
    const handleChange = (e)=>{
      const {name,value} = e.target
      setReset({...reset,[name]:value,error: '',success :''})
    }
   
    const handleSubmit = async (e)=>{
        e.preventDefault();
       try {
           const res = await axios.post('/user/reset',{password,cf_password},{
              headers : {Authorization : token}
           })
           setReset({...reset,error: '',success : res.data.msg})
       } catch (error) {
           error.response.data.msg &&
           setReset({...reset,error: error.response.data.msg,success: ''})
       }
    }
    return(
        <div className='forgot-password'>
         <div style={{padding :'10px 20px',fontSize : '18px'}}>
             <div style={{color : 'red'}}>{error}</div>
         <div style={{color : 'green'}}>{success}</div>
         </div>
         
       <div className="container">
           <div className="form-forgot">
               <h2>Quên mật khẩu ?</h2>
               <hr />
               <p>Nhập mật khẩu mới của bạn : </p>
               
               <form onSubmit={handleSubmit} className="forgot">
                   <div className="text-forgot">
                       <input onChange={handleChange} type="password" name="password" placeholder ='Mật khẩu mới' required />
                       <div>
                           <input onChange={handleChange} type="password" name="cf_password" placeholder ='Nhập lại mật khẩu mới' required />
                       </div>
                        
                       
                       
                       
                   </div>
                   
                    <button type="submit" class="btn btn-info">Xác nhận</button>
               </form>
              
               
           </div>
       </div>
     </div>
    )
}

export default ResetPassword