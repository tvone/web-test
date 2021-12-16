import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import '../Category/Category.css'
import axios from 'axios'
import {fetchCategories,getCategories} from '../../redux/actions/categoriesAction'
const Category = ()=>{

    const initialState = {
        name : '',
        error : '',
        success : ''
    }
    
    const dispatch = useDispatch()
    const [data,setData] = useState(initialState)
    const {name,error,success} = data
    const token = useSelector(state => state.tokenReducer)
    const auth = useSelector(state => state.authReducer)
    const {isAdmin}  = auth
    const categories = useSelector(state => state.categoriesReducer)
    const [callback,setCallback] = useState(false)
    // Check edit:
    const [checkEdit,setCheckEdit] = useState(false)
    // Get ID , name update 
    const [id,setId] = useState('')
    const [nameUpdate,setNameUpdate] = useState('')
     useEffect(()=>{
       const  getAllCategory = ()=>{
         return fetchCategories().then(res=>{
           dispatch(getCategories(res))
         })
       }
       getAllCategory()
     },[callback])

  
    
    const handleChange = (e)=>{
        const {name,value} = e.target
        setData({...data,[name]:value,error : '',success : ''},)
    }
    const addCategory = async ()=>{
      try {
        if(checkEdit){
          // Update 
          const res = await axios.put(`/api/update_category/${id}`,{name},{
            headers : {Authorization : token}
          })
          setCallback(!callback)
          setData({...data,name : '',error : '',success: res.data.msg})
          setCheckEdit(false)
        }else{
          // Create
          const res = await axios.post('/api/create_category',{name},{
          headers : {Authorization : token}
        })
        setCallback(!callback)
        setData({...data,name : '',error : '',success : res.data.msg})
      }
        
      } catch (error) {
        error.response.data.msg &&
        setData({...data,error : error.response.data.msg,success : ''})
      }
    }
    const deleteCategory = async (id)=>{
      try {
        if(window.confirm(`Bạn có muốn xóa ${id}`)){
          const res = await axios.delete(`/api/delete_category/${id}`,{
            headers : {Authorization : token}
          })
          setCallback(!callback)
        setData({...data,error : '',success : res.data.msg})
      }
        
      } catch (error) {
        error.response.data.msg && 
        setData({...data,error : error.response.data.msg,success : ''})
      }
    }

    const updateCategory = (id,name)=>{
      setCheckEdit(true)
      setId(id)
      setNameUpdate(name)
     
    }
    return(
        <div>
        <style dangerouslySetInnerHTML={{__html: "\nbody {\n    color: #566787;\n    background: #f5f5f5;\n    font-family: 'Varela Round', sans-serif;\n    font-size: 13px;\n}\n.table-responsive {\n    margin: 30px 0;\n}\n.table-wrapper {\n    min-width: 1000px;\n    background: #fff;\n    padding: 20px 25px;\n    border-radius: 3px;\n    box-shadow: 0 1px 1px rgba(0,0,0,.05);\n}\n.table-title {\n    padding-bottom: 15px;\n    background: #299be4;\n    color: #fff;\n    padding: 16px 30px;\n    margin: -20px -25px 10px;\n    border-radius: 3px 3px 0 0;\n}\n.table-title h2 {\n    margin: 5px 0 0;\n    font-size: 24px;\n}\n.table-title .btn {\n    color: #566787;\n    float: right;\n    font-size: 13px;\n    background: #fff;\n    border: none;\n    min-width: 50px;\n    border-radius: 2px;\n    border: none;\n    outline: none !important;\n    margin-left: 10px;\n}\n.table-title .btn:hover, .table-title .btn:focus {\n    color: #566787;\n    background: #f2f2f2;\n}\n.table-title .btn i {\n    float: left;\n    font-size: 21px;\n    margin-right: 5px;\n}\n.table-title .btn span {\n    float: left;\n    margin-top: 2px;\n}\ntable.table tr th, table.table tr td {\n    border-color: #e9e9e9;\n    padding: 12px 15px;\n    vertical-align: middle;\n}\ntable.table tr th:first-child {\n    width: 60px;\n}\ntable.table tr th:last-child {\n    width: 100px;\n}\ntable.table-striped tbody tr:nth-of-type(odd) {\n    background-color: #fcfcfc;\n}\ntable.table-striped.table-hover tbody tr:hover {\n    background: #f5f5f5;\n}\ntable.table th i {\n    font-size: 13px;\n    margin: 0 5px;\n    cursor: pointer;\n}\t\ntable.table td:last-child i {\n    opacity: 0.9;\n    font-size: 22px;\n    margin: 0 5px;\n}\ntable.table td a {\n    font-weight: bold;\n    color: #566787;\n    display: inline-block;\n    text-decoration: none;\n}\ntable.table td a:hover {\n    color: #2196F3;\n}\ntable.table td a.settings {\n    color: #2196F3;\n}\ntable.table td a.delete {\n    color: #F44336;\n}\ntable.table td i {\n    font-size: 19px;\n}\ntable.table .avatar {\n    border-radius: 50%;\n    vertical-align: middle;\n    margin-right: 10px;\n}\n.status {\n    font-size: 30px;\n    margin: 2px 2px 0 0;\n    display: inline-block;\n    vertical-align: middle;\n    line-height: 10px;\n}\n.text-success {\n    color: #10c469;\n}\n.text-info {\n    color: #62c9e8;\n}\n.text-warning {\n    color: #FFC107;\n}\n.text-danger {\n    color: #ff5b5b;\n}\n.pagination {\n    float: right;\n    margin: 0 0 5px;\n}\n.pagination li a {\n    border: none;\n    font-size: 13px;\n    min-width: 30px;\n    min-height: 30px;\n    color: #999;\n    margin: 0 2px;\n    line-height: 30px;\n    border-radius: 2px !important;\n    text-align: center;\n    padding: 0 6px;\n}\n.pagination li a:hover {\n    color: #666;\n}\t\n.pagination li.active a, .pagination li.active a.page-link {\n    background: #03A9F4;\n}\n.pagination li.active a:hover {        \n    background: #0397d6;\n}\n.pagination li.disabled i {\n    color: #ccc;\n}\n.pagination li i {\n    font-size: 16px;\n    padding-top: 6px\n}\n.hint-text {\n    float: left;\n    margin-top: 10px;\n    font-size: 13px;\n}\n" }} />
        <div className="container-xl">
        <nav style={{ paddingTop: '20px' }} aria-label="breadcrumb" class="main-breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="/">Trang chủ</a></li>
                  <li class="breadcrumb-item"><a href="/profile">{isAdmin ? "Admin Profile" : "User Profile"}</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Quản lí danh mục</li>
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
                    <h2>Quản lí <b>danh mục</b></h2>
                  </div>
                  <div className="col-sm-7">
                        <div className="add-category">
                            <input onChange={handleChange} name="name" type="text" value={name} placeholder = {checkEdit ? `${nameUpdate}` : 'Thêm danh mục'} />
                            <button onClick={addCategory} className ="btn">{checkEdit ? 'Cập nhật' : 'Thêm'}</button>  <span onClick={()=>setCheckEdit(false)} style={{cursor : 'pointer',fontSize : '1rem'}}>X</span>
                           
                        </div>
                        
                    </div>
                </div>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>						
                    <th>Ngày tạo</th>
                    <th>Cập nhật lúc</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                {categories && categories.map((item,index)=>{
                  return(
                    <tr key={index} >
                    <td>{item._id}</td>
                    <td><a href="#"><img style={{width: '30px'}} src="https://res.cloudinary.com/dy8bra9fq/image/upload/v1623333395/Avatar/pplsqmgg5furbubilbs0.jpg" className="avatar" alt="Avatar" />{item.name} </a></td>
                    <td>{item.createdAt.slice(0,10) +' & '+ item.createdAt.slice(11,19)}</td>                        
                    <td>{item.updatedAt.slice(0,10) + ' & ' + item.updatedAt.slice(11,19)}</td>
                    <td><span className="status text-success">•</span> Active</td>
                    <td>
                      <a href="#" onClick={()=>updateCategory(item._id,item.name)}  className="settings" title="Edit" data-toggle="tooltip"><i class="far fa-edit"></i></a>
                      <a onClick ={()=>deleteCategory(item._id)}  href="#" className="delete" title="Delete" data-toggle="tooltip"><i class="far fa-trash-alt"></i></a>
                    </td>
                  </tr>
                  )
                })}
                  
                   <br></br>
                  
                  
                </tbody>
              </table>
              <div className="clearfix">
                <div className="hint-text">Hiển thị {categories.length} <b></b> trên <b></b> danh mục</div>
               
              
                <ul className="pagination" >
           <li className="page-item" disabled><button  className="page-link"><i style={{fontSize : '10px'}} class="fas fa-angle-double-left"></i></button></li> 
            
  
       
      
       <li  className='active page-item'><button  className="page-link">1</button></li>
       
   
            
            <li className="page-item"><button className="page-link"><i style={{fontSize : '10px'}} class="fas fa-angle-double-right"></i></button></li>
            
          </ul>
              
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Category