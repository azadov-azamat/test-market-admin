import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {http_auth, http_nbu} from "../../utility/Utils"
import {toast} from "react-toastify"


export const getPayments = createAsyncThunk('payment/getPayments', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/payments', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getPaymentById = createAsyncThunk('payment/getPaymentById', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get(`/payments/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createPayment = createAsyncThunk('payment/createPayment', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/payments', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deletePayment = createAsyncThunk('payment/deletePayment', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.delete(`/payments/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const patchPayment = createAsyncThunk('payment/patchPayment', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.patch(`/payments/${data?.id}`, data?.body)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getCurrencyNbu = createAsyncThunk('payment/getCurrencyNbu', async (_, {rejectWithValue}) => {
    try {
        const response = await http_nbu.get('/arkhiv-kursov-valyut/json/')
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const paymentsSlice = createSlice({
    name: 'payments',
    initialState: {
        payments: [],
        payment: null,
        currencies: [],
        currentPage: 0,
        pageCount: 0,
       limit: 10,
        totalCount: 0
    },
    reducers: {
        setPayment: (state, action) => {
            state.payment = action.payload
        }
    },
    extraReducers: {
        [getPayments.fulfilled]: (state, action) => {
            state.payments = action.payload?.data.reverse()
            state.currentPage = action.payload?.currentPage
            state.limit = action.payload?.limit
            state.pageCount = action.payload?.pageCount
            state.totalCount = action.payload?.totalCount
            state.isLoading = false
        },
        [getPayments.pending]: (state) => {
            state.isLoading = true
        },
        [getPayments.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [getPaymentById.fulfilled]: (state, action) => {
            state.payment = action.payload.data
            state.isLoading = false
        },
        [getPaymentById.pending]: (state) => {
            state.isLoading = true
        },
        [getPaymentById.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [createPayment.fulfilled]: (state, action) => {
            state.payments = [...state.payments, ...action.payload?.data].reverse()
            state.isLoading = false
        },
        [createPayment.pending]: (state) => {
            state.isLoading = true
        },
        [createPayment.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [deletePayment.fulfilled]: (state, action) => {
            state.payments = state.payments.filter(item => item.id !== action?.meta?.arg)
            state.isLoading = false
        },
        [deletePayment.pending]: (state) => {
            state.isLoading = true
        },
        [deletePayment.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [patchPayment.fulfilled]: (state, action) => {
            state.payments[state.payments.findIndex(item => item.id === action.payload?.data?.id)] = action.payload?.data
            state.isLoading = false
        },
        [patchPayment.pending]: (state) => {
            state.isLoading = true
        },
        [patchPayment.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [getCurrencyNbu.fulfilled]: (state, action) => {
            state.currencies = action.payload
        }
    }
})

export const {setPayment} = paymentsSlice.actions

export default paymentsSlice.reducer