import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from '@reduxjs/toolkit'
import coinsListReducer, { fetchCoinsList } from "../globalStates/coinsListSlice"
import currentCoinReducer, { coinChange } from "../globalStates/currentCoinSlice"
import currencyChartDataReducer, { fetchCoinData } from "../globalStates/currencyChartDataSlice"
import baseCurrencyReducer from "../globalStates/baseCurrencySlice"

jest.mock('react-chartjs-2', () => ({
    Line: () => <canvas data-testid='line-chart'></canvas>,
    Bar: () => <canvas data-testid='bar-chart'></canvas>
}))

import PriceChart from "../components/Price-chart/PriceChart";
// import '@testing-library/jest-dom/extend-expect';

// Describing a test suite for PriceChart Component
describe('PriceChart Componenent', () => {
    let store
    let component
    let getByText
    let coinSelectorElement
    let paragraphElement
    let lineChart
    let chartSelector

    // Setting up the store and rendering the component before running any tests
    beforeAll(async () => {
        // Creating a new Redux store with reducers
        store = configureStore({
            reducer: {
                coinsList: coinsListReducer,
                baseCurrency: baseCurrencyReducer,
                currentCoin: currentCoinReducer,
                currencyChartData: currencyChartDataReducer
            },
        })

        // Dispatching actions to fetch the coins list and coin data
        await store.dispatch(fetchCoinsList("USD"))
        await store.dispatch(fetchCoinData(["bitcoin", "usd", "1"]))

        // Rendering the PriceChart component wrapped inside a Provider with the store as a prop
        component = render(<Provider store={store}>
            <PriceChart />
        </Provider>)

        // Getting the necessary elements from the rendered component
        coinSelectorElement = component.getByTestId("coinSelector")
        getByText = component.getByText
        paragraphElement = component.container.querySelectorAll("p")
        lineChart = component.getByTestId("line-chart")
        chartSelector = component.getByTestId("chartSelector")
    })

    // Cleaning up the rendered component after running all tests
    afterAll(cleanup)

    // Testing whether the current baseCurrency and current coin are rendered correctly
    it("should render current baseCurrency, current coin", () => {
        expect(paragraphElement[0]).toHaveTextContent("USD")
        expect(paragraphElement[1]).toHaveTextContent("Bitcoin")
    })

    // Testing whether selecting a different coin option from the coin selector changes the current coin and dispatches it to the store
    it("should change and dispatch coins upon selecting different options from coins list", async () => {
        coinSelectorElement.addEventListener('change', (e) => {
            const data = e.target.value.split("+")
            store.dispatch(coinChange({ coinName: data[1], coinID: data[0] }))
        })
        fireEvent.change(coinSelectorElement, { target: { value: 'ethereum+Ethereum' } })
        expect(coinSelectorElement.value).toBe("ethereum+Ethereum")
        expect(store.getState().currentCoin.coinName).toBe('Ethereum')
    })

    // Testing if chart is rendering and does it change when we are selecting different types of chart. 
    it("should render charts ", async () => {
        setTimeout(() => {
            expect(lineChart).toBeInTheDocument()
        }, 500)

        // changing chart type from line chart to bar chart
        fireEvent.change(chartSelector, {
            target: {
                value: 'Bar Chart Vertical'
            }
        })
        setTimeout(() => {
            const barChart = component.getByTestId("bar-chart")
            expect(lineChart).not.toBeInTheDocument()
            expect(barChart).toBeInTheDocument()
        }, 500)

        // changing chart type from bar chart to bar chart horizontal
        fireEvent.change(chartSelector, {
            target: {
                value: 'Bar Chart Horizontal'
            }
        })
        setTimeout(() => {
            const barChartHorizontal = component.getByTestId("bar-chart-horizontal")
            expect(barChart).not.toBeInTheDocument()
            expect(barChartHorizontal).toBeInTheDocument()
        })
    })
})