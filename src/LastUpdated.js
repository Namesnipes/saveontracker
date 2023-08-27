import React, { useState, useEffect, useRef } from 'react';
import { Firebase } from './Firebase';

export function LastUpdated() {
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