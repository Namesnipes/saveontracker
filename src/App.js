import React, { useState, useEffect } from 'react';
import { Firebase } from './Firebase';
import './App.css';

function LastUpdated() {
  const [text, setText] = useState('Loading...');

  useEffect(() => {
    Firebase.getLastUpdatedStr().then((value) => {
      setText(value);
    });
  }, []); // empty dependency array to run effect only once

  return (
    <div>
      <h4>Last updated: {text}</h4>
    </div>
  );
}


function TableHeader(){
  return (
    <thead>
      <tr>
        {Firebase.KEY_ORDER.map(key => <th key={key}>{key}</th>)}
      </tr>
    </thead>
  )
}

function ItemRow(props){
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.ppd}</td>
      <td>{props.min_spend}</td>
      <td><img src={props.img} alt="what"/></td>
      <td>{props.end_date}</td>
    </tr>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Savers</h1>
        <LastUpdated/>
      </header>
      <main>
        <table>
          <TableHeader/>
          <tbody>
            <ItemRow />
            <ItemRow />
            <ItemRow />
            <ItemRow />
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
