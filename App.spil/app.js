"use strict"; // Aktiverer strict mode - hjælper med at fange fejl

// Start app når DOM er loaded (hele HTML siden er færdig)
document.addEventListener("DOMContentLoaded", initApp);

// ===== GLOBALE VARIABLER =====
let allGames = []; // Hvorfor har vi brug for den her variabel?
// Hvad kaldes den i Movie App?

// ===== INITIALISERING =====
function initApp() {
  console.log("initApp: app.js is running 🎉");
  getGames();
  // Start app - initApp kaldes når DOMen er loaded // HTML siden er klar
  // Hvad skal der så ske?
  // Hent data? Sæt event listeners?
  const genreSelect = document.querySelector("#genre-select");
  if (genreSelect) genreSelect.addEventListener("change", filterGames);

  const sortSelect = document.querySelector("#sort-select");
  if (sortSelect) sortSelect.addEventListener("change", filterGames);

  const searchInput = document.querySelector("#search-input");
  if (searchInput) searchInput.addEventListener("input", filterGames);
}

// ===== DATA HENTNING =====
async function getGames() {
  const response = await fetch(
    "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/games.json"
  );
  allGames = await response.json();
  displayGames(allGames);
  populateGenreDropdown(); // Udfyld dropdown med genrer fra data
}
// Hent data fra JSON - husk at URL er anderledes!
// Gem data i allGames variablen
// Kald andre funktioner (hvilke?)

// ===== VISNING =====
function displayGames(games) {
  console.log(`🎲 Viser ${games.length} games`);
  // Nulstil #game-list HTML'en
  document.querySelector("#game-list").innerHTML = "";
  // Vis alle games - loop gennem og kald displayGame() for hver game
  for (const game of games) {
    displayGame(game);
  }
}

function displayGame(game) {
  const gameList = document.querySelector("#game-list");

  const gameHTML = `
    <div class="game-card">
      <img src="${game.image}" alt="Cover of ${game.title}" class="game-cover" />
      <article class="card2-info">
      <h3>${game.title}</h3>
        <section class="atributterCard2">
          <div></P><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg> 
          ${game.players.min} - ${game.players.max}<br></div>
          <div><p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120q-74 0-139.5-28.5T226-226q-49-49-77.5-114.5T120-480q0-44 10-85.5t29-78q19-36.5 45.5-68T264-768l272 272-56 56-216-216q-30 36-47 80.5T200-480q0 116 82 198t198 82q116 0 198-82t82-198q0-107-68.5-184.5T520-756v76h-80v-160h40q74 0 139.5 28.5T734-734q49 49 77.5 114.5T840-480q0 74-28.5 139.5T734-226q-49 49-114.5 77.5T480-120ZM280-440q-17 0-28.5-11.5T240-480q0-17 11.5-28.5T280-520q17 0 28.5 11.5T320-480q0 17-11.5 28.5T280-440Zm200 200q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm200-200q-17 0-28.5-11.5T640-480q0-17 11.5-28.5T680-520q17 0 28.5 11.5T720-480q0 17-11.5 28.5T680-440Z"/></svg> 
          ${game.playtime} min</p></div>
        </section>
      </article>
    </div>
  `;
  gameList.insertAdjacentHTML("beforeend", gameHTML);

  // Find det kort vi lige har tilføjet (det sidste element)
  const newCard = gameList.lastElementChild;

  // Tilføj click event til kortet - når brugeren klikker på kortet
  newCard.addEventListener("click", function () {
    showGameModal(game); // Vis modal med film detaljer
  });

  // Tilføj keyboard support (Enter og mellemrum) for tilgængelighed
  newCard.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // Forhindre scroll ved mellemrum
      showGameModal(game); // Vis modal med film detaljer
    }
  });
}

// ===== DROPDOWN OG MODAL FUNKTIONER =====
// #5: Udfyld genre-dropdown med alle unikke genrer fra data
function populateGenreDropdown() {
  const genreSelect = document.querySelector("#genre-select");

  // Fjern gamle options undtagen "Filter"
  genreSelect.innerHTML = /*html*/ `<option value="all">Alle genre</option>`;

  // Brug et Set til at samle unikke genrer (uden forskel på store/små bogstaver)
  const genresSet = new Set();

  for (const game of allGames) {
    // Hvis genre er et array, gennemløb det
    if (Array.isArray(game.genre)) {
      for (let g of game.genre) {
        if (typeof g === "string" && g.trim() !== "") {
          genresSet.add(g.trim().toLowerCase());
        }
      }
    }
    // Hvis genre kun er en enkelt streng
    else if (typeof game.genre === "string" && game.genre.trim() !== "") {
      genresSet.add(game.genre.trim().toLowerCase());
    }
  }

  // Konverter Set → Array, sorter alfabetisk
  const sortedGenres = [...genresSet]
    .map((g) => g.charAt(0).toUpperCase() + g.slice(1)) // Gør første bogstav stort
    .sort((a, b) => a.localeCompare(b, "da")); // Sortér alfabetisk (dansk)

  // Tilføj til dropdown
  for (const genre of sortedGenres) {
    genreSelect.insertAdjacentHTML(
      "beforeend",
      /*html*/ `<option value="${genre}">${genre}</option>`
    );
  }
}

// ===== MODAL =====
// #6: Vis movie i modal dialog - popup vindue med film detaljer
function showGameModal(game) {
  // Find modal indhold container og byg HTML struktur dynamisk
  document.querySelector("#dialog-content").innerHTML = /*html*/ `
    <img src="${game.image}" alt="Cover af ${game.title}" class="game-cover">
    <div class="dialog-details">
      
      <section class="atributterCard2">
          <div></P><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg> 
          ${game.players.min} - ${game.players.max}<br></div>
          <div><p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120q-74 0-139.5-28.5T226-226q-49-49-77.5-114.5T120-480q0-44 10-85.5t29-78q19-36.5 45.5-68T264-768l272 272-56 56-216-216q-30 36-47 80.5T200-480q0 116 82 198t198 82q116 0 198-82t82-198q0-107-68.5-184.5T520-756v76h-80v-160h40q74 0 139.5 28.5T734-734q49 49 77.5 114.5T840-480q0 74-28.5 139.5T734-226q-49 49-114.5 77.5T480-120ZM280-440q-17 0-28.5-11.5T240-480q0-17 11.5-28.5T280-520q17 0 28.5 11.5T320-480q0 17-11.5 28.5T280-440Zm200 200q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm200-200q-17 0-28.5-11.5T640-480q0-17 11.5-28.5T680-520q17 0 28.5 11.5T720-480q0 17-11.5 28.5T680-440Z"/></svg> 
          ${game.playtime} min</p></div>
          <div><p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm1-220q99-73 149-146.5T680-594q0-102-65-154t-135-52q-70 0-135 52t-65 154q0 67 49 139.5T481-300Zm-1 100Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0-80Z"/></svg>
          ${game.shelf}</p></div>
        </section>
        <h2>${game.title} </h2>
      <p class="game-description">${game.description}</p>
      <p class="game-rules">${game.rules}</p>
    </div>
  `;

  // Åbn modalen - showModal() er en built-in browser funktion
  document.querySelector("#game-dialog").showModal();
}

// filterGames:
function filterGames() {
  // Start med en kopi af alle games
  let filtered = allGames.slice();

  // Læs filtre
  const searchValue = (document.querySelector("#search-input")?.value || "")
    .toLowerCase()
    .trim();
  const genreValue = (
    document.querySelector("#genre-select")?.value || "all"
  ).toLowerCase();
  const sortValue = document.querySelector("#sort-select")?.value || "none";

  // Filter på søgetekst (titel)
  if (searchValue) {
    filtered = filtered.filter((game) =>
      (game.title || "").toLowerCase().includes(searchValue)
    );
  }

  // Filter på genre (håndter både array og streng)
  if (genreValue && genreValue !== "all") {
    filtered = filtered.filter((game) => {
      if (Array.isArray(game.genre)) {
        return game.genre.some((g) => (g || "").toLowerCase() === genreValue);
      } else if (typeof game.genre === "string") {
        return (game.genre || "").toLowerCase() === genreValue;
      }
      return false;
    });
  }

  // Sortering
  if (sortValue === "title") {
    filtered.sort((a, b) => (a.title || "").localeCompare(b.title || "", "da"));
  } else if (sortValue === "playtime") {
    filtered.sort((a, b) => (b.playtime || 0) - (a.playtime || 0));
  } else if (sortValue === "year") {
    filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
  } else if (sortValue === "rating") {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  // Vis de filtrerede games
  displayGames(filtered);
}
