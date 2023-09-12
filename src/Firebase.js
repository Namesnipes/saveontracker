import { getDatabase, ref, get, child, orderByChild, query } from "firebase/database";
import { initializeApp } from "firebase/app";
import { UnixTimeStampToLocaleStr } from "./Helper";

export class Firebase {

    //initialize all the database connection stuff
    static firebaseConfig = {
        apiKey: "AIzaSyAcALo35rzpUWNqp1J6X1hTiqp51OP30gg",
        authDomain: "saveon-ae7c9.firebaseapp.com",
        databaseURL: "https://saveon-ae7c9-default-rtdb.firebaseio.com",
        projectId: "saveon-ae7c9",
        storageBucket: "saveon-ae7c9.appspot.com",
        messagingSenderId: "90501248489",
        appId: "1:90501248489:web:a659884b52a87b643fc778",
        measurementId: "G-ELXCWED5EC"
    };

    static app = initializeApp(Firebase.firebaseConfig);
    static db = getDatabase();
    static dbRef = ref(getDatabase());
    static productData;
    static lastUpdateData;

    
    /**
     * Retrieves a formatted string of the last time the database was updated. 
     * Ie. 2023-09-11, 10:00:35 p.m.
     * 
     * TODO: make the date format use firebase dates not just a number!! what was I thinking!!
     * @return {string} A formatted string of the last time the database was updated.
     */
    static async getLastUpdatedStr() {
        if(Firebase.lastUpdateData) return Firebase.lastUpdateData

        //get the last update from DB (its in metadata/last_updated)
        const snapshot = await get(child(Firebase.dbRef, 'metadata/last_updated'))
        console.log("Retreived last update from database")

        if (snapshot.exists()) {
            let unix_timestamp = snapshot.val()
            let formated_timestamp = UnixTimeStampToLocaleStr(unix_timestamp);
            Firebase.lastUpdateData = formated_timestamp;
            return formated_timestamp;
        } else {
            console.log("No date data available");
        }
    }

    /**
     * Retrieves the products from the database.
     *
     * @return {array} An array containing the products.
     */
    static async getProducts() {
        if(Firebase.productData) return Firebase.productData

        //get the products from DB, ordered by PPD
        const topUserPostsRef = query(ref(Firebase.db, 'products/'), orderByChild("ppd"));
        const snapshot = await get(topUserPostsRef);
        console.log("Retreived products from database")
        let products_sorted = []

        // insert the products into IN ORDER using forEach
        snapshot.forEach(product_object => {
            let transformed_product_object = {}
            transformed_product_object[product_object.key] = product_object.val();
            products_sorted.unshift(transformed_product_object)
            //format for obj is:
            //{ sku: {name: name, ppd: ppd, min_spend: min_spend, img: img, end_date: end_date} }
        })

        Firebase.productData = products_sorted;
        return products_sorted
    }
}