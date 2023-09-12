import React, { useState, useEffect, useRef } from 'react';
import { Firebase } from './Firebase';
import { ItemRow } from './ItemRow';

export function ItemBody() {
    const [items, setItems] = useState([]);
    const ranOnce = useRef(false);
  
    useEffect(() => { //since data is retreived from the DB asynchronously, this effect will run 
                      //once when its first rendered then again a few seconds later when the data is retreived over the internets
                      //this check is here so it cant run a second time
      if (!ranOnce.current) {
        ranOnce.current = true;

        //waits for the db to return our data then sets the "items" state
        Firebase.getProducts().then((value) => {
          setItems(value);
          console.log("Here are the items from the database:", value)
          if (value.length === 0) ranOnce.current = false;
        });

      }
    }, [ranOnce])
  
    return (
      <div>
        {
        //loop through every product in the "items" state,
        //and create an ItemRow component for each
        items.map((obj) => {
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
        })
        }
      </div>
    );
  }