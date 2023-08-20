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

function writeUserData(sku, name, ppd, min_spendings) {
    const db = getDatabase();
    set(ref(db, 'products/' + sku), {
      name: name,
      PPD: ppd,
      min_spendings : min_spendings
    });
  }

const dbRef = ref(getDatabase());

function getProducts(callback){
  get(child(dbRef, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

getProducts(after)

function after(prods){
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