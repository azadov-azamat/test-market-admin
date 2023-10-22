import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {http_auth} from "../../utility/Utils"
import {toast} from "react-toastify"


export const getProducts = createAsyncThunk('product/getProducts', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/products', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const createProductFile = createAsyncThunk('product/createProductFile', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.post(`/products/file/${data?.addressId}/${data?.storeId}`, data?.body)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const createProduct = createAsyncThunk('product/createProduct', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/products', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.delete(`/products/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const patchProduct = createAsyncThunk('product/patchProduct', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.patch(`/products/${data?.id}`, data?.body)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        product: null,
        currentPage: 0,
        pageCount: 0,
       limit: 10,
        totalCount: 0
    },
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload
        }
    },
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload?.data
            state.currentPage = action.payload?.currentPage
            state.limit = action.payload?.limit
            state.pageCount = action.payload?.pageCount
            state.totalCount = action.payload?.totalCount
            state.isLoading = false
        },
        [getProducts.pending]: (state) => {
            state.isLoading = true
        },
        [getProducts.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [createProduct.fulfilled]: (state, action) => {
            state.products = [...state.products, action.payload?.data]
            state.isLoading = false
        },
        [createProduct.pending]: (state) => {
            state.isLoading = true
        },
        [createProduct.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [deleteProduct.fulfilled]: (state, action) => {
            state.products = state.products.filter(item => item.id !== action?.meta?.arg)
            state.isLoading = false
        },
        [deleteProduct.pending]: (state) => {
            state.isLoading = true
        },
        [deleteProduct.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [patchProduct.fulfilled]: (state, action) => {
            state.products[state.products.findIndex(item => item.id === action.payload?.data?.id)] = action.payload?.data
            state.isLoading = false
        },
        [patchProduct.pending]: (state) => {
            state.isLoading = true
        },
        [patchProduct.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        }
    }
})

export const {setProduct} = productSlice.actions

export default productSlice.reducer