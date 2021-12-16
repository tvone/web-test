import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router'

const DetailProduct = ()=>{
  const {id} = useParams()
  const product = useSelector(state => state.productsReducer)
  const auth = useSelector(state =>  state.authReducer)
  const {isAdmin} = auth
  const [detailProduct,setDetailProduct] = useState([])
  

  useEffect(()=>{
    if(id){
      product.products.forEach(product=>{
        if(product._id === id) setDetailProduct(product)
      })
    }
  },[id,product])
  console.log(detailProduct)
  if(detailProduct.length === 0)  return null
  
    return(
      <div className="container">
<div className="super_container">
  <div className="single_product">
    <div className="container-fluid" style={{backgroundColor: '#fff', padding: '11px'}}>
      <div className="row">
       
        <div className="col-lg-4 order-lg-2 order-1">
          <div className="image_selected"><img src={detailProduct.images.url} alt="" /></div>
        </div>
        <div className="col-lg-6 order-3">
          <div className="product_description">
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
               
                <li className="breadcrumb-item active">Sản phẩm</li>
              </ol>
            </nav>
            <div className="product_name">{detailProduct.title}</div>
            <div className="product-rating"><span className="badge badge-success"><i className="fa fa-star"/>4.5 Star</span> <span className="rating-review">0 Đánh giá &amp; 0 Reviews</span></div>
            <div><span className="product_price">Giá : ${detailProduct.price}</span>  </div>  
            {/* <strike className="product_discount"> <span style={{color: 'black'}}>₹ 2,000<span> </span></span></strike> */}
            {/* <div> <span className="product_saved">You Saved:</span> <span style={{color: 'black'}}>₹ 2,000<span> </span></span></div> */}
            <hr className="singleline" />
            <div > 
              <span className="product_info"><span><span  className="product_info">Bảo hành : 6 tháng bảo hành<span><br /> <span className="product_info">7 ngày hoàn trả hàng nếu có vấn đề<span><br /> <span className="product_info"><span> <span className="product_info" >Đã bán : {detailProduct.sold} sản phẩm<span> </span></span></span></span></span></span></span></span></span></span>
            </div>
            {/* <div>
             
                <div className="row" style={{marginTop: '15px'}}>
                <div className="col-xs-6" style={{marginLeft: '15px'}}> <span className="product_options">RAM Options</span><br /> <button className="btn btn-primary btn-sm">4 GB</button> <button className="btn btn-primary btn-sm">8 GB</button> <button className="btn btn-primary btn-sm">16 GB</button> </div>
                <div className="col-xs-6" style={{marginLeft: '55px'}}> <span className="product_options">Storage Options</span><br /> <button className="btn btn-primary btn-sm">500 GB</button> <button className="btn btn-primary btn-sm">1 TB</button> </div>
              </div>
            </div> */}
            <hr className="singleline" />
            <div className="order_info d-flex flex-row">
              <form action="#">
              </form></div>
            <div className="row">
              <div className="col-xs-6" style={{marginLeft: '15px'}}style ={{marginTop : 20}}>
                <div className="product_quantity"> <span>Số lượng: </span> <input id="quantity_input" type="text" pattern="[0-9]*" defaultValue={1} />
                  <div className="quantity_buttons">
                    <div id="quantity_inc_button" className="quantity_inc quantity_control"><i className="fas fa-chevron-up" /></div>
                    <div id="quantity_dec_button" className="quantity_dec quantity_control"><i className="fas fa-chevron-down" /></div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6"  > 
              <button type="button" className="btn btn-primary shop-button">Add to Cart</button> 
              {/* <button type="button" className="btn btn-success shop-button">Mua ngay</button> */}
                <div className="product_fav"><i className="fas fa-heart" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    
      <div className="row row-underline">
        <div className="col-md-6"> <span className=" deal-text">Thông tin sản phẩm :</span> </div>
        <div className="col-md-6"> <a href="#" data-abc="true"> <span className="ml-auto view-all" /> </a> </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="col-md-12">
            <tbody>
              <tr className="row mt-10">
                <td className="col-md-4"><span className="p_specification">Sales Package :</span> </td>
                <td className="col-md-8">
                  <ul>
                    <li>2 in 1 Mobile, Power Adaptor, Active Stylus Pen, User Guide, Warranty Documents</li>
                  </ul>
                </td>
              </tr>
              <tr className="row mt-10">
                <td className="col-md-4"><span className="p_specification">Model Number :</span> </td>
                <td className="col-md-8">
                  <ul>
                    <li> 14-dh0107TU </li>
                  </ul>
                </td>
              </tr>
              <tr className="row mt-10">
                <td className="col-md-4"><span className="p_specification">Part Number :</span> </td>
                <td className="col-md-8">
                  <ul>
                    <li>7AL87PA</li>
                  </ul>
                </td>
              </tr>
              <tr className="row mt-10">
                <td className="col-md-4"><span className="p_specification">Color :</span> </td>
                <td className="col-md-8">
                  <ul>
                    <li>Black</li>
                  </ul>
                </td>
              </tr>
              <tr className="row mt-10">
                <td className="col-md-4"><span className="p_specification">Suitable for :</span> </td>
                <td className="col-md-8">
                  <ul>
                    <li>Processing &amp; Multitasking</li>
                  </ul>
                </td>
              </tr>
              <tr className="row mt-10">
                <td className="col-md-4"><span className="p_specification">Processor Brand :</span> </td>
                <td className="col-md-8">
                  <ul>
                    <li>{detailProduct.category}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {detailProduct.content}
{/* Sản phẩm cùng danh mục : */}
      <div className="row row-underline">
        <div className="col-md-6"> <span className=" deal-text">Sản phẩm tương tự :</span> </div>
        <div className="col-md-6"> <a href="#" data-abc="true"> <span className="ml-auto view-all" /> </a> </div>
  </div>
  <div className="row">
                    {product.products.slice(0,8).map((item,index)=>{
                      if(item.category === detailProduct.category){
                          return(
                      <div key={index} class="col-xs-3 col-sm-3 col-md-12 col-lg-3">
                        <div className="gallery">
                            <div className="product-card">
                                <a href={`/xem_san_pham/${item._id}`}>
                                    <img src={item.images.url}/>
                                <h3>{item.title}</h3>
                                </a>
                                
                                <p>{item.description}</p>
                                <h6>Giá: ${item.price}</h6>
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
                                </div> : <button className="buy-1">ADD TO CART</button>
                                }
                                
                                
                            </div>
                        </div>
                    </div>
                        )
                      }else{
                        return null
                      }
                      
                    })}
                    
               
                   
                </div>
    </div>
  </div>
  
  
</div>

      </div>
    )
}

export default DetailProduct
