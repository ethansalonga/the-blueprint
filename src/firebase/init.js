import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyCfH2O3RWh4W47VBrHjgyu3DazgxsBvjKQ",
  authDomain: "the-blueprint-c4d30.firebaseapp.com",
  databaseURL: "https://the-blueprint-c4d30-default-rtdb.firebaseio.com",
  projectId: "the-blueprint-c4d30",
  storageBucket: "the-blueprint-c4d30.appspot.com",
  messagingSenderId: "775150497722",
  appId: "1:775150497722:web:3ff796272333169dc1f783",
  measurementId: "G-NJ5SJ1Q0W2",
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
