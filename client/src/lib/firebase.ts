import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPz1yaE7SlZukOQJeBAbpjzfGxNJhCHOQ",
  authDomain: "homeelem2.firebaseapp.com",
  projectId: "homeelem2",
  storageBucket: "homeelem2.firebasestorage.app",
  messagingSenderId: "649272875211",
  appId: "1:649272875211:web:62cd5344a22af644d9a34e",
  measurementId: "G-32G6HB0C64"
};

const firebaseEnabled = Object.values(firebaseConfig).every(Boolean);

let app: ReturnType<typeof initializeApp> | undefined;
let db: ReturnType<typeof getFirestore> | undefined;
let auth: ReturnType<typeof getAuth> | undefined;

if (firebaseEnabled) {
  app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig as any);
  db = getFirestore(app);
  auth = getAuth(app);
}

export { db, auth, firebaseEnabled };
