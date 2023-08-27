import { getDatabase, ref, get, child, orderByChild, query } from "firebase/database";
import { initializeApp } from "firebase/app";
import { UnixTimeStampToLocaleStr } from "./Helper";

export class Firebase {

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

    static KEY_ORDER = ["name", "ppd", "min_spend", "img", "end_date"]
    static app = initializeApp(Firebase.firebaseConfig);
    static db = getDatabase();
    static dbRef = ref(getDatabase());
    static productData;
    static lastUpdateData;

    static async getLastUpdatedStr() {
        if(Firebase.lastUpdateData) return Firebase.lastUpdateData
        const snapshot = await get(child(Firebase.dbRef, 'metadata/last_updated'))
        console.log("Retreived last update from database")
        if (snapshot.exists()) {
            let data = UnixTimeStampToLocaleStr(snapshot.val());
            Firebase.lastUpdateData = data;
            return data;
        } else {
            console.log("No date data available");
        }
    }

    static async getProducts() {
        if(Firebase.productData) return Firebase.productData
        const topUserPostsRef = query(ref(Firebase.db, 'products/'), orderByChild("ppd"));
        const snapshot = await get(topUserPostsRef);
        console.log("Retreived products from database")
        let order = []
        snapshot.forEach(element => {
            let obj = {}
            obj[element.key] = element.val();
            order.unshift(obj)
        })
        Firebase.productData = order;
        return order
    }
}