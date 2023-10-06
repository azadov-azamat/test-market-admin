import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {http_auth} from "../../utility/Utils"
import {toast} from "react-toastify"


export const getStores = createAsyncThunk('store/getStores', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/stores', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const createStore = createAsyncThunk('store/createStore', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/stores', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteStore = createAsyncThunk('store/deleteStore', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.delete(`/stores/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const patchStore = createAsyncThunk('store/patchStore', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.patch(`/stores/${data?.id}`, data?.body)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const storesSlice = createSlice({
    name: 'stores',
    initialState: {
        stores: [],
        store: null,
        currentPage: 0,
        pageCount: 0,
       limit: 10,
        totalCount: 0
    },
    reducers: {
        setStore: (state, action) => {
            state.store = action.payload
        }
    },
    extraReducers: {
        [getStores.fulfilled]: (state, action) => {
            state.stores = action.payload?.data
            state.currentPage = action.payload?.currentPage
            state.limit = action.payload?.limit
            state.pageCount = action.payload?.pageCount
            state.totalCount = action.payload?.totalCount
            state.isLoading = false
        },
        [getStores.pending]: (state) => {
            state.isLoading = true
        },
        [getStores.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [createStore.fulfilled]: (state, action) => {
            state.stores = [...state.stores, action.payload?.data]
            state.isLoading = false
        },
        [createStore.pending]: (state) => {
            state.isLoading = true
        },
        [createStore.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [deleteStore.fulfilled]: (state, action) => {
            state.stores = state.stores.filter(item => item.id !== action?.meta?.arg)
            state.isLoading = false
        },
        [deleteStore.pending]: (state) => {
            state.isLoading = true
        },
        [deleteStore.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [patchStore.fulfilled]: (state, action) => {
            state.stores[state.stores.findIndex(item => item.id === action.payload?.data?.id)] = action.payload?.data
            state.isLoading = false
        },
        [patchStore.pending]: (state) => {
            state.isLoading = true
        },
        [patchStore.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        }
    }
})

export const {setStore} = storesSlice.actions

export default storesSlice.reducer