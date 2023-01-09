import { configureStore } from "@reduxjs/toolkit";
import baseCurrenyReducer from '../globalStates/baseCurrencySlice'

export const store = configureStore({
    reducer: {
        baseCurrency: baseCurrenyReducer
    }
})