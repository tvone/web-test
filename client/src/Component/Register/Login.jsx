import React from 'react'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useDispatch } from 'react-redux'
import { Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'



const Login = ()=> {
    const dispatch = useDispatch()

    const initialState = {
        email: '',
        password: '',
        error: '',
        success: '',
    }

    const [user, setUser] = useState(initialState)

    const { email, password, error, success } = user

    const onChangeLogin = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value, error: '', success: '' })
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post('/user/login', {
                email, password
            })
            setUser({ ...user, error: '', success: res.data.msg })
            localStorage.setItem('firstLogin',true)
            dispatch({ type: 'LOGIN' })
            window.location.href = "/"
        } catch (error) {
            error.response.data.msg &&
                setUser({ ...user, error: error.response.data.msg, success: '' })
        }
    }

  
    const responseGoogle = (response) => {
        console.log(response);
    }
    const responseFacebook = (response) => {
        console.log(response);
    }
    return (
        <div><div className="container">
            <div className="login-page">
                <div className="container-login">
                    <h2>Đăng nhập</h2>
                    <div style={{color : 'red'}}>{error}</div>
                    <div style={{color : 'green'}}>{success}</div>
                    <form>
                        <input onChange={onChangeLogin} type="text" name='email' placeholder='Email' required />
                        <input onChange={onChangeLogin} type="password" name="password" id="password" placeholder='Mật khẩu' required />
                    </form>
                    <div className="pass-link">
                        <a href="/quen-mat-khau">Quên mật khẩu ?</a>
                    </div>
                    <div className="row">
                        <button onClick={handleSubmit} type="submit" class="btn btn-info">Đăng nhập</button>
                    </div>
                    <div className="line">
                        <div className="line1"></div>
                        <span className='text-line'>Hoặc</span>
                        <div className="line1"></div>
                    </div>

                    <div className="socical-link">
                        <div className="google">
                            <GoogleLogin
                                clientId="731852254342-ninvdupdfopeoht605keep6k48o53f5g.apps.googleusercontent.com"
                                buttonText="Đăng nhập Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                            />
                        </div>
                        <div className="facebook">
                            <FacebookLogin
                                appId="1088597931155576"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook}
                                render={renderProps => (
                                    <button onClick={renderProps.onClick}>Đăng nhập Facebook</button>
                                )}
                            />
                        </div>
                    </div>
                    <div className="signup-link">
                        Chưa có tài khoản ?
                    <Link to="/dangki"> Đăng ký ngay</Link>
                    </div>
                </div>

            </div>

        </div>


        </div>
    )
}

export default Login