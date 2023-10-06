import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {http_auth} from "../../utility/Utils"
import {toast} from "react-toastify"


export const getDebtsList = createAsyncThunk('debt/getDebtsList', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/debts', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getDebtById = createAsyncThunk('debt/getDebtById', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get(`/debts/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createDebt = createAsyncThunk('debt/createDebt', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/debts', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteDebt = createAsyncThunk('debt/deleteDebt', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.delete(`/debts/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const patchDebt = createAsyncThunk('debt/patchDebt', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.patch(`/debts/${data?.id}`, data?.body)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const debtsSlice = createSlice({
    name: 'debts',
    initialState: {
        debts: [],
        debt: null,
        currentPage: 0,
        pageCount: 0,
        limit: 0,
        totalCount: 0
    },
    reducers: {
        setStore: (state, action) => {
            state.debt = action.payload
        }
    },
    extraReducers: {
        [getDebtsList.fulfilled]: (state, action) => {
            state.debts = action.payload?.data
            state.currentPage = action.payload?.currentPage
            state.limit = action.payload?.limit
            state.pageCount = action.payload?.pageCount
            state.totalCount = action.payload?.totalCount
            state.isLoading = false
        },
        [getDebtsList.pending]: (state) => {
            state.isLoading = true
        },
        [getDebtsList.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [getDebtById.fulfilled]: (state, action) => {
            state.debt = action.payload.data
            state.isLoading = false
        },
        [getDebtById.pending]: (state) => {
            state.isLoading = true
        },
        [getDebtById.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [createDebt.fulfilled]: (state, action) => {
            state.debts = [...state.debts, action.payload?.data]
            state.isLoading = false
        },
        [createDebt.pending]: (state) => {
            state.isLoading = true
        },
        [createDebt.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [deleteDebt.fulfilled]: (state, action) => {
            state.debts = state.debts.filter(item => item.id !== action?.meta?.arg)
            state.isLoading = false
        },
        [deleteDebt.pending]: (state) => {
            state.isLoading = true
        },
        [deleteDebt.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [patchDebt.fulfilled]: (state, action) => {
            state.debts[state.debts.findIndex(item => item.id === action.payload?.data?.id)] = action.payload?.data
            state.isLoading = false
        },
        [patchDebt.pending]: (state) => {
            state.isLoading = true
        },
        [patchDebt.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        }
    }
})

export const {setStore} = debtsSlice.actions

export default debtsSlice.reducer