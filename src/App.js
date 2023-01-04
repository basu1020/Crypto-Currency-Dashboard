import './App.css';
import PriceList from './components/coin-price-feed-list/PriceList';
import ExchangeCoins from './components/Exhange-Rates/ExchangeCoins';
import Portfolio from './components/Portfolio/Portfolio';

function App() {
  return (
    <>
    {/* <PriceList/> */}
    <ExchangeCoins />
    <Portfolio/>
    <PriceList/>
    </>
  );
}

export default App;
