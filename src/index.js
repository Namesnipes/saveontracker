// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {collection, addDoc } from "firebase/firestore";
import { getDatabase, ref, set, get, child } from "firebase/database";
import "./style.css";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcALo35rzpUWNqp1J6X1hTiqp51OP30gg",
  authDomain: "saveon-ae7c9.firebaseapp.com",
  databaseURL: "https://saveon-ae7c9-default-rtdb.firebaseio.com",
  projectId: "saveon-ae7c9",
  storageBucket: "saveon-ae7c9.appspot.com",
  messagingSenderId: "90501248489",
  appId: "1:90501248489:web:a659884b52a87b643fc778",
  measurementId: "G-ELXCWED5EC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dbRef = ref(getDatabase());

//DB funcs

/**
 * Retrieves the time the database was last updated, converts to a string, and passes it to the callback function.
 *
 * @param {function} callback - The callback function to be executed with the last updated string.
 * @return {void} 
 */
function getLastUpdatedStr(callback){
  get(child(dbRef, 'metadata/last_updated')).then((snapshot) => {
    if (snapshot.exists()) {
      callback(UnixTimeStampToLocaleStr(snapshot.val()));
    } else {
      console.log("No date data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

/**
 * Retrieves the products object from the database and invokes the provided callback function with the data.
 *
 * @param {function} callback - The callback function that will be called with the retrieved product data.
 * @return {void}
 */

function getProducts(callback){
  get(child(dbRef, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      console.log("No product data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

function populate_table_from_product_object(prods){
    console.log(prods)
    if(prods){
        console.log(prods);
        const container = document.body
        const table = document.getElementById("products")
        
        for(const sku in prods){
            const row = document.createElement("tr");
            const obj = prods[sku]
            for(const key in obj){
                const val = obj[key];
                const cell = document.createElement("td");
                cell.textContent = key + ": " + val + "     ";
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    }
}


function UnixTimeStampToLocaleStr(seconds){
  return new Date(seconds * 1000).toLocaleString()
}

getProducts(populate_table_from_product_object)
getLastUpdatedStr(function(datestr){
  let elem = document.getElementById("last_updated")
  elem.textContent = datestr
})