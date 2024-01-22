import Game from './src/game.js';
import { displayGamesList } from './src/gamesList.js';
import Football from './src/football.js';
import { fetchGameData } from './src/services/fetchGameData.js';

/**
 * The canvas element for rendering the game.
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('canvas');

/**
 * The 2D rendering context of the canvas.
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');

/**
 * The configuration object for the application.
 * @type {Object}
 */
let appConfig;

/**
 * Callback function for handling game selection.
 * @param {Object} clickedGame - The selected game data.
 */
const onGameSelected = (clickedGame) => {
  try {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const footballGameConfig = new Football(appConfig.msPerGamePeriod, appConfig.break);
    const footballGame = new Game(footballGameConfig, ctx, clickedGame);
    footballGame.startCountDown();
  } catch (error) {
    console.error('Error creating game:', error);
  }
};

const initializeApp = async () => {
  try {
    const { config, data } = await fetchGameData();
    appConfig = config;

    displayGamesList(ctx, data, onGameSelected, canvas);
  } catch (error) {
    console.error('Initialization error:', error.message);
  }
};

document.addEventListener('DOMContentLoaded', initializeApp);
