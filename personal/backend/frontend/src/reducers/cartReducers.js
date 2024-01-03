import { 
    CART_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,

    } from '../constants/cartConstants'




export const cartReducer = (state = { shippingAddress :{} }, action) => {
    switch (action.type) {
            case CART_SHIPPING_ADDRESS:
                return{
                ...state,
                shippingAddress: action.payload
            }

            case CART_SAVE_PAYMENT_METHOD:
                return{
                ...state,
                paymentMethod: action.payload
            }


        default:
            return state
    }
}