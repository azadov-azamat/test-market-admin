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

export const getClients = createAsyncThunk('app/getClients', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/clients', {
            params: data
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getClientById = createAsyncThunk('app/getClientById', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get(`/clients/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const createClient = createAsyncThunk('app/createClient', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/clients', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteClient = createAsyncThunk('app/deleteClient', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.delete(`/clients/${data}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const patchClient = createAsyncThunk('app/patchClient', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.patch(`/clients/${data?.id}`, data?.body)
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
        },

        [getClients.fulfilled]: (state, action) => {
            state.users = action.payload?.data
            state.currentPage = action.payload?.currentPage
            state.limit = action.payload?.limit
            state.pageCount = action.payload?.pageCount
            state.totalCount = action.payload?.totalCount
            state.isLoading = false
        },
        [getClients.pending]: (state) => {
            state.isLoading = true
        },
        [getClients.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [getClientById.fulfilled]: (state, action) => {
            state.user = action.payload?.data
            state.isLoading = false
        },
        [getClientById.pending]: (state) => {
            state.isLoading = true
        },
        [getClientById.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [createClient.fulfilled]: (state, action) => {
            state.users = [...state.users, action.payload?.data]
            state.isLoading = false
        },
        [createClient.pending]: (state) => {
            state.isLoading = true
        },
        [createClient.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [deleteClient.fulfilled]: (state, action) => {
            state.users = state.users.filter(item => item.id !== action?.meta?.arg)
            state.isLoading = false
        },
        [deleteClient.pending]: (state) => {
            state.isLoading = true
        },
        [deleteClient.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        },

        [patchClient.fulfilled]: (state, action) => {
            state.users[state.users.findIndex(item => item.id === action.payload?.data?.id)] = action.payload?.data
            state.isLoading = false
        },
        [patchClient.pending]: (state) => {
            state.isLoading = true
        },
        [patchClient.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false
        }

    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer