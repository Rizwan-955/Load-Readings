import { database } from "./firebase-config.js";

let lastTimestamp = 0;
let offlineTimer;

import {
    ref,
    onValue,
    get
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

});
//=====================================
// HISTORY BUTTON
//=====================================

const historyBtn =
document.getElementById("historyBtn");

const historySection =
document.getElementById("historySection");

let opened = false;

historyBtn.onclick = function(){

    opened = !opened;

    if(opened)
    {

        historySection.style.display="block";

        historyBtn.innerHTML="▲ Hide History";

        loadHistory();

    }
    else
    {

        historySection.style.display="none";

        historyBtn.innerHTML="▼ View History";

    }

};

//=====================================
// LOAD HISTORY
//=====================================

async function loadHistory()
{

    const today = new Date();

    const year = today.getFullYear();

    const month =
    String(today.getMonth()+1).padStart(2,'0');

    const day =
    String(today.getDate()).padStart(2,'0');

    const date =
    year+"-"+month+"-"+day;

    const historyRef =
    ref(database,"History/"+date);

    const snapshot =
    await get(historyRef);

    if(!snapshot.exists())
        return;

    const history =
    snapshot.val();

    for(let hour in history)
    {

        const item = history[hour];

        document.getElementById(
        "h"+hour+"v").innerHTML =
        Number(item.Voltage).toFixed(2)+" V";

        document.getElementById(
        "h"+hour+"c").innerHTML =
        Number(item.Current).toFixed(2)+" A";

        document.getElementById(
        "h"+hour+"p").innerHTML =
        Number(item.Power).toFixed(2)+" W";

        document.getElementById(
        "h"+hour+"e").innerHTML =
        Number(item.Energy).toFixed(3)+" Wh";

    }

}
