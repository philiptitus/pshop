import store from "../store"
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,

    BRAND_LIST_REQUEST,
    BRAND_LIST_SUCCESS,
    BRAND_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    CATEGORYSPECIFIC_DETAILS_REQUEST,
    CATEGORYSPECIFIC_DETAILS_SUCCESS,
    CATEGORYSPECIFIC_DETAILS_FAIL,

    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,

    BRAND_DETAILS_REQUEST,
    BRAND_DETAILS_SUCCESS,
    BRAND_DETAILS_FAIL,


    BRANDSPECIFIC_DETAILS_REQUEST,
    BRANDSPECIFIC_DETAILS_SUCCESS,
    BRANDSPECIFIC_DETAILS_FAIL,


    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_FAVOURITE_REQUEST,
    PRODUCT_FAVOURITE_SUCCESS,
    PRODUCT_FAVOURITE_FAIL,
    PRODUCT_FAVOURITE_RESET,

    BOOKMARK_CREATE_FAIL,
    BOOKMARK_CREATE_REQUEST,
    BOOKMARK_CREATE_SUCCESS,
    BOOKMARK_CREATE_RESET,

    BOOKMARK_LIST_MY_FAIL,
    BOOKMARK_LIST_MY_REQUEST,
    BOOKMARK_LIST_MY_SUCCESS,
    BOOKMARK_LIST_MY_RESET,


    BOOKMARK_DELETE_FAIL,
    BOOKMARK_DELETE_REQUEST,
    BOOKMARK_DELETE_SUCCESS,
    BOOKMARK_DELETE_RESET,


    DBCART_CREATE_FAIL,
    DBCART_CREATE_REQUEST,
    DBCART_CREATE_SUCCESS,
    DBCART_CREATE_RESET,

    DBCART_LIST_MY_FAIL,
    DBCART_LIST_MY_REQUEST,
    DBCART_LIST_MY_SUCCESS,
    DBCART_LIST_MY_RESET,


    DBCART_DELETE_FAIL,
    DBCART_DELETE_REQUEST,
    DBCART_DELETE_SUCCESS,



    DBCART_EDIT_FAIL,
    DBCART_EDIT_REQUEST,
    DBCART_EDIT_SUCCESS,
    DBCART_EDIT_RESET,


    DBCART_DETAILS_REQUEST,
    DBCART_DETAILS_SUCCESS,
    DBCART_DETAILS_FAIL,


    DBCART_CLEAR_FAIL,
    DBCART_CLEAR_REQUEST,
    DBCART_CLEAR_SUCCESS,
    DBCART_CLEAR_RESET,



} from '../constants/productConstants'

export const productListReducer = (state = {products:[]}, action) =>{
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] } 
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }     
        case PRODUCT_LIST_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 


const initialStater = {
    loading: false,
    brands: [],
    error: null,
  };
  
  export const brandListReducer = (state = initialStater, action) => {
    switch (action.type) {
      case BRAND_LIST_REQUEST:
        return { ...state, loading: true, brands: [], error: null };
      case BRAND_LIST_SUCCESS:
        return { ...state, loading: false, brands: action.payload, error: null };
      case BRAND_LIST_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };


export const categoryListReducer = (state = {categories:[]}, action) =>{
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, categories: [] } 
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload }     
        case CATEGORY_LIST_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 








export const categoryDetailReducer = (state = { category: {}   }, action) =>{
    switch (action.type) {
        case CATEGORY_DETAILS_REQUEST:
            return { loading: true, ...state }
        case CATEGORY_DETAILS_SUCCESS:
            return { loading: false, category: action.payload }     
        case CATEGORY_DETAILS_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
}


export const brandDetailReducer = (state = { brand: {}   }, action) =>{
    switch (action.type) {
        case BRAND_DETAILS_REQUEST:
            return { loading: true, ...state }
        case BRAND_DETAILS_SUCCESS:
            return { loading: false, brand: action.payload }     
        case BRAND_DETAILS_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 


export const categoryspecificDetailsReducer = (state = { categoryspecific:[]   }, action) =>{
    switch (action.type) {
        case CATEGORYSPECIFIC_DETAILS_REQUEST:
            return { loading: true, categoryspecific:[] }
        case CATEGORYSPECIFIC_DETAILS_SUCCESS:
            return { loading: false, categoryspecific: action.payload }     
        case CATEGORYSPECIFIC_DETAILS_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 


export const productDetailsReducer = (state = { product: {reviews: [], specifications: [], smapleimages:[]}   }, action) =>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }     
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 


export const brandspecificDetailsReducer = (state = { brandspecific:[]   }, action) =>{
    switch (action.type) {
        case BRANDSPECIFIC_DETAILS_REQUEST:
            return { loading: true, brandspecific:[] }
        case BRANDSPECIFIC_DETAILS_SUCCESS:
            return { loading: false, brandspecific: action.payload }     
        case BRANDSPECIFIC_DETAILS_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 


export const productDeleteReducer = (state = {}, action) =>{
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success:true }     
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 


export const productCreateReducer = (state = {}, action) =>{
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false,success:true, product: action.payload}     
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error:action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
            
        default:
            return state
    
        
    }
} 

export const productUpdateReducer = (state = {product:{}}, action) =>{
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false,success:true, product: action.payload}     
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error:action.payload }
        case PRODUCT_UPDATE_RESET:
            return {product:{}}

            
        default:
            return state
    
        
    }
} 



export const productReviewCreateReducer = (state = {}, action) =>{
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false,success:true}     
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error:action.payload }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

            
        default:
            return state
    
        
    }
} 









  export const bookmarkCreateReducer = (state = {}, action) =>{
    switch (action.type) {
        case BOOKMARK_CREATE_REQUEST:
            return { loading: true } 
        case BOOKMARK_CREATE_SUCCESS:
            return { 
            loading: false,
            success: true,
             }     
        case BOOKMARK_CREATE_FAIL:
            return { 
                loading: false,
                 error:action.payload,
                 }
        case BOOKMARK_CREATE_RESET:
        return {}
         
        default:
            return state
    
        
    }
} 


export const bookmarkListReducer = (state = { bookmarks:[]}, action) => {
    switch (action.type) {
      case BOOKMARK_LIST_MY_REQUEST:
        return { 
          loading: true 
           
          };
      case BOOKMARK_LIST_MY_SUCCESS:
        return {
          loading: false,
          bookmarks: action.payload
        };
      case BOOKMARK_LIST_MY_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
        case BOOKMARK_LIST_MY_RESET:
        return {
          bookmarks:[]
        }

      default:
        return state;
    }
  };




  export const bookmarkDeleteReducer = (state = {}, action) =>{
    switch (action.type) {
        case BOOKMARK_DELETE_REQUEST:
            return { loading: true } 
        case BOOKMARK_DELETE_SUCCESS:
            return { loading: false, success:true }     
        case BOOKMARK_DELETE_FAIL:
            return { loading: false, error:action.payload }

      
      
            
        default:
            return state
    
        
    }
} 




export const dbCartCreateReducer = (state = {}, action) =>{
    switch (action.type) {
        case DBCART_CREATE_REQUEST:
            return { loading: true } 
        case DBCART_CREATE_SUCCESS:
            return { 
            loading: false,
            success: true,
             }     
        case DBCART_CREATE_FAIL:
            return { 
                loading: false,
                 error:action.payload,
                 }
        case DBCART_CREATE_RESET:
        return {}
         
        default:
            return state
    
        
    }
} 


export const dbcartListReducer = (state = { dbcarts:[]}, action) => {
    switch (action.type) {
      case DBCART_LIST_MY_REQUEST:
        return { 
          loading: true 
           
          };
      case DBCART_LIST_MY_SUCCESS:
        return {
          loading: false,
          dbcarts: action.payload
        };
      case DBCART_LIST_MY_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
        case DBCART_LIST_MY_RESET:
        return {
          dbcarts:[]
        }

      default:
        return state;
    }
  };




  export const dbcartDeleteReducer = (state = {}, action) =>{
    switch (action.type) {
        case DBCART_DELETE_REQUEST:
            return { loading: true } 
        case DBCART_DELETE_SUCCESS:
            return { loading: false, success:true }     
        case DBCART_DELETE_FAIL:
            return { loading: false, error:action.payload }

      
      
            
        default:
            return state
    
        
    }
} 






export const dbcartEditReducer = (state = {product:{}}, action) =>{
    switch (action.type) {
        case DBCART_EDIT_REQUEST:
            return { loading: true }
        case DBCART_EDIT_SUCCESS:
            return { loading: false,success:true, product: action.payload}     
        case DBCART_EDIT_FAIL:
            return { loading: false, error:action.payload }
        case DBCART_EDIT_RESET:
            return {product:{}}

            
        default:
            return state
    
        
    }
} 


export const dbcartDetailsReducer = (state = {}, action) =>{
    switch (action.type) {
        case DBCART_DETAILS_REQUEST:
            return { loading: true, ...state }
        case DBCART_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }     
        case DBCART_DETAILS_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 





export const dbcartClearReducer = (state = {}, action) =>{
    switch (action.type) {
        case DBCART_CLEAR_REQUEST:
            return { loading: true } 
        case DBCART_CLEAR_SUCCESS:
            return { loading: false, success:true }     
        case DBCART_CLEAR_FAIL:
            return { loading: false, error:action.payload }

      
      
            
        default:
            return state
    
        
    }
} 