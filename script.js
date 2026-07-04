import { database } from "./firebase-config.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase Live Data Reference
const liveRef = ref(database, "HydroMonitor/Live");

// Listen for changes
onValue(liveRef, (snapshot) => {

    const data = snapshot.val();

    if (!data) {
        console.log("No data found.");
        return;
    }

    // Voltage
    document.getElementById("voltage").innerHTML =
        Number(data.Voltage || 0).toFixed(2) + " V";

    // Current
    document.getElementById("current").innerHTML =
        Number(data.Current || 0).toFixed(2) + " A";

    // Power
    document.getElementById("power").innerHTML =
        Number(data.Power || 0).toFixed(2) + " W";

    // Energy
    document.getElementById("energy").innerHTML =
        Number(data.Energy_kWh || 0).toFixed(3) + " kWh";

    // Last Update
    document.getElementById("lastUpdate").innerHTML =
        data.LastUpdate || "--";

    // Status
    const status = document.getElementById("status");

    if (data.Status === "Online") {

        status.innerHTML = "🟢 ONLINE";
        status.style.color = "green";

    } else {

        status.innerHTML = "🔴 OFFLINE";
        status.style.color = "red";

    }

});
