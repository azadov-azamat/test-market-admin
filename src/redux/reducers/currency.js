import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {http_auth} from "../../utility/Utils"
import {toast} from "react-toastify"


export const getCurrencies = createAsyncThunk('currency/getCurrencies', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/currencies', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getCurrencyById = createAsyncThunk('currency/getCurrencyById', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get(`/currencies/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createCurrency = createAsyncThunk('currency/createCurrency', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/currencies', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteCurrency = createAsyncThunk('currency/deleteCurrency', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.delete(`/currencies/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const patchCurrency = createAsyncThunk('currency/patchCurrency', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.patch(`/currencies/${data?.id}`, data?.body)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const currenciesSlice = createSlice({
    name: 'currencies',
    initialState: {
        currencies: [],
        currency: null,
        currentPage: 0,
        pageCount: 0,
       limit: 10,
        totalCount: 0
    },
    reducers: {
        setCurrency: (state, action) => {
            state.currency = action.payload
        }
    },
    extraReducers: {
        [getCurrencies.fulfilled]: (state, action) => {
            state.currencies = action.payload?.data.reverse()
            state.currentPage = action.payload?.currentPage
            state.limit = action.payload?.limit
            state.pageCount = action.payload?.pageCount
            state.totalCount = action.payload?.totalCount
            state.isLoading = false
        },
        [getCurrencies.pending]: (state) => {
            state.isLoading = true
        },
        [getCurrencies.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [getCurrencyById.fulfilled]: (state, action) => {
            state.currency = action.payload.data
            state.isLoading = false
        },
        [getCurrencyById.pending]: (state) => {
            state.isLoading = true
        },
        [getCurrencyById.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [createCurrency.fulfilled]: (state, action) => {
            state.currencies = [...state.currencies, action.payload?.data].reverse()
            state.isLoading = false
        },
        [createCurrency.pending]: (state) => {
            state.isLoading = true
        },
        [createCurrency.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [deleteCurrency.fulfilled]: (state, action) => {
            state.currencies = state.currencies.filter(item => item.id !== action?.meta?.arg)
            state.isLoading = false
        },
        [deleteCurrency.pending]: (state) => {
            state.isLoading = true
        },
        [deleteCurrency.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [patchCurrency.fulfilled]: (state, action) => {
            state.currencies[state.currencies.findIndex(item => item.id === action.payload?.data?.id)] = action.payload?.data
            state.isLoading = false
        },
        [patchCurrency.pending]: (state) => {
            state.isLoading = true
        },
        [patchCurrency.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        }
    }
})

export const {setCurrency} = currenciesSlice.actions

export default currenciesSlice.reducer