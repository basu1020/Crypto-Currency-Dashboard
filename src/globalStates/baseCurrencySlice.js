import { createSlice } from "@reduxjs/toolkit";

const initialState = "USD"

const baseCurrencySlice = createSlice({
    name: 'baseCurrency',
    initialState,
    reducers: {
        baseCurrencyChanged(state, action){
            if(["GBP", "INR", "USD", "YEN", "EUR"].includes(action.payload)){
                state.baseCurrency = action.payload
            }
        }
    },
})

export const selectBaseCurrency = (state) => state.baseCurrency

export default baseCurrencySlice.reducer