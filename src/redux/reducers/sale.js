import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {http_auth} from "../../utility/Utils"
import {toast} from "react-toastify"


export const getSales = createAsyncThunk('sale/getSales', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/sales', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getSaleById = createAsyncThunk('sale/getSaleById', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get(`/sales/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createSale = createAsyncThunk('sale/createSale', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/sales', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteSale = createAsyncThunk('sale/deleteSale', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.delete(`/sales/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const patchSale = createAsyncThunk('sale/patchSale', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.patch(`/sales/${data?.id}`, data?.body)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const salesSlice = createSlice({
    name: 'sales',
    initialState: {
        sales: [],
        sale: null,
        currentPage: 0,
        pageCount: 0,
       limit: 10,
        totalCount: 0
    },
    reducers: {
        setStore: (state, action) => {
            state.sale = action.payload
        }
    },
    extraReducers: {
        [getSales.fulfilled]: (state, action) => {
            state.sales = action.payload?.data
            state.currentPage = action.payload?.currentPage
            state.limit = action.payload?.limit
            state.pageCount = action.payload?.pageCount
            state.totalCount = action.payload?.totalCount
            state.isLoading = false
        },
        [getSales.pending]: (state) => {
            state.isLoading = true
        },
        [getSales.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [getSaleById.fulfilled]: (state, action) => {
            state.sale = action.payload.data
            state.isLoading = false
        },
        [getSaleById.pending]: (state) => {
            state.isLoading = true
        },
        [getSaleById.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [createSale.fulfilled]: (state, action) => {
            state.sales = [...state.sales, action.payload?.data]
            state.isLoading = false
        },
        [createSale.pending]: (state) => {
            state.isLoading = true
        },
        [createSale.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [deleteSale.fulfilled]: (state, action) => {
            state.sales = state.sales.filter(item => item.id !== action?.meta?.arg)
            state.isLoading = false
        },
        [deleteSale.pending]: (state) => {
            state.isLoading = true
        },
        [deleteSale.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [patchSale.fulfilled]: (state, action) => {
            state.sales[state.sales.findIndex(item => item.id === action.payload?.data?.id)] = action.payload?.data
            state.isLoading = false
        },
        [patchSale.pending]: (state) => {
            state.isLoading = true
        },
        [patchSale.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        }
    }
})

export const {setStore} = salesSlice.actions

export default salesSlice.reducer