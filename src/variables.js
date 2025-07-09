import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID }

// const firebaseConfig = {
//   apiKey: "AIzaSyCy_TnGLG1xUrc1OifOH8V3FfXV_BjfrA8",
//   authDomain: "react-flex-65748.firebaseapp.com",
//   projectId: "react-flex-65748",
//   storageBucket: "react-flex-65748.firebasestorage.app",
//   messagingSenderId: "424778744855",
//   appId: "1:424778744855:web:27f40cb9b6fb67d10c8852"
// };

const firebaseConfig = {

    apiKey: "AIzaSyCy_TnGLG1xUrc1OifOH8V3FfXV_BjfrA8",
    authDomain: "react-flex-65748.firebaseapp.com",
    projectId: "react-flex-65748",
    storageBucket:"react-flex-65748.firebasestorage.app",
    messagingSenderId: "424778744855",
    appId: "1:424778744855:web:27f40cb9b6fb67d10c8852",
}

const app = initializeApp (firebaseConfig);

export const db = getFirestore(app);