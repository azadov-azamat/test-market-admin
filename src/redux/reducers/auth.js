import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {toast} from "react-toastify"
import {http, http_auth, TOKEN} from "../../utility/Utils"

export const login = createAsyncThunk('app/login', async (data) => {
    const response = await http.post('/auth', data)
    return response.data
})

export const getUserMe = createAsyncThunk('app/getUserMe', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.get('/sellers/me')
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userData: {},
        idEguMsg: '',
        isAuth: false,
        authModal: false,
        isLoading: false,
        accessToken: localStorage.getItem(TOKEN) || ""
    },
    reducers: {
        handleLogout: state => {
            state.userData = {}
            state.accessToken = ''
            state.isAuth = false
            localStorage.removeItem(TOKEN)
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.userData = action.payload?.data?.seller
            state.accessToken = action.payload.data?.token
            state.isAuth = true
            localStorage.setItem(TOKEN, action.payload.data?.token)
            state.isLoading = false
        },
        [login.pending]: (state) => {
            state.isLoading = true
        },
        [login.rejected]: (state, action) => {
            toast.error(action.error.message)
            state.isAuth = false
            state.isLoading = false
        },

        [getUserMe.fulfilled]: (state, action) => {
            state.userData = action.payload?.data
            state.isAuth = true
            state.isLoading = false
        },
        [getUserMe.pending]: (state) => {
            state.isLoading = true
        },
        [getUserMe.rejected]: (state) => {
            state.isAuth = false
            state.isLoading = false
        }
    }
})

export const {handleLogout} = authSlice.actions

export default authSlice.reducer