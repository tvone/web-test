import React from 'react'
import axios from 'axios'
import {useState} from 'react'

const ForgotPassword = ()=>{
    const initialState = {
        email : '',
        error : '',
        success : ''
    }
    const [forgot,setForgot] = useState(initialState)

    const {email,error,success} = forgot
    
    const handleChange = (e)=>{
        const {name,value} = e.target
        setForgot({...forgot,[name]:value,error: '',success : ''})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const res = await axios.post('/user/forgot_password',{email})
            console.log(res)
            setForgot({...forgot,error : '',success : res.data.msg})
        } catch (error) {
            error.response.data.msg &&
            setForgot({...forgot,error : error.response.data.msg,success : ''})
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
               <p>Nhập Email của bạn để thay đổi mật khẩu mới : </p>
               
               <form onSubmit={handleSubmit} className="forgot">
                   <div className="text-forgot">
                       <input onChange={handleChange} type="email" name="email" placeholder ='Email' required />
                   </div>
                   
                    <button type="submit" class="btn btn-info">Xác nhận</button>
               </form>
              
               
           </div>
       </div>
     </div>
    )
}

export default ForgotPassword