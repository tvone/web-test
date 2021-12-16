import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchHistory,getHistory } from '../../redux/actions/paymentAction'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

const HistoryPayment = ()=>{
    const dispatch = useDispatch()
    const token = useSelector(state => state.tokenReducer)
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

    return(
        <div>
        <style dangerouslySetInnerHTML={{__html: "\nbody {\n    color: #566787;\n    background: #f5f5f5;\n    font-family: 'Varela Round', sans-serif;\n    font-size: 13px;\n}\n.table-responsive {\n    margin: 30px 0;\n}\n.table-wrapper {\n    min-width: 1000px;\n    background: #fff;\n    padding: 20px 25px;\n    border-radius: 3px;\n    box-shadow: 0 1px 1px rgba(0,0,0,.05);\n}\n.table-title {\n    padding-bottom: 15px;\n    background: #299be4;\n    color: #fff;\n    padding: 16px 30px;\n    margin: -20px -25px 10px;\n    border-radius: 3px 3px 0 0;\n}\n.table-title h2 {\n    margin: 5px 0 0;\n    font-size: 24px;\n}\n.table-title .btn {\n    color: #566787;\n    float: right;\n    font-size: 13px;\n    background: #fff;\n    border: none;\n    min-width: 50px;\n    border-radius: 2px;\n    border: none;\n    outline: none !important;\n    margin-left: 10px;\n}\n.table-title .btn:hover, .table-title .btn:focus {\n    color: #566787;\n    background: #f2f2f2;\n}\n.table-title .btn i {\n    float: left;\n    font-size: 21px;\n    margin-right: 5px;\n}\n.table-title .btn span {\n    float: left;\n    margin-top: 2px;\n}\ntable.table tr th, table.table tr td {\n    border-color: #e9e9e9;\n    padding: 12px 15px;\n    vertical-align: middle;\n}\ntable.table tr th:first-child {\n    width: 60px;\n}\ntable.table tr th:last-child {\n    width: 100px;\n}\ntable.table-striped tbody tr:nth-of-type(odd) {\n    background-color: #fcfcfc;\n}\ntable.table-striped.table-hover tbody tr:hover {\n    background: #f5f5f5;\n}\ntable.table th i {\n    font-size: 13px;\n    margin: 0 5px;\n    cursor: pointer;\n}\t\ntable.table td:last-child i {\n    opacity: 0.9;\n    font-size: 22px;\n    margin: 0 5px;\n}\ntable.table td a {\n    font-weight: bold;\n    color: #566787;\n    display: inline-block;\n    text-decoration: none;\n}\ntable.table td a:hover {\n    color: #2196F3;\n}\ntable.table td a.settings {\n    color: #2196F3;\n}\ntable.table td a.delete {\n    color: #F44336;\n}\ntable.table td i {\n    font-size: 19px;\n}\ntable.table .avatar {\n    border-radius: 50%;\n    vertical-align: middle;\n    margin-right: 10px;\n}\n.status {\n    font-size: 30px;\n    margin: 2px 2px 0 0;\n    display: inline-block;\n    vertical-align: middle;\n    line-height: 10px;\n}\n.text-success {\n    color: #10c469;\n}\n.text-info {\n    color: #62c9e8;\n}\n.text-warning {\n    color: #FFC107;\n}\n.text-danger {\n    color: #ff5b5b;\n}\n.pagination {\n    float: right;\n    margin: 0 0 5px;\n}\n.pagination li a {\n    border: none;\n    font-size: 13px;\n    min-width: 30px;\n    min-height: 30px;\n    color: #999;\n    margin: 0 2px;\n    line-height: 30px;\n    border-radius: 2px !important;\n    text-align: center;\n    padding: 0 6px;\n}\n.pagination li a:hover {\n    color: #666;\n}\t\n.pagination li.active a, .pagination li.active a.page-link {\n    background: #03A9F4;\n}\n.pagination li.active a:hover {        \n    background: #0397d6;\n}\n.pagination li.disabled i {\n    color: #ccc;\n}\n.pagination li i {\n    font-size: 16px;\n    padding-top: 6px\n}\n.hint-text {\n    float: left;\n    margin-top: 10px;\n    font-size: 13px;\n}\n" }} />
        <div className="container-xl">
        <nav style={{ marginTop: '20px' }} aria-label="breadcrumb" class="main-breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="/">Trang chủ</a></li>
                  <li class="breadcrumb-item"><a href="/profile">Profile</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Lịch sử giao dịch</li>
                </ol>
          </nav>

          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-5">
                    <h2>Lịch sử <b>giao dịch</b></h2>
                  </div>
                  
                </div>
              </div>
              <table className="table table-striped table-hover">
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
                  {history.map((item,index)=>{
                    return(
                  <tr key={index} >
                    <td>{item.paymentID}</td>
                    <td><a href="#">{item.name}</a></td>
                    <td>{item.email}</td>                        
                    <td>{item.createdAt}</td>
                    <td><span className="status text-success">•</span> Thanh toán</td>
                    <td>
                      <Link style={{marginLeft : 20}} to ={`/history/detail/${item._id}`}  className="settings" title="View" data-toggle="tooltip">View</Link>
                    </td>
                  </tr>
                    )
                  })}
                  
                   
                  
                  
                </tbody>
              </table>
              <div className="clearfix">
                {/* <div className="hint-text">Hiển thị <b>{}</b> trên <b>{}</b> người dùng</div> */}
                <div className="hint-text">{`Bạn có ${history.length} đơn hàng`}</div>
               
                  
                 
              
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default HistoryPayment