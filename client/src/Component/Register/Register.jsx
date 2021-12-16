import axios from 'axios'
import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'

const Register = ()=>{
    const initialState = {
        name : "",
        email : "",
        password : "",
        cf_password : "",
        error : "",
        success: ""
    }
    const [user,setUser] = useState(initialState)

    const {name,email,password,cf_password,error,success} = user
    
    const changeRegister = (e)=>{
       const {name,value} = e.target
       setUser({...user,[name]:value,error : "",success : ''})
    }

    console.log(user)

    const handleSubmit = async ()=>{
       try {
           const res = await axios.post('/user/register',{
               name,email,password,cf_password
           })
           setUser({...user,error:'',success: res.data.msg})
       } catch (error) {
           error.response.data.msg &&
           setUser({...user,error: error.response.data.msg,success:''})
       }
    }

    return(
        <div><div className="container">
        <div className="login-page">
                <div className="container-login">
                    <h2>Đăng ký</h2>
                    <div style={{color : 'red'}}>{error}</div>
                    <div style={{color : 'green'}}>{success}</div>
                <form>
                    <input onChange={changeRegister} type="text" name ='name' placeholder ='Name' required />
                    <input onChange={changeRegister} type="text" name ='email' placeholder ='Email' required />
                    <input onChange={changeRegister} type="password" name="password" id="password" placeholder ='Mật khẩu' required />
                    <input onChange={changeRegister} type="password" name="cf_password" placeholder ='Nhập lại mật khẩu' required />
                </form>
                 <div className="pass-link">
                    <a href="/quen-mat-khau">Quên mật khẩu ?</a>
                </div>
                <div className="row">
                   <button onClick={handleSubmit} type="submit" class="btn btn-info">Đăng ký</button>
                </div>
                

                <div className="signup-link">
                    Đã có tài khoản ?
                    <Link to="/dangnhap"> Đăng nhập ngay</Link>
                </div>
                </div>
                
        </div>
            
            </div>
            
            
        </div>
    )
}

export default Register