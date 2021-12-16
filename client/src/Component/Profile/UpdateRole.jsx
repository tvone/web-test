import axios from 'axios'
import React from 'react'
import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useParams,Link,useHistory} from 'react-router-dom'
import {fetchAllUser,getAllUser} from '../../redux/actions/usersAction'

const UpdateRole = ()=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams()
    const auth = useSelector(state => state.authReducer)
    const token = useSelector(state => state.tokenReducer)
    const {user,isAdmin} = auth
    const users = useSelector(state => state.usersReducer)
    const [update,setUpdate] = useState([])
    const [number,setNumber] = useState(0)
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')

    const [historyUser,setHistoryUser] = useState([])
    
   const histories = useSelector(state => state.historiesReducer)
    
    console.log(histories)
    const [checkAdmin,setCheckAdmin] = useState(false)
    // useEffect(()=>{
    //     if(isAdmin){
    //         const getAllInfo = ()=>{
    //            return fetchAllUser(token).then(res=>{
    //              dispatch(getAllUser(res))
    //            })
    //         }
    //         getAllInfo()
    //     }
    //  },[isAdmin,dispatch])

   

   const gethistory = histories.map((item,index)=>{
     if(item.user_id === id){
       return(
        <tr key={index} >
        <td>{item.paymentID}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.createdAt}</td>
        <td><span className="status text-success">•</span> Thanh toán</td>
     <td>
       <Link style={{marginLeft : 20}} to ={`/history/detail/${item._id}`}  className="settings" title="View" data-toggle="tooltip">View</Link>
     </td>
     
    </tr> 
       )
     }
   })

 

    useEffect(()=>{
        if(users.length !== 0){
            users.forEach(user=>{
                if(user._id === id){
                    setUpdate(user)
                    setCheckAdmin(user.role === 1 ? true : false)
                }
                
            })
            
        }
        
    },[users,id,update])


const ChangeAdmin = () =>{
  setNumber(number + 1)
  setError('')
  setSuccess('')
  setCheckAdmin(!checkAdmin)
}
console.log(checkAdmin)
console.log(number)
 
     const onUpdate = async ()=>{
       try {
         if(user._id !== update._id){
           if(number / 2 !== 0){
             const res = await axios.patch(`/user/update_role/${update._id}`,{
               role : checkAdmin ? 1 : 0
             },{headers : {Authorization : token}})
             setNumber(0)
             setSuccess(res.data.msg)
           }
           history.push('/edit-profile')
         }
         else{
           alert('Bạn đã là admin')
         }
       } catch (error) {
         error.response.data.msg &&
         setError(error.response.data.msg)
       }
     }
  
    return(
        <div>
            <div className="container">
                <div className="row">
           <div style={{marginTop: 20}} className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                <div style={{color : 'red'}}>{error}</div>
                <div style={{color : 'green'}}>{success}</div>
                  <div className='avatar-user'>
                    <img src={update.avatar} alt="Admin" className="rounded-circle p-1 bg-primary" width={150} />
                    <span>
                    <i class="fas fa-upload"></i>
                        <p>Upload</p>
                        <input type="file" name="file" id="file_up"/>
                    </span>
                  </div>
                  
                  <div className="mt-3">
                    <h4>{update.name}</h4>
                    <p className="text-secondary mb-1">Chức vụ: {update.role === 1 ? 'Admin' : 'Người dùng'}</p>
                    <div className="form-admin">
                        <input onChange={ChangeAdmin}  checked={checkAdmin} type="checkbox" name="admin" />
                        <label htmlFor="admin">Admin</label>
                    </div>
                    <button onClick={onUpdate} className="btn btn-primary">Cập nhật</button>
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
            <h1 style={{textAlign : 'center',paddingTop : 20}}>Lịch sử giao dịch</h1>
            <table class="table table-hover">
               <thead>
               <tr>
                    <th>ID</th>
                    <th>Name</th>						
                    <th>Email</th>
                    <th>Ngày tạo</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
               </thead>
               <tbody>
                 
          
                   {gethistory}
                  
                   
           
                    
               </tbody>
           </table>
          </div>
           </div>
        </div>
            </div>
           
    )
}

export default UpdateRole