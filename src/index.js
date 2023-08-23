// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, limitToLast, orderByChild, orderByKey, orderByValue, query } from "firebase/database";
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

const KEY_ORDER = ["name", "ppd", "min_spend", "img","end_date"]
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();
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
  const topUserPostsRef = query(ref(db, 'products/'), orderByChild("ppd"));
  get(topUserPostsRef).then((snapshot) => {
    console.log(snapshot)
    let order = []
    snapshot.forEach(element => {
      let obj = {}
      obj[element.key] = element.val();
      order.unshift(obj)
    })
    callback(order)
  });
}

function populate_table_from_product_object(productArray){
    if(productArray){
        const container = document.body
        const table = document.getElementById("products")

        for(const i in KEY_ORDER){
            const key = KEY_ORDER[i]
            const col = document.createElement("th");
            const cell = document.createElement("td");
            cell.textContent = key
            col.appendChild(cell);
            table.appendChild(col);
        }

        for(const i in productArray){
            const sku = Object.keys(productArray[i])[0]
            const row = document.createElement("tr");
            const obj = productArray[i][sku]
            for(const i in KEY_ORDER){
                const key = KEY_ORDER[i]
                const val = obj[key];
                if(key === "img"){
                  const img = document.createElement("img");
                  img.src = val;
                  row.appendChild(img);
              } else {
                const cell = document.createElement("td");
                cell.textContent = val;
                row.appendChild(cell);
              }
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