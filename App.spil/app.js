("use strict"); // Aktiverer strict mode - hjælper med at fange fejl

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
}

// ===== DATA HENTNING =====
async function getGames() {
  const response = await fetch(
    "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/games.json"
  );
  allGames = await response.json();
  displayGames(allGames);
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

  // Vis ÉT game card
  // Husk: game.players er et OBJECT!
  // Er der andre properties, du skal tænke over?
}

// ===== FILTRERING =====
function populateGenreDropdown() {
  // Opbyg genre dropdown
  // OBS: game.genre er en STRING (ikke array!)
}

function filterGames() {
  // Filtrer games baseret på søgning, genre, playtime, ovs.
  // OBS: game.genre skal sammenlignes med === (ikke .includes())
}

// ===== MODAL =====
function showGameModal(game) {
  // Vis (alle) game detaljer i modal
  // Hvilke felter har et game? (Se JSON strukturen)
}
