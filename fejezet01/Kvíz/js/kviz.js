/* JavaScript a kvízjátékhoz.
Az index.html fájl betölti ezt a szkriptet,
amely betölti a kérdéseket és a lehetséges válaszokat
a kvizkerdesek.js fájlból, és megjeleníti őket.
Ezek közül a felhasználó választhat. */

// A kvízjátékhoz szükséges változók
let kerdesek = [];
let valaszok = [];
let helyesValaszok = [];
let kerdesIndex = 0;
let pontszam = 0;

// A kvízjáték betöltése
function kvizBetoltes() {
    // A kvízkérdések és válaszok betöltése
    kerdesek = kvizkerdesek.map(kerdes => kerdes.kerdes);
    valaszok = kvizkerdesek.map(kerdes => kerdes.valaszok);
    helyesValaszok = kvizkerdesek.map(kerdes => kerdes.helyesValasz);

    // A kvízkérdések és válaszok megjelenítése
    kerdesMegjelenites();
}

// A kvízkérdések és válaszok megjelenítése
function kerdesMegjelenites() {
    // A kvízkérdés megjelenítése
    document.getElementById("kerdes").innerHTML = kerdesek[kerdesIndex];

    // A válaszlehetőségek megjelenítése
    let valaszHTML = "";
    for (let i = 0; i < valaszok[kerdesIndex].length; i++) {
        valaszHTML += `<button onclick="valaszEllenorzes('${valaszok[kerdesIndex][i]}')">${valaszok[kerdesIndex][i]}</button>`;
    }
    document.getElementById("valaszok").innerHTML = valaszHTML;
}

// A válasz ellenőrzése
function valaszEllenorzes(valasz) {
    // A válasz ellenőrzése
    if (valasz === helyesValaszok[kerdesIndex]) {
        pontszam++;
    }

    // A következő kérdés megjelenítése
    kerdesIndex++;
    if (kerdesIndex < kerdesek.length) {
        kerdesMegjelenites();
    } else {
        // A kvízjáték vége
        kvizVege();
    }
}

// A kvízjáték vége
function kvizVege() {
    // A pontszám megjelenítése
    document.getElementById("kerdes").innerHTML = `A kvízjáték véget ért! Pontszám: ${pontszam}/${kerdesek.length}`;

    // A válaszok törlése
    document.getElementById("valaszok").innerHTML = "";
}

// A kvízjáték betöltése
kvizBetoltes();