import React, { useState, useEffect, useRef } from 'react';
import { Firebase } from './Firebase';
import { ItemRow } from './ItemRow';

export function ItemBody() {
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
      <div>
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
      </div>
    );
  }