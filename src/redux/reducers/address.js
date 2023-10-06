import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {http_auth} from "../../utility/Utils"
import {toast} from "react-toastify"


export const getAddresses = createAsyncThunk('addresses/getAddresses', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/adresses', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const createAddress = createAsyncThunk('addresses/createAddress', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/adresses', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteAddress = createAsyncThunk('addresses/deleteAddress', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.delete(`/adresses/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const patchAddress = createAsyncThunk('addresses/patchAddress', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.patch(`/adresses/${data?.id}`, data?.body)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const addressSlice = createSlice({
    name: 'address',
    initialState: {
        addresses: [],
        address: null,
        currentPage: 0,
        pageCount: 0,
       limit: 10,
        totalCount: 0
    },
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload
        }
    },
    extraReducers: {
        [getAddresses.fulfilled]: (state, action) => {
            state.addresses = action.payload?.data
            state.currentPage = action.payload?.currentPage
            state.limit = action.payload?.limit
            state.pageCount = action.payload?.pageCount
            state.totalCount = action.payload?.totalCount
            state.isLoading = false
        },
        [getAddresses.pending]: (state) => {
            state.isLoading = true
        },
        [getAddresses.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [createAddress.fulfilled]: (state, action) => {
            state.addresses = [...state.addresses, action.payload?.data]
            state.isLoading = false
        },
        [createAddress.pending]: (state) => {
            state.isLoading = true
        },
        [createAddress.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [deleteAddress.fulfilled]: (state, action) => {
            state.addresses = state.addresses.filter(item => item.id !== action?.meta?.arg)
            state.isLoading = false
        },
        [deleteAddress.pending]: (state) => {
            state.isLoading = true
        },
        [deleteAddress.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [patchAddress.fulfilled]: (state, action) => {
            state.addresses[state.addresses.findIndex(item => item.id === action.payload?.data?.id)] = action.payload?.data
            state.isLoading = false
        },
        [patchAddress.pending]: (state) => {
            state.isLoading = true
        },
        [patchAddress.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        }
    }
})

export const {setAddress} = addressSlice.actions

export default addressSlice.reducer