
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyANrlUruox9zGp_G50UYPL6SNy1WEv3_9g",
    authDomain: "job-box-redux-38633.firebaseapp.com",
    projectId: "job-box-redux-38633",
    storageBucket: "job-box-redux-38633.appspot.com",
    messagingSenderId: "522736751078",
    appId: "1:522736751078:web:d68dfd83f6552c9e418627",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;