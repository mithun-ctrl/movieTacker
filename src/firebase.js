import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json" with {type: "json"};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cinedairy-api-default-rtdb.asia-southeast1.firebasedatabase.app/"
});

export const db = admin.database();