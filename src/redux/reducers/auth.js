import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {toast} from "react-toastify"
import {http, TOKEN} from "../../utility/Utils"

export const login = createAsyncThunk('app/login', async (data) => {
    const response = await http.post('/auth', data)
    return response.data
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
            state.isLoading = false
        }
    }
})

export const {handleLogout} = authSlice.actions

export default authSlice.reducer