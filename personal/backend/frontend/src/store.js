import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { 
    productListReducer, 
    productDetailsReducer, 
    productUpdateReducer,
    productDeleteReducer,
    productCreateReducer, 
    productReviewCreateReducer, 
    bookmarkCreateReducer, 
    bookmarkListReducer, 
    bookmarkDeleteReducer,
    dbCartCreateReducer, 
    dbcartListReducer, 
    dbcartDeleteReducer,
    dbcartEditReducer,
    dbcartDetailsReducer,
    dbcartClearReducer,
    categoryListReducer,
    brandListReducer,
    categoryspecificDetailsReducer,
    brandspecificDetailsReducer,
    brandDetailReducer,
    categoryDetailReducer,



} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListReducer, ordersReducer, orderDeliveredReducer } from './reducers/orderReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    userLoginReducer,
     userRegisterReducer,
      userDetailsReducer, 
      userUpdateProfileReducer,
       userListReducer,
        userDeleteReducer, 
        userUpdateReducer, 
        accountDeleteReducer,
    } from './reducers/userReducers'


const reducer = combineReducers(
    {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        productDelete: productDeleteReducer,
        productCreate: productCreateReducer,
        productUpdate: productUpdateReducer,
        productReviewCreate: productReviewCreateReducer,
        bookmarkCreate: bookmarkCreateReducer,
        bookmarkListMy:bookmarkListReducer,
        bookmarkDelete: bookmarkDeleteReducer,
        dbCartCreate: dbCartCreateReducer,
        dbCartListMy:dbcartListReducer,
        dbCartDelete: dbcartDeleteReducer,
        dbCartEdit: dbcartEditReducer,
        dbCartDetail: dbcartDetailsReducer,
        dbCartClear:dbcartClearReducer,
        categoryList: categoryListReducer,
        brandList: brandListReducer,
        categoryspecificDetails:categoryspecificDetailsReducer,
        brandspecificDetails:brandspecificDetailsReducer,
        categoryDetails:categoryDetailReducer,
        brandDetails:brandDetailReducer,



        cart: cartReducer,
        
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userList: userListReducer,
        userUpdateProfile:userUpdateProfileReducer,
        userDelete: userDeleteReducer,
        userUpdate: userUpdateReducer,
        accountDelete:accountDeleteReducer,

        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer,
        orderListMy:orderListReducer,
        orderCreate: orderCreateReducer,
        orderList: ordersReducer,
        orderDeliver: orderDeliveredReducer,

    }
)


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}



const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null



const initialstate = {
    cart: {
         shippingAddress: shippingAddressFromStorage,

         
        },
    userLogin: { userInfo: userInfoFromStorage }

}

const middleware = [thunk]
const store = createStore(reducer, initialstate, 
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store