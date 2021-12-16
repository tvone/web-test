import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaypalButton from './PaypalButton'
import './vnpay.css'
const Cart = () => {
  const dispatch = useDispatch()

  const auth = useSelector(state => state.authReducer)

  const token = useSelector(state => state.tokenReducer)

  const { cart } = auth

  const [q,setq] = useState(1)

  const [total, setTotal] = useState(0)

  // Cart Item :
  const cartItem = cart && cart.map((product, index) => {
    return (
      <div key={index} className="product">
        <div className="product-image">
          <img src={product.images.url} />
        </div>
        <div className="product-details">
          <div className="product-title">{product.title}</div>
          <p className="product-description">{product.description}</p>
        </div>
        <div className="product-price">{product.price}</div>
        <div className="product-quantity">
          <button onClick={() => decrement(product._id)}>-</button> <input name ="quantityInput" onChange = {(e)=>quantityInput(e,product._id)} style={{width : 50,textAlign : 'center'}} type="tel" value ={product.quantity}/> <button onClick={() => { increment(product._id) }}>+</button>
        </div>
        <div className="product-removal">
          <button onClick={() => deleteProduct(product._id)} className="remove-product">
            Xóa
          </button>
        </div>
        <div className="product-line-price">{product.price * product.quantity}</div>
      </div>
    )
  })

  // Update Cart
  const updateCart = async (cart) => {
    await axios.patch('/user/addCart', {cart}, {
      headers: { Authorization: token }
    })
  }


  // Total  Product :
  useEffect(() => {
    const getTotal = () => {
      const total = cart && cart.reduce((prev, item) => {

        return prev + (item.price * item.quantity)

      }, 0)
      setTotal(total)
    }
    getTotal()
  }, [cart, total])
  const quantityInput = (e,id) =>{
    const {name,value} = e.target

    setq({[name]:value})

    cart.forEach(item=>{
      if(item._id === id){
         item.quantity = q.quantityInput
         
         
      }
      dispatch({type : 'GET_CART',payload : [...cart]})
    })
    updateCart(cart)
 }
 


  // Tang so luong :
  const increment = (id) => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity +=1
      }
      dispatch({ type: "GET_CART", payload: [...cart] })
    })

    updateCart(cart)
  }
  // Giam so luong :
  const decrement = (id) => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
      }
      dispatch({ type: "GET_CART", payload: [...cart] })
    })

    updateCart(cart)
  }

 
  // Delete Product :
  const deleteProduct = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không ?')) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1)
        }
        dispatch({ type: "GET_CART", payload: [...cart] })
      })

    }
    updateCart(cart)
  }
  // Thanh toan Paypal :
  const tranSuccess = async (payment) => {
    try {
      const { address, paymentID} = payment
      
       await axios.post('/api/create_payment', { cart, address, paymentID }, {
        headers: { Authorization: token }
      })

    dispatch({ type: "GET_CART", payload: [] })

     updateCart([])

    alert(`Thanh toán đơn hàng ${paymentID} thành công`)
    
    } catch (error) {
      console.log(error)
    }
       
  }

  return (

    <div className="container" style={{ paddingTop: 20 }}>
      <h1>Giỏ hàng</h1>
      <div className="shopping-cart">
        <div className="column-labels">
          <label className="product-image">Hình ảnh</label>
          <label className="product-details">Sản phẩm</label>
          <label className="product-price">Giá</label>
          <label className="product-quantity">Số lượng</label>
          <label className="product-removal">Xóa</label>
          <label className="product-line-price">Tổng tiền</label>
        </div>

        {cart.length !== 0 ? cartItem : 'Giỏ hàng hiện chưa có gì !'}

        <div className="totals">
          <div className="totals-item">
            <label>Tổng cộng : </label>
            <div className="totals-value" id="cart-subtotal">{total}</div>
          </div>
        </div>
        <div className="checkout-paypal">
         <PaypalButton
            total={total} tranSuccess={tranSuccess} />
        </div>
        <div className="checkout-vnpay">
          <a href="/checkout/vnpay">VnPay</a>
        </div>
        {/* <button className="checkout">Thanh toán</button> */}




      </div>

    </div>

  )
}

export default Cart