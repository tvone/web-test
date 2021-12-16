import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
  const initialState = {
    name : '',
    password: '',
    cf_password : '',
    error: '',
    success : ''
  }
  const token = useSelector(state => state.tokenReducer)
  const [data,setData] = useState(initialState)
  const {name,password,cf_password,error,success} = data
  const auth = useSelector(state => state.authReducer)
  const { isAdmin, isLogged, user } = auth

  const [loading,setLoading] = useState(false)

  const [avatar,setAvatar] = useState(false)


  const handleChange = (e) =>{
    const {name,value} = e.target
    setData({...data,[name]:value,error: '',success: ''})
  }
  
  
  const onUpdatePassword = async () =>{
    try {
      const res = await axios.post('/user/reset',{password,cf_password},{
        headers : {Authorization : token}
      })
      setData({...data,error : '',success : res.data.msg})
    } catch (error) {
      error.response.data.msg &&
      setData({...data,error: error.response.data.msg,success : ''})
    }
  }
  const changeAvatar = async (e)=>{
   try {
     const file = e.target.files[0]
     setLoading(true)
     let formData = new FormData()

     formData.append('file',file)

     const res = await axios.post('/api/upload_avatar',formData,{
       headers :{'content-type' : 'mutipart/form-data' ,Authorization : token}
     })
     setAvatar(res.data.url)
     setLoading(false)
     setData({...data,error: '',success: ''})
     
   } catch (error) {
     error.response.data.msg &&
     setData({...data,error: error.response.data.msg,success: ''})
   }
  }
   
  const onUpdateInfo = async ()=>{
    try {
      const res = await axios.patch('/user/update_info',{
        name : name ? name : user.name,
        avatar : avatar ? avatar : user.avatar
      },{
        headers : {Authorization : token
       }})

      setData({...data,error : '',success: res.data.msg})

    } catch (error) {
      error.response.data.msg &&
      setData({...data,error: error.response.data.msg,success: ''})
    }
 }
  
  const onUpdate = ()=>{
    if(name || avatar) return onUpdateInfo()
    if(password || cf_password) return onUpdatePassword()
  }
  return (
    <div className="container">
      <div style={{ marginTop: '20px' }} className="main-body">
        <nav aria-label="breadcrumb" class="main-breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Trang chủ</a></li>
            <li class="breadcrumb-item active" aria-current="page">{isAdmin ? "Admin Profile" : "User Profile"}</li>
          </ol>
          <div style={{textAlign: 'center'}}>
            <div style={{color : 'red'}}>{error}</div>
            <div style={{color : 'green',fontSize: '20px',fontWeight: 500}}>{success}</div>
          </div>
          
        </nav>
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  {loading ? 'Loading...' : ''}
                  <div className='avatar-user'>
                    <img src={avatar ? avatar : user.avatar} alt="Admin" className="rounded-circle p-1 bg-primary" width={150} />
                    <span>
                    <i class="fas fa-upload"></i>
                        <p>Upload</p>
                        <input onChange={changeAvatar} type="file" name="file" id="file_up"/>
                    </span>
                  </div>
                  
                  <div className="mt-3">
                    <h4>{user.name}</h4>
                    <p className="text-secondary mb-1">Chức vụ: {isAdmin ? 'Admin' : 'Người dùng'}</p>
                    <button className="btn btn-primary">Theo dõi</button>
                  </div>
                </div>
                <hr className="my-4" />
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe me-2 icon-inline"><circle cx={12} cy={12} r={10} /><line x1={2} y1={12} x2={22} y2={12} /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>Website</h6>
                    <span className="text-secondary">https://cuongtvone.com</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-github me-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>Github</h6>
                    <span className="text-secondary">cuongtvone</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter me-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>Twitter</h6>
                    <span className="text-secondary">@cuongtvone</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram me-2 icon-inline text-danger"><rect x={2} y={2} width={20} height={20} rx={5} ry={5} /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>Instagram</h6>
                    <span className="text-secondary">cuongtvone</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook me-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>Facebook</h6>
                    <span className="text-secondary">cuongtvone</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input onChange={handleChange} type="text" className="form-control" name='name' defaultValue={user.name} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input type="text" className="form-control" name='email' defaultValue={user.email} disabled />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Mật khẩu mới</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input onChange={handleChange} type="password" name='password' className="form-control" />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Nhập lại mật khẩu mới</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input onChange={handleChange} type="password" name='cf_password' className="form-control" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3" />
                  <div className="col-sm-9 text-secondary">
                    <input onClick = {onUpdate} type="button" className="btn btn-primary px-4" defaultValue="Cập nhật" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
          <div className="col-sm-12">
             <div className="text-profile">
               <div className="category-text">
                 { isAdmin ? <ul>
                   <li><i class="fas fa-users"></i><Link to="/edit-profile">Quản lí user</Link></li>
                   <li><i class="fas fa-bars"></i><a href="/category-manager">Quản lí danh mục</a></li>
                   <li><i class="fas fa-briefcase"></i><a href="/add-product">Quản lí sản phẩm</a></li>
                 </ul> : <ul>
                   <li><i class="fas fa-history"></i><Link to="/history">Lịch sử giao dịch</Link></li>
                   <li><i class="fas fa-shopping-cart"></i><a href="/cart">Quản lí giỏ hàng</a></li>
                 </ul>}
                 
                 
               </div>
             </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default Profile