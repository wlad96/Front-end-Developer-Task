import React, { useEffect, useState } from 'react';
import api from '@/utils/api';

const currencyMapping: { [key: string]: string } = {
  "1": "AUD",
  "2": "RSD",
  "3": "CHF",
  "4": "JPY",
  "5": "EUR",
  "6": "USD",
  "7": "DZD",
  "8": "ARS",
  "9": "AZN",
  "10": "BRL",
  "11": "CNY",
  "12": "GEL",
  "13": "INR",
  "14": "LVL",
  "15": "OMR",
  "16": "CUP",
  "17": "ZAR",
  "18": "ZWD",
  "19": "QAR",
  "20": "PLN",
  "21": "GBP",
  "22": "CAD",
  "23": "SEK",
  "24": "PHP",
  "25": "IDR" 
};

const CurrencyTable: React.FC = () => {
    const [currencies, setCurrencies] = useState<any[]>([]);
    const [filteredCurrencies, setFilteredCurrencies] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

  useEffect(() => {
    api.get('/currencies')
      .then((response) => {
        const mappedCurrencies = response.data.map((currency: any) => ({
          ...currency,
          abbreviation: currencyMapping[currency.currencyId],
        }));
        setCurrencies(mappedCurrencies);
      })
      .catch((error) => {
        setError('Failed to fetch currencies');
      });

    api.get('/not-found')
      .catch((error) => {
        console.error('Error fetching not-found endpoint', error);
      });
  }, []);

  useEffect(() => {
    setFilteredCurrencies(
      currencies.filter((currency) =>
        currency.abbreviation.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, currencies]);

  const handleDelete = (currencyId: string) => {
    setFilteredCurrencies(filteredCurrencies.filter(currency => currency.currencyId !== currencyId));
    setCurrencies(prevCurrencies => prevCurrencies.filter(currency => currency.currencyId !== currencyId));

  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="relative overflow-x-auto max-w-screen-xl mx-auto p-4 shadow-md sm:rounded-lg">
        <div className="pb-4 bg-white dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                    type="text" 
                    id="table-search" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by name" 
                />
            </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Balance
                    </th>
                    <th scope="col" className="px-6 py-3">
                    </th>
                </tr>
            </thead>
            <tbody>

                {filteredCurrencies.length > 0 ? filteredCurrencies.map((currency) => (
                    <tr key={currency.currencyId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {currency.abbreviation}
                        </th>
                        <td className="px-6 py-4">
                            {currency.amount}
                        </td>
                        <td className="px-6 py-4 text-center">
                        <button onClick={() => handleDelete(currency.currencyId)} className="text-red-500">
                            Delete
                        </button>
                        </td>
                    </tr>
                )) : (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th colSpan={3} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                            No entries found.
                        </th>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  );
};

export default CurrencyTable;