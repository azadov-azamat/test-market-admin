import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {http_auth} from "../../utility/Utils"

export const uploadFile = createAsyncThunk('file/uploadFile', async (data, {rejectWithValue}) => {
    try {
        const response = await http_auth.post('/upload', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const fileSlice = createSlice({
    name: 'file',
    initialState: {
        file: null,
        currentPage: 0,
        pageCount: 0,
       limit: 10,
        totalCount: 0
    },
    reducers: {},
    extraReducers: {
        [uploadFile.fulfilled]: (state, action) => {
            state.file = {
                fileName: action.payload?.filename,
                url: action.payload?.url
            }
            state.isLoading = false
        }
    }
})

export const {} = fileSlice.actions

export default fileSlice.reducer