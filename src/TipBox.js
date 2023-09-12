import React, { useState, useEffect, useRef } from 'react';
import { Firebase } from './Firebase';

export function TipBox() {
    const [text, setText] = useState('Loading...');
    const ranOnce = useRef(false);
  
    useEffect(() => {
      //since data is retreived from the DB asynchronously, this effect will run 
      //once when its first rendered then again a few seconds later when the data is retreived over the internets
      //this check is here so it cant run a second time
      if (!ranOnce.current) { 
        ranOnce.current = true;

        //waits for the db to return our data then sets the "text" state
        Firebase.getLastUpdatedStr().then((value) => {
          setText(value);
          if(value === "") ranOnce.current = false;
        });

      }
    }, [ranOnce]);
  
    return (
      <div id="Tips-container" className="col-lg-4 fs-5 lh-1 text-lg-end mt-4 mt-lg-0 p-4">
        <p><strong>PPD:</strong> Points per dollar.</p>
        <p><strong>Min. Spending:</strong> Minimum you must spend to earn points.</p>
        <p><strong>Last Updated:</strong> {text}</p>
      </div>
    );
  }