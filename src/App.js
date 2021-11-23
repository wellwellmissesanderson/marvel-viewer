import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Character from './components/Character';
import Series from './components/Series';
import Search from './components/Search';

const API = {
  AUTH: '',
  CHARS: 'https://gateway.marvel.com/v1/public/characters',
  SERIES: 'https://gateway.marvel.com/v1/public/series'
}

const params = {
  params: {
    limit: 30,
  },
};

const App = () => {
  const [dataType, setDataType] = useState(API.CHARS);
  const [allData, setAllData] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {    
    const getData = async (endpoint) => {
      await axios(`${endpoint}?${API.AUTH}`, params)
        .then(res => {
          setData(res.data.data);
          setAllData(res.data.data);
          setDataType(API.CHARS);
        })
        .catch((err) => {
          console.log('err', err);
        });
    };

    getData(API.CHARS);
  }, []);

  const onSearch = async (val) => {
    await axios(dataType, {
      params: {
        nameStartsWith: val,
      }
    })
      .then(res => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  const items = data && data.results;

  return !!items ? (
    <div className="App">
      <header className="header">
        <div className="results">
          {dataType}
        </div>
        <div className="results">
          <strong>Results: {items.length} of {data.total}</strong>
        </div>

        <div className="search">
          <Search onSearch={onSearch} onReset={() => setData(allData)} />
        </div>
        
        <ul className="menu">
          <li>Characters</li>
          <li>Series</li>
          <li>Comics</li>
        </ul>
      </header>

      <main className="main">
        {items && items.map((c, i) => <Character {...c} index={i} />)}

        {items && items.map((s, i) => <Series {...s} index={i} />)}
      </main>
    </div>
  ) : null;
}

export default App;
