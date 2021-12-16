import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Search = () => {
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)

    const searchWord = searchParams.get('search')

    
    
    const dispatch = useDispatch()
    const auth = useSelector(state => state.authReducer)
    const product = useSelector(state => state.productsReducer)
    const token = useSelector(state => state.tokenReducer)
    const {isAdmin,isLogged,cart} = auth

    const [callback,setCallBack] = useState(false)


    useEffect(()=>{
        const getProduct =  ()=>{
            dispatch({type : "GET_SEARCHWORD",payload : searchWord})
        }
        getProduct()
     
  },[searchWord])
  
    const addToCart = async (product) => {

        if (!isLogged) return alert('Bạn phải đăng nhập mới có thể mua hàng!')

        const check = cart.every(item => {
            return item._id !== product._id
        })
        if (check) {
            
            dispatch({ type: "GET_CART", payload: [...cart] })
            await axios.patch('/user/addCart', { cart: [...cart, { ...product, quantity: 1 }] }, {
                headers: { Authorization: token }
            })
        } else {
            alert('Sản phẩm đã có trong giỏ hàng!')
        }
        setCallBack(!callback)
    }

    // 
    const dataSearch = product.products.map((product, index) => {
        return (
            <div key={index} class="col-xs-3 col-sm-3 col-md-12 col-lg-3">
                <div className="gallery">
                    <div className="product-card">
                        <a href={`/xem_san_pham/${product._id}`}>
                            <img src={product.images.url} />
                            <h3>{product.title}</h3>
                        </a>

                        <p>{product.description}</p>
                        <h6>Giá: ${product.price}</h6>
                        <ul>
                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                        </ul>
                        {
                            isAdmin ? <div className="product-button">
                                <button className='button-1'>Edit</button>
                                <button className='button-2'>Delete</button>
                            </div> : <button onClick={() => addToCart(product)} className="buy-1">ADD TO CART</button>
                        }


                    </div>
                </div>
            </div>
        )
    })
    return(
        <div className="container">
                <h2 style={{paddingTop : '20px'}}>Kết quả tìm kiếm : {searchWord} </h2>
           
                <div className="row">
                    {product.products.length !== 0 ? dataSearch : <p style={{paddingTop : 50,color : 'red',fontSize : '3rem'}}>Kết quả tìm kiếm không tồn tại</p>}



                </div>



            </div>
    )
}
export default Search