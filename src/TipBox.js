import React, { useState, useEffect, useRef } from 'react';
import { Firebase } from './Firebase';

export function TipBox() {
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
      <div id="Tips-container" className="col-lg-4 fs-5 lh-1 text-lg-end mt-4 mt-lg-0 p-4">
        <p><strong>PPD:</strong> Points per dollar.</p>
        <p><strong>Min. Spending:</strong> Minimum you must spend to earn points.</p>
        <p><strong>Last Updated:</strong> {text}</p>
      </div>
    );
  }