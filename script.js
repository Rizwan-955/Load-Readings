import { database } from "./firebase-config.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const liveRef = ref(database, "HydroUnit");

// Time when the last NEW data arrived
let lastReceiveTime = Date.now();

// Last timestamp received from ESP32
let lastTimestamp = -1;

// Listen for Firebase updates
onValue(liveRef, (snapshot) => {

    const data = snapshot.val();

    if (!data)
        return;

    const timestamp = Number(data.Timestamp || 0);

    // Update only if ESP32 uploaded NEW data
    if (timestamp !== lastTimestamp)
    {

        lastTimestamp = timestamp;
        lastReceiveTime = Date.now();

        // Update Values
        document.getElementById("voltage").innerHTML =
            Number(data.Voltage || 0).toFixed(2) + " V";

        document.getElementById("current").innerHTML =
            Number(data.Current || 0).toFixed(2) + " A";

        document.getElementById("power").innerHTML =
            Number(data.Power || 0).toFixed(2) + " W";

        document.getElementById("energy").innerHTML =
            Number(data.Energy || 0).toFixed(3) + " Wh";

        // ONLINE
        document.getElementById("status").innerHTML =
            "🟢 ONLINE";

        document.getElementById("status").style.color =
            "green";

        // Last Update
        document.getElementById("lastUpdate").innerHTML =
            new Date().toLocaleTimeString();

    }

});

// Check every second whether ESP32 stopped uploading

setInterval(function(){

    if(Date.now() - lastReceiveTime > 5000)
    {

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

        document.getElementById("lastUpdate").innerHTML =
            "--";

    }

},1000);
