import React from 'react'
import '../Header/Header.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'

const Header = () => {
    const auth = useSelector(state => state.authReducer)
    const dataProduct = useSelector(state => state.productsReducer)
   
    const {isLogged, user, cart } = auth

    const onLogout = () => {
        axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href = "/"
    }
    // Filter Data :
    const [filterData,setFilterData] = useState([])
   

    const handleFilter = (e)=>{
       const searchWord = e.target.value
       const newFilter = dataProduct.products.filter((value)=>{
           return value.title.toLowerCase().includes(searchWord.toLowerCase())
       })
       if(searchWord.length !== 0){
          setFilterData(newFilter) 
       }else{
           setFilterData([])
       }
       
    }
    return (
        <div>
            <div className="wrapper">
                <nav>
                    <div className="content">
                        <div className="cancel-menu"><span className='fas fa-times'></span></div>
                        <div style={{ color: 'white', fontSize: '18px' }} className="menu-icon"><i className='fas fa-bars'></i></div>
                        <div className="logo"><a href="/">K63MMT</a></div>
                        <ul className="links">
                            <li><a href="/">Trang chủ</a></li>
                            <li>
                                <a class="desktop-link" href="#">Danh mục <i style={{ fontSize: '15px' }} class="fas fa-angle-down"></i></a>
                                <input type="checkbox" id="show-category" />
                                <label htmlFor="show-category">Danh mục <i style={{ fontSize: '15px' }} class="fas fa-angle-down"></i></label>
                                <ul>
                                    <li><a href="#">Điện thoại</a></li>
                                    <li><a href="#">Laptop</a></li>
                                    <li><a href="#">Máy tính bảng</a></li>
                                    <li><a href="#">Đồng hồ thông minh</a></li>
                                    <li><a href="#">Phụ kiện</a></li>
                                </ul>
                            </li>
                            <li>
                                <a class="desktop-link" href="#">Sản phẩm <i style={{ fontSize: '15px' }} class="fas fa-angle-down"></i></a>
                                <input type="checkbox" id="show-product" />
                                <label htmlFor="show-product">Sản phẩm <i style={{ fontSize: '15px' }} class="fas fa-angle-down"></i></label>
                                <ul>
                                    <li>
                                        <a href="#">Apple</a>

                                        <ul>
                                            <li><a href="#">Iphone</a></li>
                                            <li><a href="#">Macbook</a></li>
                                            <li><a href="#">Apple Watch</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">SamSung</a></li>
                                    <li><a href="#">Huawei</a></li>
                                    <li><a href="#">Oppo</a></li>
                                    <li><a href="#">Xiaomi</a></li>
                                </ul>
                            </li>


                            <li><a href="#">Giới thiệu</a></li>
                            <li><a href="#">Liên hệ</a></li>
                            {
                                isLogged ? <div className="user_login">
                                    <div className="user_img">
                                        <img src={user.avatar} alt="sign-in" />
                                        {user.name}
                                        <i style={{ marginLeft: '5px' }} class="fas fa-caret-down"></i>
                                    </div>
                                    <ul>
                                        <li><Link to="/profile">Thông tin cá nhân</Link></li>
                                        <li onClick={onLogout}><a href="/">Đăng xuất</a></li>

                                    </ul>
                                </div> : <li>
                                    <a className='desktop-link' href="#">Tài khoản <i style={{ fontSize: '15px' }} class="fas fa-angle-down"></i></a>
                                    <input type="checkbox" id="show-nick" />
                                    <label htmlFor="show-nick">Tài khoản <i style={{ fontSize: '15px' }} class="fas fa-angle-down"></i></label>
                                    <ul>
                                        <li><a href="/dangnhap">Đăng nhập</a></li>
                                        <li><a href="/dangki">Đăng kí</a></li>
                                    </ul>
                                </li>
                            }
                        </ul>
                    </div>


                    <div className="user_cart">

                        <span>{cart && cart.length !== 0 ? cart.length : 0}</span>
                        <Link to='/cart'>
                            <i class="fas fa-shopping-cart"></i>
                        </Link>
                    </div>
                    <div className="search-icon"><span className='fas fa-search'></span></div>
                    <div className="cancel-icon"><span className='fas fa-times'></span></div>
                    <form action="/result">
                        <input onChange={handleFilter} name="search" type="search" placeholder='Tìm kiếm...' className='search-data' required />
                        
                        <button type='submit' className='button-search fas fa-search'></button>
                        {filterData.length != 0 && <div className="dataSearch">
                            {filterData.slice(0,5).map((item,index)=>{
                                return (
                                    <a className="dataItem" key={index} target="_blank" href={`/xem_san_pham/${item._id}`}>
                                        <img style={{width : 50}} src={item.images.url} alt="" /><p>{item.title}</p>
                                    </a>
                                )
                            })}
                        </div>}
                        
                    </form>
                    

                </nav>
            </div>
        </div>
    )
}

export default Header