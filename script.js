const rarities = [
    "⭐ Common",
    "⭐⭐ Rare",
    "⭐⭐⭐ Epic",
    "👑 Legendary"
];

const cardTitles = [
    "The Profit",
    "The Scale",
    "The Vision",
    "The Deal",
    "The Offer",
    "The Winner",
    "The Creator",
    "The Network",
    "The Leader",
    "The Fortune",
    "The Growth",
    "The Focus",
    "The Launch",
    "The Success",
    "The Hunter"
];

const categories = [
    "💼 Career",
    "💰 Money",
    "❤️ Love",
    "🚀 Affiliate",
    "📈 Media Buying",
    "🤝 Networking",
    "🧠 Mindset"
];

const rarityChance = () => {
    const roll = Math.random() * 100;

    if (roll < 2) return 3;
    if (roll < 10) return 2;
    if (roll < 30) return 1;

    return 0;
};

const card = document.getElementById("fortuneCard");
const button = document.getElementById("openCard");
const share = document.getElementById("shareButton");

let opened = Number(localStorage.getItem("openedCards") || 0);
const today = new Date().toDateString();

let streak = Number(localStorage.getItem("streak") || 0);

const lastVisit = localStorage.getItem("lastVisit");
function updateLevel() {

    let level = "Explorer";

    if(opened>=25) level="Hunter";
    if(opened>=75) level="Master";
    if(opened>=150) level="Oracle";
    if(opened>=300) level="Legend";

    document.getElementById("levelValue").innerText = level;
}

function randomAura(){

    const aura=Math.floor(Math.random()*41)+60;

    document.getElementById("auraValue").innerText=aura+"%";

}

function updateStreak(){

    document.getElementById("streakValue").innerText=opened;

}

updateLevel();
updateStreak();
randomAura();

button.addEventListener("click",()=>{

button.disabled=true;

card.classList.remove("flip");

setTimeout(()=>{

opened++;

localStorage.setItem("openedCards",opened);

updateLevel();
updateStreak();
randomAura();

const prediction=predictions[
Math.floor(Math.random()*predictions.length)
];

const rarity=rarityChance();

document.getElementById("prediction").innerText=prediction;

document.getElementById("rarity").innerText=rarities[rarity];

document.getElementById("cardTitle").innerText=
cardTitles[Math.floor(Math.random()*cardTitles.length)];

document.getElementById("category").innerText=
categories[Math.floor(Math.random()*categories.length)];

document.getElementById("cardNumber").innerText=
"Card #"+
String(Math.floor(Math.random()*365)+1).padStart(3,"0");

card.classList.add("flip");

share.classList.remove("hidden");

button.innerText="Открыть снова";

button.disabled=false;

},600);

});

share.addEventListener("click",()=>{

const text=
document.getElementById("prediction").innerText;

if(navigator.share){

navigator.share({

title:"NEXORA Fortune",

text:text

});

}else{

navigator.clipboard.writeText(text);

alert("Предсказание скопировано!");

}

});