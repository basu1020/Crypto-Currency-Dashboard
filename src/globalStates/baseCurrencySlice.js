import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    currency: "USD"
}

export const baseCurrencySlice = createSlice({
    name: 'baseCurrency',
    initialState,
    reducers: {
        baseCurrencyChanged: (state, action) => {
            state.currency = action.payload
        }
    },
})

export const selectBaseCurrency = (state) => state.baseCurrency

export const { baseCurrencyChanged } = baseCurrencySlice.actions

export default baseCurrencySlice.reducer