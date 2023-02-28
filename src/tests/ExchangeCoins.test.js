import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import ExchangeCoins from '../components/Exhange-Rates/ExchangeCoins'

const mockStore = configureStore([])

// Describing the ExchangeCoins component test suite
describe('ExchangeCoins', () => {
    let store
    let component
    let getByText

    beforeEach(() => {

        // creating a mock store with coinsList state with some random data.
        store = mockStore({
            coinsList: {
                list: [
                    { id: 1, name: 'Bitcoin', current_price: 9000 },
                    { id: 2, name: 'Ethereum', current_price: 600 },
                    { id: 3, name: 'Litecoin', current_price: 200 },
                ],
                status: true
            }
        })

        // Rendering the ExchangeCoins component with the mock store wrapped in Provider
        component = render(
            <Provider store={store}>
                <ExchangeCoins />
            </Provider>
        )
        // Setting the getByText function to the value returned by the render function
        getByText = component.getByText
    })

    // Testing the correct title is displayed
    it('should display the correct title', () => {
        expect(getByText('Exchange Coins')).toBeInTheDocument()
    })

    // Testing that the select options render with the correct coin names
    it('should render the select options with the correct coin names', () => {
        const sellCoinSelect = component.container.querySelector("[name='coinSelectorSelling']")
        const buyCoinSelect = component.container.querySelector("[name='coinSelectorBuying']")
        expect(sellCoinSelect.children[0].textContent).toBe('Bitcoin')
        expect(sellCoinSelect.children[1].textContent).toBe('Ethereum')
        expect(sellCoinSelect.children[2].textContent).toBe('Litecoin')
        expect(buyCoinSelect.children[0].textContent).toBe('Bitcoin')
        expect(buyCoinSelect.children[1].textContent).toBe('Ethereum')
        expect(buyCoinSelect.children[2].textContent).toBe('Litecoin')
    })

    // Testing that the exchange rate updates when the exchange button is clicked
    it('should update the exchange rate when the exchange button is clicked', () => {
        const sellCoinSelect = component.container.querySelector("[name='coinSelectorSelling']")
        const buyCoinSelect = component.container.querySelector("[name='coinSelectorBuying']")
        const enterAmount = component.container.querySelector("[name='enterAmount']")
        const exchangeBtn = component.container.querySelector("[name='Exchange']")
        fireEvent.change(enterAmount, { target: { value: '10' } })
        fireEvent.change(sellCoinSelect, { target: { value: '9000' } })
        fireEvent.change(buyCoinSelect, { target: { value: '600' } })
        fireEvent.click(exchangeBtn)
        expect(component.container.querySelector("[name='exchangeRate']").textContent).toBe('150.00')
    })

    // Testing that the exchange rate does not update if the coinListStatus is false
    it('should not update the exchange rate if the coinListStatus is false', () => {

        // creating a mock empty store with coinsList state which has no data.
        let Emptystore = mockStore({
            coinsList: {
                list: [],
                status:false
            },
        })
        component = render(
            <Provider store={Emptystore}>
                <ExchangeCoins />
            </Provider>
        )
        const sellCoinSelect = component.container.querySelector("[name='coinSelectorSelling']")
        const buyCoinSelect = component.container.querySelector("[name='coinSelectorBuying']")
        const enterAmount = component.container.querySelector("[name='enterAmount']")
        const exchangeBtn = component.container.querySelector("[name='Exchange']")
        fireEvent.change(enterAmount, { target: { value: '10' } })
        fireEvent.change(sellCoinSelect, { target: { value: '9000' } })
        fireEvent.change(buyCoinSelect, { target: { value: '600' } })
        fireEvent.click(exchangeBtn)
        expect(component.container.querySelector("[name='exchangeRate']").textContent).toBe('0')
    })
})