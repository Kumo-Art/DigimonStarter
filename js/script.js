import { getDigimon } from "./api.js";

//--------------grab our Id's from HTML-----------------

const results = document.getElementById("results");
const status = document.getElementById("status");

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const levelSelect = document.getElementById("level-select");

//We will need several functions to make this work

//We will need to build our Digimon cards


//---------------Build a card for each Digimon--------------
const showDigimon = (list) => {
    results.textContent = ""; // this will clear out our old digimon cards

    list.forEach((digimon) => {
        const card = document.createElement("article");
        card.classList.add("card");

        const name = document.createElement("h2");
        name.textContent = digimon.name;

        const image = document.createElement("img");
        image.src = digimon.img;
        image.alt = digimon.name;

        const level = document.createElement("p");
        level.textContent = digimon.level;

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(level);

        results.appendChild(card);
    });
}





//----------------Show every digimon at one level------------------------
const showLevel = async (level) => {
//console.log(level);

   const result = await getDigimon(`/level/${level}`);
   showDigimon(result);
}




searchForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // stops the form from reloading the page

    status.textContent = "Loading digimon......";

    const digimonName = searchInput.value.trim();

    console.log(digimonName);

    //when calling async functions and storing that within a variable
    //we must still await the call and since we are using await
    //if that variable is within function that function now must be async
    const digimon = await getDigimon(`/name/${digimonName}`);
    console.log(digimon);
    //Call the show Digimon helper function that creates and displays our digimon card
    showDigimon(digimon);

    status.textContent = `Found: ${digimon[0].name}`
});


levelSelect.addEventListener("change", () => {
    showLevel(levelSelect.value);
});