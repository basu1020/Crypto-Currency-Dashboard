import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    currency: "USD"
}

// slice for baseCurrency state. 
export const baseCurrencySlice = createSlice({
    name: 'baseCurrency',
    initialState,
    reducers: {
        baseCurrencyChanged: (state, action) => {
            state.currency = action.payload
        }
    },
})

//exporting reducer by default, actions and selectors
export const selectBaseCurrency = (state) => state.baseCurrency
export const { baseCurrencyChanged } = baseCurrencySlice.actions
export default baseCurrencySlice.reducer