import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const ActivationEmail = ()=>{
    const {activation_token} = useParams()
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')

    useEffect(()=>{
        if(activation_token){
            const activateEmail = async ()=>{
                try {
                    const res = await axios.post('/user/activate',{activation_token})
                    setSuccess(res.data.msg)
                } catch (error) {
                    error.response.data.msg &&
                    setError(error.response.data.msg)
                }
            }
            activateEmail()
        }
    },[activation_token])

    return(
        <div className="container">
                <div className="activate_email">
                    <h2>Trạng thái kích hoạt tài khoản :</h2>
                    <div className="container_activate">
                        <div>{error}</div>
                        <div>{success}</div>
                    </div>
                </div>
        </div>
    )
}

export default ActivationEmail