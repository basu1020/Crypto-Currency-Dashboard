# **src** Directory Overview

This directory contains the source code for the project. This is a standard React src directory with some additional folder which were created to make it succinct. 

By default it has an `index.js`, `index.css`, `App.css`, `reportWebVitals.js` and `App.js`. 

## Overview folders created in **src**

- `components` -  It has all the different **JSX components**. 
- `globalStates` - It has **Redux slices** for different redux states used throughout various components.  
- `redux-store` - It has `store.js` file  with **Redux store** logic. 
- `tests` - As the name suggests, It contains test cases of various components which can be initiated by executing `npm run build` 

### Structure of **components** folder 

- Coin-prices-list
    - `CoinsList.js`
    - `CoinsListItem.js`
    
    ![Screenshot_20230227_125558](https://user-images.githubusercontent.com/106004070/221503658-ba718ead-d4e5-4ada-8fa8-86e1fd380159.png)

- Exhange-Rates
    - `ExchangeCoins.js`
    
    ![Screenshot_20230227_130006](https://user-images.githubusercontent.com/106004070/221503686-d49447fb-b535-49f2-bb4d-e9e708d88da9.png)


- Portfolio
    - `Data.js` - data for plotting chart in Portfolio.js 
    - `Portfolio.js`
    
    ![Screenshot_20230227_130032](https://user-images.githubusercontent.com/106004070/221503703-20ec238b-02a2-485d-9306-fd5afda7ffeb.png)


- Price-chart
    - `BaseCurrencyOptions.js`
    
    ![Screenshot_20230227_125829](https://user-images.githubusercontent.com/106004070/221503828-883603b7-badf-437d-9d10-5c932c2ecedc.png)

    - `SearchBar.js`
    
    ![Screenshot_20230227_125919](https://user-images.githubusercontent.com/106004070/221503888-f0b4150b-173e-4e43-9591-a4235adc6d38.png)
    
    - `PriceChart.js`
    
    ![Screenshot_20230227_125945](https://user-images.githubusercontent.com/106004070/221503949-7cb7e1f5-c871-43bc-a8de-7ba6a5017a8b.png)

- Navbar.js 

![Screenshot_20230227_130536](https://user-images.githubusercontent.com/106004070/221503977-f1af82fe-0d46-48fe-8def-d2f8b36ed930.png)







