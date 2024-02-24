import { createSelector } from "@reduxjs/toolkit";
export const productsSelector = (state) => state.products
export const filtersSelector = (state) => state.filters

export const Selector = createSelector(
    productsSelector,
    filtersSelector,
    (products, filters) => {
        let filteredProducts = [...products.data]
        const { category } = filters
        if (category !== 'All') {
            filteredProducts = filteredProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
        }
        return filteredProducts
    },
)