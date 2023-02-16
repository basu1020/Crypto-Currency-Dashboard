import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from '@reduxjs/toolkit'
import coinsListReducer, { fetchCoinsList } from "../globalStates/coinsListSlice"
import currentCoinReducer from "../globalStates/currentCoinSlice"
import currencyChartDataReducer, { fetchCoinData } from "../globalStates/currencyChartDataSlice"
import baseCurrencyReducer from "../globalStates/baseCurrencySlice"
import PriceChart from "../components/Price-chart/PriceChart";
import '@testing-library/jest-dom/extend-expect';

describe('PriceChart Componenent', () => {
    let store
    let component
    let getByText
    let coinSelectorElement

    beforeEach(async () => {
        store = configureStore({
            reducer: {
                coinsList: coinsListReducer,
                baseCurrency: baseCurrencyReducer,
                currentCoin: currentCoinReducer,
                currencyChartData: currencyChartDataReducer
            },
        })

        await store.dispatch(fetchCoinsList("USD"))
        await store.dispatch(fetchCoinData(["bitcoin", "usd", "1"]))

        component = render(
            <Provider store={store}>
                <PriceChart />
            </Provider>)
    
        coinSelectorElement = screen.getByTestId("coinSelector")
        getByText = component.getByText
    })

    it("should render current baseCurrency, current coin", () => {
        const paragraphElement = component.container.querySelectorAll("p")
        expect(paragraphElement[0]).toHaveTextContent("USD")
        expect(paragraphElement[1]).toHaveTextContent("Bitcoin")
    })

    // it("should change and dispatch coins upon selecting different options", async () => {
    //     const coinSelectorElement = await component.container.querySelector("#coinSelector")
    //     console.log(typeof coinSelectorElement)
    //     const paragraphElement = await component.container.querySelectorAll("p")
    //     fireEvent.change(coinSelectorElement, { target: { value: 'ethereum+Ethereum' } })
    //     await waitFor(() => {
    //         expect(paragraphElement[1]).toHaveTextContent("Ethereum")
    //     })
    // })

    it("should display charts", async () => {
        
    })
})