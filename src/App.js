import React, { useState, useEffect, useRef } from 'react';
import { Firebase } from './Firebase';
import './App.css';

function LastUpdated() {
  const [text, setText] = useState('Loading...');
  const ranOnce = useRef(false);

  useEffect(() => {
    if (!ranOnce.current) { // make sure were only running this function once again idk it was running twice before
      ranOnce.current = true;
      Firebase.getLastUpdatedStr().then((value) => {
        setText(value);
        if(value === "") ranOnce.current = false;
      });
    }
  }, [ranOnce]); // empty dependency array to run effect only once

  return (
    <div>
      <h4>Last updated: {text}</h4>
    </div>
  );
}


function TableHeader() {
  return (
    <thead>
      <tr>
        {Firebase.KEY_ORDER.map(key => <th key={key}>{key}</th>)}
      </tr>
    </thead>
  )
}

function ItemBody() {
  const [items, setItems] = useState([]);
  const ranOnce = useRef(false);

  useEffect(() => {
    if (!ranOnce.current) {
      ranOnce.current = true;
      Firebase.getProducts().then((value) => {
        setItems(value);
        console.log(value)
        if (value.length === 0) ranOnce.current = false;
      });
    }
  }, [ranOnce])

  return (
    <tbody>
      {items.map((obj) => {
        const [key, value] = Object.entries(obj)[0];
        const { name, ppd, min_spend, img, end_date } = value;

        return (
          <ItemRow
            key={key}
            sku={key}
            name={name}
            ppd={ppd}
            min_spend={min_spend}
            img={img}
            end_date={end_date}
          />
        );
      })}
    </tbody>
  );
}
function ItemRow(props) {
  const url = `https://www.saveonfoods.com/sm/pickup/rsid/2226/product/${props.sku}`;
  return (
    <tr>
      <td><a href={url}>{props.name}</a></td>
      <td>{props.ppd}</td>
      <td>{props.min_spend}</td>
      <td><img src={props.img} alt="what" /></td>
      <td>{props.end_date}</td>
    </tr>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Savers</h1>
        <LastUpdated />
      </header>
      <main>
        <div>
          <table>
            <TableHeader />
            <ItemBody />
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
