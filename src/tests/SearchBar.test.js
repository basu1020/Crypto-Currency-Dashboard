import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import currentCoinSlice from '../globalStates/currentCoinSlice'
import SearchBar from '../components/Price-chart/SearchBar'


describe('SearchBar Component', () => {
    let store
    let component
    let SearchButton
    let InputArea
    let SearchModal

    beforeEach(() => {
        store = configureStore({
            reducer: {
                currentCoin: currentCoinSlice.reducers
            }
        })

        component = render(
            <Provider store={store}>
                <SearchBar />
            </Provider>
        )

        // Assign the Search button, Input area, and Search Modal elements to variables for use in tests
        SearchButton = component.container.getElementsByTagName('button')[0]
        InputArea = component.container.getElementsByTagName('input')[0]
        SearchModal = component.container.querySelector("[name='searchModal']")
    })

    // Test that the search modal is displayed when the Search button is clicked
    it("Should show the search modal if Search Button is clicked", async () => {

        // Simulate a change event on the InputArea element, passing a target value of "BTC"
        fireEvent.change(InputArea, { target: { value: "BTC" } })

        // Simulate a click event on the SearchButton element
        fireEvent.click(SearchButton)

        // Retrieve the getByText function from the component variable and assert that the "Search Results" text is present in the document
        const { getByText } = component
        expect(getByText(/Search Results/)).toBeInTheDocument()
    })
})