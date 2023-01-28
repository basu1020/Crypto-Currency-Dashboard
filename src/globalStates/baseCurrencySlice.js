import { createSlice } from "@reduxjs/toolkit";
import { fetchCoinsList } from "./coinsListSlice";

export const BaseCurrencyinitialState = {
    currency: "USD"
}

const baseCurrencySlice = createSlice({
    name: 'baseCurrency',
    initialState: BaseCurrencyinitialState,
    reducers: {
        baseCurrencyChanged: (state, action) => {
            state.currency = action.payload
        }
    },
})

export const selectBaseCurrency = (state) => state.baseCurrency

export const { baseCurrencyChanged } = baseCurrencySlice.actions

export default baseCurrencySlice.reducer