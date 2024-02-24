import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../redux-toolkit/productSlice";
import filtersSlice from "../redux-toolkit/filterSlice";

const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        filters: filtersSlice.reducer
    }
})
export default store;