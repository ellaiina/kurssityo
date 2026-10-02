const sivunNimi = "Teen Maailma";

let haudutusLampotila = 80;

console.log("Sivun nimi:", sivunNimi);
console.log("Haudutuslämpötila:", haudutusLampotila);

if (haudutusLampotila >= 80) {
    console.log("Lämpötila sopii hyvin mustalle teelle.");
} else {
    console.log("Lämpötila sopii paremmin vihreälle teelle.");
}


function laskeTeekupit(teekannujenMaara) {
    return teekannujenMaara * 4;
}

let kuppienMaara = laskeTeekupit(3);

console.log("Teekuppeja yhteensä:", kuppienMaara);


const teelaadut = [
    "Musta tee",
    "Vihreä tee",
    "Valkoinen tee",
    "Yrttitee"
];

teelaadut.forEach(function(teelaatu) {
    console.log(teelaatu);
}); 

function naytaTeeFakta() {
    alert("Tee on veden jälkeen yksi maailman juoduimmista juomista.");
}

const teefaktat = [
    "Kaikki aidot teelaadut tulevat samasta teekasvista.",
    "Vihreä tee sisältää luonnostaan antioksidantteja.",
    "Japanissa teeseremonia on tärkeä osa kulttuuria."
];

function naytaSatunnainenFakta() {
    let indeksi = Math.floor(Math.random() * teefaktat.length);
    alert(teefaktat[indeksi]);
}
``

function laskeKuppeja() {
    let kupit = laskeTeekupit(5);
    alert("Viidestä teekannusta saadaan " + kupit + " teekuppia.");
}

const haeKissat = document.getElementById("haeKissat");
const kuvaMaara = document.getElementById("kuvaMaara");
const kissaTeksti = document.getElementById("kissaTeksti");
const kissaGalleria = document.getElementById("kissaGalleria");

haeKissat.addEventListener("click", () => {

    let maara = kuvaMaara.value;

    kissaTeksti.innerText =
        "Haetaan " + maara + " kissakuvaa...";

    fetch(
        "https://api.thecatapi.com/v1/images/search?limit=" + maara
    )

    .then(response => response.json())

    .then(data => {

        console.log("Rajapinnan vastaus:", data);

        kissaGalleria.innerHTML = "";

        data.forEach(kissa => {

            const img = document.createElement("img");

            img.src = kissa.url;

            kissaGalleria.appendChild(img);

        });

        kissaTeksti.innerText =
            maara + " kissakuvaa haettu onnistuneesti!";

    })

    .catch(error => {

        console.error("Virhe haussa:", error);

        kissaTeksti.innerText =
            "Kuvien hakeminen epäonnistui.";

    });

});

const haeSaa = document.getElementById("haeSaa");
const saaTeksti = document.getElementById("saaTeksti");
const teeSuositus = document.getElementById("teeSuositus");

haeSaa.addEventListener("click", () => {

    saaTeksti.innerText = "Haetaan säätietoja...";
    teeSuositus.innerText = "";

    fetch("https://api.open-meteo.com/v1/forecast?latitude=63.10&longitude=21.60&current=temperature_2m")

        .then(response => response.json())

        .then(data => {

            console.log("Sää-API:", data);

            const lampotila = data.current.temperature_2m;

            let emoji = "";

            if (lampotila >= 20) {
                emoji = "☀️";
            } else if (lampotila >= 10) {
                emoji = "⛅";
            } else if (lampotila >= 0) {
                emoji = "☁️";
            } else {
                emoji = "❄️";
            }

            saaTeksti.innerText =
                emoji + " Vaasan lämpötila: " +
                lampotila +
                " °C";

            if (lampotila < 10) {
                teeSuositus.innerText =
                    "🍵 Viileä päivä, kuuma musta tee sopii hyvin.";
            } else {
                teeSuositus.innerText =
                    "🌿 Lempeä sää, kokeile raikasta vihreää teetä.";
            }

        })

        .catch(error => {

            console.error(error);

            saaTeksti.innerText =
                "Säätietojen hakeminen epäonnistui.";

        });

});