import admin from "firebase-admin";
import Config from './config/Config.js';

const serviceAccount = {
    type: Config.FIREBASE_SA_TYPE,
    project_id: Config.FIREBASE_PROJECT_ID,
    private_key_id: Config.FIREBASE_PRIVATE_KEY_ID,
    private_key: Config.FIREBASE_PRIVATE_KEY,
    client_email: Config.FIREBASE_CLIENT_EMAIL,
    client_id: Config.FIREBASE_CLIENT_ID,
    auth_uri: Config.FIREBASE_AUTH_URI,
    token_uri: Config.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: Config.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: Config.FIREBASE_CLIENT_CERT_URL,
    universe_domain: Config.FIREBASE_UNIVERSE_DOMAIN
};


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: Config.FIREBASE_DATABASE_URL
});

export const db = admin.database();