import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {

apiKey: "AIzaSyBtEKwPDV0aK8bxWGnFyVjQf8LlJ_rQ0rI",

authDomain: "micro-hydro-unit.firebaseapp.com",

databaseURL: "https://micro-hydro-unit-default-rtdb.asia-southeast1.firebasedatabase.app",

projectId: "micro-hydro-unit",

storageBucket: "micro-hydro-unit.firebasestorage.app",

messagingSenderId: "818659420483",

appId: "1:818659420483:web:34fe0aef58b7ddcc4a27f6"

};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database };
