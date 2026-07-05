import { database } from "./firebase-config.js";
let lastTimestamp = 0;
let offlineTimer;
import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const liveRef = ref(database, "HydroUnit");

onValue(liveRef, (snapshot) => {

   const data = snapshot.val();

if (!data)
    return;

const timestamp = Number(data.Timestamp || 0);

    document.getElementById("voltage").innerHTML =
        Number(data.Voltage || 0).toFixed(2) + " V";

    document.getElementById("current").innerHTML =
        Number(data.Current || 0).toFixed(2) + " A";

    document.getElementById("power").innerHTML =
        Number(data.Power || 0).toFixed(2) + " W";

    document.getElementById("energy").innerHTML =
        Number(data.Energy || 0).toFixed(3) + " Wh";

clearTimeout(offlineTimer);

lastTimestamp = timestamp;

document.getElementById("status").innerHTML =
"🟢 ONLINE";

document.getElementById("status").style.color =
"green";

document.getElementById("lastUpdate").innerHTML =
new Date().toLocaleTimeString();

offlineTimer = setTimeout(function(){

document.getElementById("status").innerHTML =
"🔴 OFFLINE";

document.getElementById("status").style.color =
"red";

document.getElementById("voltage").innerHTML =
"0.00 V";

document.getElementById("current").innerHTML =
"0.00 A";

document.getElementById("power").innerHTML =
"0.00 W";

document.getElementById("energy").innerHTML =
"0.000 Wh";

},5000);
