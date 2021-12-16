import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useState,useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { fetchHistory,getHistory } from '../../redux/actions/paymentAction'
const DetailPaypal = () =>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const token = useSelector(state => state.tokenReducer)
    const [detailPaypal,setDetailPaypal] = useState([])
    const historys = useSelector(state => state.historyReducer)

    const {history} = historys


    useEffect(()=>{
        if(token){
            const getsHistory = async ()=>{
               return fetchHistory(token).then(res=>{
                    dispatch(getHistory(res))
                   
               })
               
            }
            getsHistory()
        }
     },[token])

    useEffect(()=>{
        if(id){
           history.forEach(item=>{
               if(item._id === id) setDetailPaypal(item)
           })
           
        }
    },[id,history])
   console.log(detailPaypal)
   if(detailPaypal.length === 0) return null
    
    return(
        <div className='container'>
           <h1 style={{marginTop : 20}}>Chi tiết lịch sử giao dịch</h1>
           
           <table class="table table-hover">
               <thead>
                   <tr>
                       <th>Name</th>
                       <th>Địa chỉ</th>
                       <th>Mã bưu điện</th>
                       <th>Mã vùng</th>
                   </tr>
               </thead>
               <tbody>
                    <tr>
                       <td>{detailPaypal.address.recipient_name}</td>
                       <td>{detailPaypal.address.line1 + " - " + detailPaypal.address.city + " - " + detailPaypal.address.state}</td>
                       <td>{detailPaypal.address.postal_code}</td>
                       <td>{detailPaypal.address.country_code}</td>
                   </tr> 
               </tbody>
           </table>
           <h1>Thông tin sản phẩm</h1>
           <table class="table table-hover">
               <thead>
                   <tr>
                       <th>ID</th>
                       <th>Tên sản phẩm</th>
                       <th>Số lượng</th>
                       <th>Giá</th>
                   </tr>
               </thead>
               <tbody>
                   {detailPaypal.cart.map((item,index)=>{
                       return(
                    <tr>
                        <td>
                            {item._id}
                        </td>
                       <td>
                           <img style={{width : 100}} src={item.images.url} alt="" /> {item.title}
                       </td>
                       <td>{item.quantity} sản phẩm</td>
                       <td>${item.price * item.quantity}</td>
                       <td>{}</td>
                   </tr>   
                       )
                   })}
                    
               </tbody>
           </table>
           
           
        </div>
    )
}

export default DetailPaypal