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
      <h3>${game.title}</h3>
      </P>player(s): ${game.players.min} - ${game.players.max}<br>
      <p>Spilletid: ${game.playtime} minutter</p>
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
