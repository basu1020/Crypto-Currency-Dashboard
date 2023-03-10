import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// Importing the component and the reducer to test
import BaseCurrencyOptions from '../components/Price-chart/BaseCurrencyOptions'
import baseCurrencySliceReducer from '../globalStates/baseCurrencySlice'

// Test suite to test the BaseCurrencyComponent
describe('BaseCurrencyComponent', () => {

    let store
    let component
    let currencySelector

    beforeEach(() => {

        // creating a mock store before each test case.
        store = configureStore({
            reducer: {
                baseCurrency: baseCurrencySliceReducer
            },
        })

        // rendering the component
        component = render(
            <Provider store={store}>
                <BaseCurrencyOptions />
            </Provider>
        )
        
        // getting the currency selector element
        currencySelector = component.container.querySelector("[name='currencySelector']")
    })

     // Test to check if all the options are correctly rendered
    it("Should render all the options correctly with their values and text content", () => {
        expect([currencySelector.children[0].textContent, currencySelector.children[0].value]).toStrictEqual(["USD", "USD"])
        expect([currencySelector.children[1].textContent, currencySelector.children[1].value]).toStrictEqual(["INR", "INR"])
        expect([currencySelector.children[2].textContent, currencySelector.children[2].value]).toStrictEqual(["EUR", "EUR"])
        expect([currencySelector.children[3].textContent, currencySelector.children[3].value]).toStrictEqual(["GBP", "GBP"])
        expect([currencySelector.children[4].textContent, currencySelector.children[4].value]).toStrictEqual(["CNY", "CNY"])
        expect([currencySelector.children[5].textContent, currencySelector.children[5].value]).toStrictEqual(["JPY", "JPY"])
    })

    // Test to check if the currency value is correctly updated on change
    it("options should dispatch and change the value correctly", () => {
        fireEvent.change(currencySelector, { target: { value: 'INR' } })
        expect(currencySelector.value).toBe('INR')
        expect(store.getState().baseCurrency.currency).toBe('INR')
    })
})