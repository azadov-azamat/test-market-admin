import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {http_auth} from "../../utility/Utils"
import {toast} from "react-toastify"


export const getFirms = createAsyncThunk('firm/getFirms', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/firms', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getFirmById = createAsyncThunk('firm/getFirmById', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get(`/firms/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createFirm = createAsyncThunk('firm/createFirm', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/firms', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteFirm = createAsyncThunk('firm/deleteFirm', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.delete(`/firms/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const patchFirm = createAsyncThunk('firm/patchFirm', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.patch(`/firms/${data?.id}`, data?.body)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const firmsSlice = createSlice({
    name: 'firms',
    initialState: {
        firms: [],
        firm: null,
        currentPage: 0,
        pageCount: 0,
       limit: 10,
        totalCount: 0
    },
    reducers: {
        setFirm: (state, action) => {
            state.firm = action.payload
        }
    },
    extraReducers: {
        [getFirms.fulfilled]: (state, action) => {
            state.firms = action.payload?.data.reverse()
            state.currentPage = action.payload?.currentPage
            state.limit = action.payload?.limit
            state.pageCount = action.payload?.pageCount
            state.totalCount = action.payload?.totalCount
            state.isLoading = false
        },
        [getFirms.pending]: (state) => {
            state.isLoading = true
        },
        [getFirms.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [getFirmById.fulfilled]: (state, action) => {
            state.firm = action.payload.data
            state.isLoading = false
        },
        [getFirmById.pending]: (state) => {
            state.isLoading = true
        },
        [getFirmById.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [createFirm.fulfilled]: (state, action) => {
            state.firms = [...state.firms, action.payload?.data].reverse()
            state.isLoading = false
        },
        [createFirm.pending]: (state) => {
            state.isLoading = true
        },
        [createFirm.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [deleteFirm.fulfilled]: (state, action) => {
            state.firms = state.firms.filter(item => item.id !== action?.meta?.arg)
            state.isLoading = false
        },
        [deleteFirm.pending]: (state) => {
            state.isLoading = true
        },
        [deleteFirm.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [patchFirm.fulfilled]: (state, action) => {
            state.firms[state.firms.findIndex(item => item.id === action.payload?.data?.id)] = action.payload?.data
            state.isLoading = false
        },
        [patchFirm.pending]: (state) => {
            state.isLoading = true
        },
        [patchFirm.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        }
    }
})

export const {setFirm} = firmsSlice.actions

export default firmsSlice.reducer