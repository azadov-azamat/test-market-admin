import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {http_auth} from "../../utility/Utils"
import {toast} from "react-toastify"


export const getUsers = createAsyncThunk('app/getUsers', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/sellers', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const createUser = createAsyncThunk('app/createUser', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/sellers', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteUser = createAsyncThunk('app/deleteUser', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.delete(`/sellers/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const patchUser = createAsyncThunk('app/patchUser', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.patch(`/sellers/${data?.id}`, data?.body)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        user: null,
        currentPage: 0,
        pageCount: 0,
        limit: 0,
        totalCount: 0
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: {
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload?.data
            state.currentPage = action.payload?.currentPage
            state.limit = action.payload?.limit
            state.pageCount = action.payload?.pageCount
            state.totalCount = action.payload?.totalCount
            state.isLoading = false
        },
        [getUsers.pending]: (state) => {
            state.isLoading = true
        },
        [getUsers.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [createUser.fulfilled]: (state, action) => {
            state.users = [...state.users, action.payload?.data]
            state.isLoading = false
        },
        [createUser.pending]: (state) => {
            state.isLoading = true
        },
        [createUser.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [deleteUser.fulfilled]: (state, action) => {
            state.users = state.users.filter(item => item.id !== action?.meta?.arg)
            state.isLoading = false
        },
        [deleteUser.pending]: (state) => {
            state.isLoading = true
        },
        [deleteUser.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [patchUser.fulfilled]: (state, action) => {
            state.users[state.users.findIndex(item => item.id === action.payload?.data?.id)] = action.payload?.data
            state.isLoading = false
        },
        [patchUser.pending]: (state) => {
            state.isLoading = true
        },
        [patchUser.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer