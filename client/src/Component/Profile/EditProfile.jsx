import axios from 'axios'
import React from 'react'
import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchAllUser,getAllUser} from '../../redux/actions/usersAction'

const EditProfile = ()=>{
  const initialState = {
    error : '',
    success : ''
  }
  const [data,setData] = useState(initialState)
  const {error,success} = data

    const dispatch = useDispatch()
    const auth = useSelector(state => state.authReducer)
    const token = useSelector(state => state.tokenReducer)
    const users = useSelector(state => state.usersReducer)
    const {isAdmin,user} = auth

    const [callback,setCallBack] = useState(false)
    // Page Number
    const [pageNumber,setPageNumber] = useState(1)
    // Total Page:
    const [totalPages,setTotalPages] = useState(0)
    // Add class
    const [addClass,setAddClass] = useState(0)

    const [total,setTotal] = useState(0)

    

    const pages= new Array(totalPages).fill(null).map((v,i)=> i)

    
    
    useEffect(()=>{
       if(isAdmin){
           const getAllInfo = ()=>{
              return fetchAllUser(token,pageNumber).then(res=>{
                dispatch(getAllUser(res))
                
                setTotalPages(res.data.totalPage)
                setTotal(res.data.total)
              })
           }
           getAllInfo()
       }
    },[isAdmin,dispatch,pageNumber,callback])

  //  Button Prev
   const gotoPrev = ()=>{
     setPageNumber(Math.max(0,pageNumber - 1))
    //  page number chia lay du
     if((pageNumber - 1 ) % pageNumberLimit == 0){
       setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
       setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
     }
    

    //  add class active
     setAddClass(Math.max(0, addClass - 1))
   }
  //  Button Next
   const gotoNext = ()=>{
     setPageNumber(Math.min(totalPages,pageNumber + 1))
    //  pageNumber 5 + 1 > 5
     if(pageNumber + 1 > maxPageNumberLimit){
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
     }
    

    //  add class active
     setAddClass(Math.min(totalPages-1 , addClass + 1))
   }
 
   const onDelete = async (id)=>{
     try {
       if(user._id !== id){
         if(window.confirm(`Bạn có muốn xóa người dùng : ${id}`)){
            const res = await axios.delete(`/user/delete_user/${id}`,{
            headers : {Authorization : token}
          })
          setData({...data,error: '',success : res.data.msg})
          setCallBack(!callback)
         }
      
       
          
       }
     } catch (error) {
       error.response.data.msg &&
       setData({...data,error: error.response.data.msg,success: ''})
     }
   }
   const [pageNumberLimit,setPageNumberLimit] = useState(5)
   const [minPageNumberLimit,setMinPageNumberLimit] = useState(0)
   const [maxPageNumberLimit,setMaxPageNumberLimit] = useState(5)

   
   const pageTest = (pageIndex)=>{
     setPageNumber(pageIndex + 1)
    
    
   }
   const renderPageNumbers = pages.map((pageIndex,index)=>{
    //  PageIndex = 0
    //  Hien thi 5 gia tri : 0 + 1 > 0 thi min la 1, max la 5 < 6 thi hien thi 5
    // gia tri tu 1 --> 5
    if(pageIndex + 1 > minPageNumberLimit && pageIndex + 1 < maxPageNumberLimit + 1 ){
     
      
       return(
      // Khi click vao phan tu index, neu index click vao === voi phan tu click thi them class active
      
      <div key={index} onClick={()=>setAddClass(index)}>
       
      
        <li  onClick={()=> pageTest(pageIndex)} className={index === addClass ? 'active page-item' : 'page-item'}><button  className="page-link">{pageIndex + 1}</button></li>
        
      </div>
      
    )
    }
    
     
    
  })
   
    return(
        <div>
  <style dangerouslySetInnerHTML={{__html: "\nbody {\n    color: #566787;\n    background: #f5f5f5;\n    font-family: 'Varela Round', sans-serif;\n    font-size: 13px;\n}\n.table-responsive {\n    margin: 30px 0;\n}\n.table-wrapper {\n    min-width: 1000px;\n    background: #fff;\n    padding: 20px 25px;\n    border-radius: 3px;\n    box-shadow: 0 1px 1px rgba(0,0,0,.05);\n}\n.table-title {\n    padding-bottom: 15px;\n    background: #299be4;\n    color: #fff;\n    padding: 16px 30px;\n    margin: -20px -25px 10px;\n    border-radius: 3px 3px 0 0;\n}\n.table-title h2 {\n    margin: 5px 0 0;\n    font-size: 24px;\n}\n.table-title .btn {\n    color: #566787;\n    float: right;\n    font-size: 13px;\n    background: #fff;\n    border: none;\n    min-width: 50px;\n    border-radius: 2px;\n    border: none;\n    outline: none !important;\n    margin-left: 10px;\n}\n.table-title .btn:hover, .table-title .btn:focus {\n    color: #566787;\n    background: #f2f2f2;\n}\n.table-title .btn i {\n    float: left;\n    font-size: 21px;\n    margin-right: 5px;\n}\n.table-title .btn span {\n    float: left;\n    margin-top: 2px;\n}\ntable.table tr th, table.table tr td {\n    border-color: #e9e9e9;\n    padding: 12px 15px;\n    vertical-align: middle;\n}\ntable.table tr th:first-child {\n    width: 60px;\n}\ntable.table tr th:last-child {\n    width: 100px;\n}\ntable.table-striped tbody tr:nth-of-type(odd) {\n    background-color: #fcfcfc;\n}\ntable.table-striped.table-hover tbody tr:hover {\n    background: #f5f5f5;\n}\ntable.table th i {\n    font-size: 13px;\n    margin: 0 5px;\n    cursor: pointer;\n}\t\ntable.table td:last-child i {\n    opacity: 0.9;\n    font-size: 22px;\n    margin: 0 5px;\n}\ntable.table td a {\n    font-weight: bold;\n    color: #566787;\n    display: inline-block;\n    text-decoration: none;\n}\ntable.table td a:hover {\n    color: #2196F3;\n}\ntable.table td a.settings {\n    color: #2196F3;\n}\ntable.table td a.delete {\n    color: #F44336;\n}\ntable.table td i {\n    font-size: 19px;\n}\ntable.table .avatar {\n    border-radius: 50%;\n    vertical-align: middle;\n    margin-right: 10px;\n}\n.status {\n    font-size: 30px;\n    margin: 2px 2px 0 0;\n    display: inline-block;\n    vertical-align: middle;\n    line-height: 10px;\n}\n.text-success {\n    color: #10c469;\n}\n.text-info {\n    color: #62c9e8;\n}\n.text-warning {\n    color: #FFC107;\n}\n.text-danger {\n    color: #ff5b5b;\n}\n.pagination {\n    float: right;\n    margin: 0 0 5px;\n}\n.pagination li a {\n    border: none;\n    font-size: 13px;\n    min-width: 30px;\n    min-height: 30px;\n    color: #999;\n    margin: 0 2px;\n    line-height: 30px;\n    border-radius: 2px !important;\n    text-align: center;\n    padding: 0 6px;\n}\n.pagination li a:hover {\n    color: #666;\n}\t\n.pagination li.active a, .pagination li.active a.page-link {\n    background: #03A9F4;\n}\n.pagination li.active a:hover {        \n    background: #0397d6;\n}\n.pagination li.disabled i {\n    color: #ccc;\n}\n.pagination li i {\n    font-size: 16px;\n    padding-top: 6px\n}\n.hint-text {\n    float: left;\n    margin-top: 10px;\n    font-size: 13px;\n}\n" }} />
  <div className="container-xl">
  <nav style={{ marginTop: '20px' }} aria-label="breadcrumb" class="main-breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Trang chủ</a></li>
            <li class="breadcrumb-item"><a href="/profile">{isAdmin ? "Admin Profile" : "User Profile"}</a></li>
            <li class="breadcrumb-item active" aria-current="page">Edit Profile</li>
          </ol>
          <div style={{textAlign: 'center'}} className="col-sm-12">
            <div style={{color : 'red'}}>{error}</div>
            <div style={{color : 'green',fontSize: '25px',fontWeight: 500}}>{success}</div>
            </div>
    </nav>
    <div className="table-responsive">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-5">
              <h2>Quản lí <b>người dùng</b></h2>
            </div>
            
          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>						
              <th>Ngày tạo</th>
              <th>Chức vụ</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
              {users.map((user,index)=>{
                  return(
            <tr key={index}>
              <td>{user._id}</td>
              <td><a href="#"><img style={{width: '30px'}} src={user.avatar} className="avatar" alt="Avatar" /> {user.name}</a></td>
              <td>{user.createdAt}</td>                        
              <td>{user.role===1 ? <div style={{color: 'red'}}>Admin</div> : 'User'}</td>
              <td><span className="status text-success">•</span> Active</td>
              <td>
                <Link to={`edit-profile/${user._id}`} className="settings" title="Edit" data-toggle="tooltip"><i class="far fa-edit"></i></Link>
                <a onClick={()=> onDelete(user._id)} href="#" className="delete" title="Delete" data-toggle="tooltip"><i class="far fa-trash-alt"></i></a>
              </td>
            </tr>
                  )
              })}
            
            
          </tbody>
        </table>
        <div className="clearfix">
          <div className="hint-text">Hiển thị <b>{users.length}</b> trên <b>{total}</b> người dùng</div>
         
            <ul className="pagination" >
              {pageNumber === 1 ? <li className="page-item" style={{display : 'none'}}><button onClick={gotoPrev} className="page-link"><i style={{fontSize : '10px'}} class="fas fa-angle-double-left"></i></button></li> : <li className="page-item" disabled><button onClick={gotoPrev} className="page-link"><i style={{fontSize : '10px'}} class="fas fa-angle-double-left"></i></button></li> }
            
            {
              
              renderPageNumbers
            }
            
            {pageNumber === totalPages ? <li className="page-item" style={{display : 'none'}}><button onClick={gotoNext} className="page-link"><i style={{fontSize : '10px'}} class="fas fa-angle-double-right"></i></button></li>: <li className="page-item"><button onClick={gotoNext} className="page-link"><i style={{fontSize : '10px'}} class="fas fa-angle-double-right"></i></button></li>}
            
          </ul>
           
        
          
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default EditProfile