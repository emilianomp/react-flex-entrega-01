import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCy_TnGLG1xUrc1OifOH8V3FfXV_BjfrA8",
  authDomain: "react-flex-65748.firebaseapp.com",
  projectId: "react-flex-65748",
  storageBucket: "react-flex-65748.firebasestorage.app",
  messagingSenderId: "424778744855",
  appId: "1:424778744855:web:27f40cb9b6fb67d10c8852"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);