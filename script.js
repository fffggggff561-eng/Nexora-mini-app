const rarities = [
    "⭐ Common",
    "⭐⭐ Rare",
    "⭐⭐⭐ Epic",
    "👑 Legendary"
];

const rarityChance = () => {
    const roll = Math.random() * 100;

    if (roll < 2) return 3;      // Legendary 2%
    if (roll < 10) return 2;     // Epic 8%
    if (roll < 30) return 1;     // Rare 20%

    return 0;                    // Common 70%
};

const card = document.getElementById("fortuneCard");
const button = document.getElementById("openCard");
const share = document.getElementById("shareButton");

button.addEventListener("click", () => {

    button.disabled = true;

    card.classList.remove("flip");

    setTimeout(() => {

        const prediction =
            predictions[
                Math.floor(Math.random()*predictions.length)
            ];

        const rarity = rarityChance();

        document.getElementById("prediction").innerText =
            prediction;

        document.getElementById("rarity").innerText =
            rarities[rarity];

        document.getElementById("cardNumber").innerText =
            "Card #" +
            String(
                Math.floor(Math.random()*365)+1
            ).padStart(3,"0");

        card.classList.add("flip");

        share.classList.remove("hidden");

        button.innerText="Открыть снова";

        button.disabled=false;

    },600);

});

share.addEventListener("click",()=>{

    const text=document.getElementById("prediction").innerText;

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