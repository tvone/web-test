import React from 'react'
import Swiper from 'swiper';
import SwiperCore, { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/swiper-bundle.css';
import banner from '../Home/banner/banner.png'
import banner1 from '../Home/banner/banner1.png'
import banner2 from '../Home/banner/banner2.png'
import banner3 from '../Home/banner/banner3.png'
import banner4 from '../Home/banner/banner4.png'
import banner5 from '../Home/banner/banner5.png'
import banner6 from '../Home/banner/banner6.png'
import img from '../Home/banner/img.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { fetchUser, getInfoUser } from '../../redux/actions/authAction'
// install Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y]);

const Home = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.authReducer)
    const { isAdmin, isLogged, cart } = auth

    const token = useSelector(state => state.tokenReducer)

    const product = useSelector(state => state.productsReducer)



    const showBanner = [banner, banner1, banner2, banner3, banner4, banner5, banner6]
    const swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    
    const [callback, setCallBack] = useState(false)

    useEffect(() => {
        if (token) {
            const getUser = () => {
                dispatch({ type: "LOGIN" })
                return fetchUser(token).then(res => {
                    dispatch(getInfoUser(res))
                    dispatch({type : "GET_CART",payload : res.data.cart})
                })
            }
            getUser()
        }
    }, [callback])

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
    const deleteProduct = async (id)=>{
       try {
           if(window.confirm('Ban co muon xoa san pham nay ?')){
               const res = await axios.delete(`/api/delete_product/${id}`,{
               headers : {Authorization : token}
           })
           setCallBack(!callback)
           }
           
           
       } catch (error) {
           
       }
    }
    return (

        <div>
            <div class="swiper-container mySwiper">
                <div class="swiper-wrapper">
                    {
                        showBanner.map((item, index) => {
                            return (
                                <div key={index} class="swiper-slide">
                                    <img src={item} alt="" />
                                </div>
                            )
                        })
                    }
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
            </div>
            <div className="container">
                <div className="text-product">
                    <h2>Sản phẩm mới</h2>
                </div>
                <div className="row">
                    {product.products.map((product, index) => {
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
                                                <Link className='button-1' to={`/edit-product/${product._id}`}>
                                                    Edit
                                                </Link>
                                                
                                                <button onClick={()=>deleteProduct(product._id)} className='button-2'>Delete</button>
                                            </div> : <button onClick={() => addToCart(product)} className="buy-1">ADD TO CART</button>
                                        }


                                    </div>
                                </div>
                            </div>
                        )
                    })}



                </div>



            </div>
        </div>

    )
}

export default Home