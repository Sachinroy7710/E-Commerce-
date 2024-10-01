// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyBhO5WfPyoiOjKU7-frmqSec1EkKK0zeNM",
//   authDomain: "myecom-7d35c.firebaseapp.com",
//   projectId: "myecom-7d35c",
//   storageBucket: "myecom-7d35c.appspot.com",
//   messagingSenderId: "333588616596",
//   appId: "1:333588616596:web:215dcc8ad2a4496349eb81"
// };

// const app = initializeApp(firebaseConfig);

// const fireDB = getFirestore(app);
// const auth = getAuth(app);

// export { fireDB, auth };


import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBVdsM-6A_h1kDEaXbc8zGkKgF5fuwdvVI",
  authDomain: "ecom-4a359.firebaseapp.com",
  projectId: "ecom-4a359",
  storageBucket: "ecom-4a359.appspot.com",
  messagingSenderId: "947562340399",
  appId: "1:947562340399:web:ea6c8eaa3e8374cfeca6da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };