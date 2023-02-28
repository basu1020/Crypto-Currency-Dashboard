import './App.css';
import CoinsList from './components/Coins-list-MktCap/CoinsList';
import ExchangeCoins from './components/Exhange-Rates/ExchangeCoins';
import Portfolio from './components/Portfolio/Portfolio';
import PriceChart from './components/Price-chart/PriceChart';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 my-0 py-0 flex flex-row flex-wrap md:no-scrollbar h-[95vh] md:h-auto">
        <div className='w-2/3 md:w-screen'>
          <PriceChart />
          <div className="flex flex-row justify-evenly md:flex-wrap">
            <Portfolio />
            <ExchangeCoins />
          </div>
        </div>
        <div className='md:h-fit w-1/3 md:w-screen'>
          <CoinsList />
        </div>
      </div>
    </>
  );
}

export default App;
