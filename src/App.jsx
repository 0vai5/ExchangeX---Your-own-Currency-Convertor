import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons'

const App = () => {
  const [currencyData, setCurrencyData] = useState({});
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [showData, setShowData] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [torate, setToRate] = useState(null);
  const [error, setError] = useState('');

  const fetchCurrencyData = async () => {
    try {
      const response = await fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_ZQt7tp2SGLrja3l7dVXG3oTa0Vp6YI8joIBSrNJH');
      const info = await response.json();
      setCurrencyData(info.data);
    } catch (error) {
      console.error('Error fetching currency data:', error);
      setError('Failed to fetch currency data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  const handleCalculation = () => {
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount.');
      return;
    }

    if (!currencyData[fromCurrency] || !currencyData[toCurrency]) {
      setError('Invalid currency selection. Please select valid currencies.');
      return;
    }

    const fromRate = currencyData[fromCurrency].value;
    const toRate = currencyData[toCurrency].value;
    const convertedAmount = (amount / fromRate) * toRate;
    setConvertedAmount(convertedAmount);
    setToRate(toRate);
    setShowData(true);
    setError('');
  };



  return (
    <section className='max-container'>
      <h1 className='head-text blue-gradient_text'>ExchangeX</h1>
      <div className='mb-10'>
        <label className='subhead-text text-[#fff]'>Amount</label>
        <input
          type="number"
          className="input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className='flex flex-col sm:flex-row gap-0 sm:gap-5 justify-center sm:justify-between items-center'>
          <div className='w-full'>
            <label className='subhead-text text-[#fff]'>From</label>
            <select className='input' value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              {Object.keys(currencyData).map((currencyCode) => (
                <option key={currencyCode}>{currencyCode}</option>
              ))}
            </select>
          </div>

          <div className='relative top-5'>
            <FontAwesomeIcon className='text-3xl' icon={faArrowsSpin} />
          </div>

          <div className='w-full'>
            <label className='subhead-text text-[#ffff]'>To</label>
            <select className='input mb-10' value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              {Object.keys(currencyData).map((currencyCode) => (
                <option key={currencyCode}>{currencyCode}</option>
              ))}
            </select>
          </div>
        </div>
        <button className='px-2 py-3 btn rounded-md' onClick={handleCalculation}>Calculate</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {showData && torate !== null && (
        <div className='h-auto text-center border border-1 flex-wrap'>
          <h1 className='subhead-text'>Converted Amount: {convertedAmount.toFixed(2)}  {toCurrency}</h1>
          <h3 className='text-2xl'>Rate: {torate.toFixed(2)} </h3>
        </div>
      )}
    </section>
  );
};

export default App;
