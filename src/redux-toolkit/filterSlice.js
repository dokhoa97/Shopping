import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        category: 'All'
    },
    reducers: {
        searchCategory: (state, action) => {
            state.category = action.payload
        }
    }
})
export default filtersSlice