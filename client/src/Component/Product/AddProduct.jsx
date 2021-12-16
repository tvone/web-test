import React from 'react'
import '../Product/Product.css'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const AddProduct = ()=>{
    const categories = useSelector(state => state.categoriesReducer)
    const product = useSelector(state => state.productsReducer)

    const initialState ={
        title : '',
        price : '',
        description : '',
        content : '',
        category : ''
    }
    
    const [img,setImg] = useState(false)
    const token = useSelector(state => state.tokenReducer)
    const [data,setData] = useState(initialState)
   
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    const [callback,setCallBack] = useState(false)
    const [loading,setLoading] = useState(false)
    
    const [edit,setEdit] = useState(false)

    const {id} = useParams()

    const {title,price,description,content,category} = data

    const handleChange = (e)=>{
        const {name,value} = e.target
        setData({...data,[name]:value})
    }
    useEffect(()=>{
        if(id){
            setEdit(true)
            product.products.forEach(item=> {
                if(item._id === id){
                    setData(item)
                    console.log(item)
                    setImg(item.images)
                }
            })
        }else{
           setEdit(false)
           setData(initialState)
           setImg(false)
        }
    },[product,id,callback])

    const handleChangeUpload = async (e) => {
        setLoading(true)
        const file = e.target.files[0]
        console.log(file)
        const formData = new FormData()
        formData.append('file',file)
        const res = await axios.post('/api/upload_product',formData,{
            headers : {Authorization : token}
        })
        setLoading(false)
        setImg(res.data)
    }
    
    const removeImgProduct = async () =>{
        try {
            const res = await axios.post('/api/remove_product',{public_id : img.public_id},{
                headers : {Authorization : token}

            })
          
            setImg(false)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
          if(edit){
              const res = await axios.put(`/api/update_product/${id}`,{...data,images : img},{
                  headers : {Authorization : token}
              })
              setSuccess(res.data.msg)
          }else{
              if(!category) return alert('Vui lòng chọn 1 danh mục')
              const res = await axios.post('/api/create_product',{...data,images : img},{
                  headers : { Authorization : token}
              })
              setSuccess(res.data.msg)
          }
          
            setCallBack(!callback)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    return(
        <div className="container">
            <div className='add-product'>
                <p style={{color: 'red'}}>{loading ? 'Đang tải ảnh lên...' : ''}</p>
        <div className="upload-product">
            <input onChange={handleChangeUpload} type="file" name='file' id='file-up' />
            <div className="form-img" style={img ? {display : 'block'} : {display : 'none'}}>
               <img src={img.url} alt="" />
              
               <span onClick={removeImgProduct}> {img ? 'X' : ''}</span>
           </div>
        </div>
          
               <form>
                   <div className="row">
                       <h1> {edit ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'} </h1>
                       <p style={{color : 'green'}}>{success}</p>
                   </div>
                   <div className="row">
                       <div className="add_product_name">
                       <label htmlFor="add_product_name">Tên Sản Phẩm</label>
                       <input value={title} onChange ={handleChange} type="text" name='title' id='add_product_name' />
                   </div>
                   </div>
                   <div className="row">
                       <div className="add_product_price">
                       <label htmlFor="add_product_price">Giá Sản Phẩm</label>
                       <input value={price} onChange ={handleChange} type="text" name="price" id="add_product_price"/>
                   </div>
                   </div>
                   
                   <div className="row">
                       <div className="add_product_description">
                       <label htmlFor="add_product_description">Mô tả sản phẩm</label>
                       <textarea value={description} onChange ={handleChange} type="text" name="description" id="add_product_description"></textarea>
                       
                   </div>
                   </div>
                   <div className="row">
                       <div className="add_product_content">
                       <label htmlFor="add_product_content">Nội dung sản phẩm</label>
                       <textarea value={content} onChange ={handleChange} type="text" name="content" id="add_product_content"></textarea>
                   </div>
                   </div>
                   <div className="row">
                       <div className="add_product_category">
                       <label htmlFor="add_product_category">Danh mục sản phẩm : </label>
                       <select value={category} name="category" id="category" onChange={handleChange}>
                            <option >Vui lòng chọn một danh mục</option>
                           {categories && categories.map(item=>{
                               return(
                                   <option key={item._id}>{item.name}</option>
                               )
                           })}
                       </select>
                       
                   </div>
                   </div>
                   
                   
                   <button onClick={handleSubmit} type="submit" class="btn btn-info">{edit ? 'Cập nhật' : 'Thêm sản phẩm'}</button>
                   
               </form>
           
        </div>
        </div>
        
    )
}

export default AddProduct