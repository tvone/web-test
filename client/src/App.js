import './App.css';
import Header from './Component/Header/Header';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './Component/Register/Login';
import Register from './Component/Register/Register';
import ActivationEmail from './Component/Register/ActivationEmail';
import{useEffect} from 'react'
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
import {fetchUser,getInfoUser} from './redux/actions/authAction'
import Home from './Component/Home/Home';
import Profile from './Component/Profile/Profile';
import EditProfile from './Component/Profile/EditProfile';
import NotFound from './Component/NotFound/NotFound'
import ForgotPassword from './Component/ForgotPassword/ForgotPassword';
import ResetPassword from './Component/ForgotPassword/ResetPassword';
import UpdateRole from './Component/Profile/UpdateRole';
import DetailProduct from './Component/Product/DetailProduct.jsx';
import {fetchProducts,getProducts} from './redux/actions/productsAction'
import Cart from './Component/Cart/Cart';
import HistoryPaypal from './Component/Payment/HistoryPayment';
import DetailPaypal from './Component/Payment/DetailPaypal';
import Category from './Component/Category/Category';
import AddProduct from './Component/Product/AddProduct';
import {fetchCategories,getCategories} from './redux/actions/categoriesAction'
import { fetchHistories,getAllHistories } from './redux/actions/historiesAction'
import Search from './Component/Search/Search';

function App() {

  const dispatch  = useDispatch()
  const auth = useSelector(state=> state.authReducer)
  const token = useSelector(state => state.tokenReducer)
  const products = useSelector(state => state.productsReducer)
  const {searchWord} = products

  const {isAdmin,isLogged} = auth
  useEffect(()=>{
     const firstLogin = localStorage.getItem('firstLogin')
     if(firstLogin){
       const getToken = async ()=>{
          try {
            const res = await axios.post('/user/refresh_token',null)
    
            dispatch({type: 'GET_TOKEN',payload : res.data.access_token})
          } catch (error) {
            return error
          }
       }
       getToken()
     }
  },[dispatch])

  useEffect(()=>{
    if(token){
      const getUser = ()=>{
           dispatch({type : "LOGIN"})
           return fetchUser(token).then(res=>{
             dispatch(getInfoUser(res))
             dispatch({type : "GET_CART",payload : res.data.cart})
           })
      }
      getUser()
    }
  },[token,dispatch])

 
  useEffect(()=>{
        const getProduct =  ()=>{
            return fetchProducts(searchWord).then(res =>{
                dispatch(getProducts(res))
                console.log(res)
            })
        }
        getProduct()
     
  },[searchWord])
  useEffect(()=>{
    const getAllCategory = ()=>{
      return fetchCategories().then(res=>{
        dispatch(getCategories(res))
      })
    }
    getAllCategory()
  },[])

  useEffect(()=>{
    if(isAdmin){
        const getsHistorys = async ()=>{
           return fetchHistories(token).then(res=>{
                dispatch(getAllHistories (res))
               
           })
           
        }
        getsHistorys()
    }
 },[isAdmin])
  return (
    <div>
      <BrowserRouter>
         <Header/>
        <Switch>
          <Route exact path='/dangnhap' component={Login}/>
          <Route exact path='/dangki' component={Register}/>
          <Route exact path='/user/activation/:activation_token' component={ActivationEmail}></Route>
          <Route exact path='/' component={Home}/>
          <Route exact path='/profile' component={isLogged ? Profile : NotFound}/>
          <Route exact path='/edit-profile'component={isAdmin ? EditProfile : NotFound}/>
          <Route exact path='/edit-profile/:id' component ={isAdmin ? UpdateRole : NotFound}/>
          <Route exact path='/quen-mat-khau' component={ForgotPassword}/>
          <Route exact path ='/user/reset/:token' component={ResetPassword}/>
          <Route exact path='/xem_san_pham/:id' component={DetailProduct}/>
          <Route exact path='/history' component={HistoryPaypal}/>
          <Route exact path='/history/detail/:id' component={DetailPaypal}/>
          <Route exact path='/cart' component={Cart}/>
          <Route exact path='/category-manager' component ={Category}/>
          <Route exact path='/add-product' component ={AddProduct}/>
          <Route exact path='/edit-product/:id' component ={AddProduct}/>
          <Route exact path='/result' component={Search}/>
          <Route exact path='*' component={NotFound}/>
          
        </Switch>
      </BrowserRouter>
         
    </div>
  );
}

export default App;
