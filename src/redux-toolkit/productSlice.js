import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        customerList: [],
        status: 'idle',
    },
    reducers: {
        addCustomer: (state, action) => {
            state.customerList.push({ ...action.payload })

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataThunkAction.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchDataThunkAction.fulfilled, (state, action) => {
                state.status = 'idle'
                state.data = action.payload
            })
            .addCase(fetchDataThunkAction.rejected, (state, action) => {

            })
    }
})
export const fetchDataThunkAction = createAsyncThunk('fetchDataThunkAction', async () => {
    let res = await fetch(`http://localhost:3030/products`)
    let data = await res.json()
    return data
})
export default productSlice