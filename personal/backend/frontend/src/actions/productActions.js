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


    BOOKMARK_CREATE_FAIL,
    BOOKMARK_CREATE_REQUEST,
    BOOKMARK_CREATE_SUCCESS,



    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,



    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,


    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,



    PRODUCT_FAVOURITE_REQUEST,
    PRODUCT_FAVOURITE_SUCCESS,
    PRODUCT_FAVOURITE_FAIL,


    BOOKMARK_DELETE_FAIL,
    BOOKMARK_DELETE_REQUEST,
    BOOKMARK_DELETE_SUCCESS,



    
    BOOKMARK_LIST_MY_FAIL,
    BOOKMARK_LIST_MY_REQUEST,
    BOOKMARK_LIST_MY_SUCCESS,
    BOOKMARK_LIST_MY_RESET,




    
    DBCART_CREATE_FAIL,
    DBCART_CREATE_REQUEST,
    DBCART_CREATE_SUCCESS,

    DBCART_LIST_MY_FAIL,
    DBCART_LIST_MY_REQUEST,
    DBCART_LIST_MY_SUCCESS,


    DBCART_DELETE_FAIL,
    DBCART_DELETE_REQUEST,
    DBCART_DELETE_SUCCESS,

    DBCART_EDIT_FAIL,
    DBCART_EDIT_REQUEST,
    DBCART_EDIT_SUCCESS,

    DBCART_DETAILS_REQUEST,
    DBCART_DETAILS_SUCCESS,
    DBCART_DETAILS_FAIL,

    DBCART_CLEAR_FAIL,
    DBCART_CLEAR_REQUEST,
    DBCART_CLEAR_SUCCESS,
    DBCART_CLEAR_RESET,


    CATEGORYSPECIFIC_DETAILS_REQUEST,
    CATEGORYSPECIFIC_DETAILS_SUCCESS,
    CATEGORYSPECIFIC_DETAILS_FAIL,


    BRANDSPECIFIC_DETAILS_REQUEST,
    BRANDSPECIFIC_DETAILS_SUCCESS,
    BRANDSPECIFIC_DETAILS_FAIL,



    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,

    BRAND_DETAILS_REQUEST,
    BRAND_DETAILS_SUCCESS,
    BRAND_DETAILS_FAIL,
} from '../constants/productConstants'
import axios from 'axios'



export const listProducts = (searchText ) => async (dispatch) => {

    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const { data } = await axios.get(`/api/products/?name=${searchText}`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        }
            )
    }  catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }

}


export const listCategories = (searchText) => async (dispatch) => {

    try {
        dispatch({type: CATEGORY_LIST_REQUEST})
        const { data } = await axios.get(`/api/products/categorys/?name=${searchText}`)

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        }
            )
    }  catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }

}


export const listBrands = (searchText) => async (dispatch) => {
    try {
      dispatch({ type: BRAND_LIST_REQUEST });
  
// Inside listProducts action
const { data } = await axios.get(`/api/products/brands/?name=${searchText}`);
  
      dispatch({
        type: BRAND_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BRAND_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/${id}/`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





export const listCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/category/${id}/`);

        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const listBrandDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: BRAND_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/brand/${id}/`);

        dispatch({
            type: BRAND_DETAILS_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: BRAND_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const listProductBrands = (id) => async (dispatch) => {
    try {
        dispatch({ type: BRANDSPECIFIC_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/brandspecific/${id}/`);

        dispatch({
            type: BRANDSPECIFIC_DETAILS_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: BRANDSPECIFIC_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listProductCategories = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORYSPECIFIC_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/categoryspecific/${id}/`);

        dispatch({
            type: CATEGORYSPECIFIC_DETAILS_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: CATEGORYSPECIFIC_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
 



export const deleteProduct = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_DELETE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/products/delete/${id}/`,
            config
        )
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createProduct = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/create/`,
            {},
            config
        )
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateProduct = (product) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_UPDATE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config
        )
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}






export const createProductReview = (productId, review) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST

        })

        const { 

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        )
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}








export const createBookmark = (productId) => async(dispatch, getState) => {
    try{
        dispatch({
            type: BOOKMARK_CREATE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/${productId}/add/`,
            {},
            config,
        )
        dispatch({
            type: BOOKMARK_CREATE_SUCCESS,
            payload:data
        })
        


    } catch (error) {
        dispatch({
            type: BOOKMARK_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const listMyBookmarks = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: BOOKMARK_LIST_MY_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            
            `/api/products/bookmarks/`,
            config,

        )
        dispatch({
            type: BOOKMARK_LIST_MY_SUCCESS,
            payload:data
        })


        


    } catch (error) {
        dispatch({
            type: BOOKMARK_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





export const deleteBookmark = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: BOOKMARK_DELETE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/products/bookmarks/delete/${id}/`,
            config
        )
        dispatch({
            type: BOOKMARK_DELETE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: BOOKMARK_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createdbCart = (productId, databaseCart) => async(dispatch, getState) => {
    try{
        dispatch({
            type: DBCART_CREATE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/${productId}/add/cart/`,
            databaseCart,
            config,
        )
        dispatch({
            type: DBCART_CREATE_SUCCESS,
            payload:data
        })
        


    } catch (error) {
        dispatch({
            type: DBCART_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const listMydbCarts = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: DBCART_LIST_MY_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            
            `/api/products/databasecarts/`,
            config,

        )
        dispatch({
            type: DBCART_LIST_MY_SUCCESS,
            payload:data
        })


        


    } catch (error) {
        dispatch({
            type: DBCART_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





export const deletedbCart = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: DBCART_DELETE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/products/databasecarts/delete/${id}/`,
            config
        )
        dispatch({
            type: DBCART_DELETE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: DBCART_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateCart = (product) => async(dispatch, getState) => {
    try{
        dispatch({
            type: DBCART_EDIT_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/products/updatecart/${product._id}/`,
            product,
            config
        )
        dispatch({
            type: DBCART_EDIT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: DBCART_EDIT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listCartProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: DBCART_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/databasecart/${id}/`);

        dispatch({
            type: DBCART_DETAILS_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: DBCART_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const cleardbCart = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: DBCART_CLEAR_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/products/databasecarts/delete/`,
            config
        )
        dispatch({
            type: DBCART_CLEAR_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: DBCART_CLEAR_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}