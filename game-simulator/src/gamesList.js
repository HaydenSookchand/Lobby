/**
 * Display a list of games on the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
 * @param {Array} gameData - An array containing game data.
 * @param {function} onGameSelected - Callback function to handle game selection.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 */
export function displayGamesList(ctx, gameData, onGameSelected, canvas) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const ITEM_HEIGHT = canvasHeight / 10; 
    const HOME_TEAM_X = 0
    const TEXT_X = canvasWidth / 3.8;
    const PLAY_BUTTON_X = canvasWidth / 3.8;
    const AWAY_TEAM_X = canvasWidth / 1.6;
    const TEAM_IMAGE_WIDTH = canvasWidth / 4;
    const TEAM_IMAGE_HEIGHT = canvasWidth / 4;
    const PLAY_BUTTON_WIDTH = 200;
    const PLAY_BUTTON_HEIGHT = canvasHeight / 40;
    const TEXT_COLOR = '#FFF';
    const BUTTON_BACKGROUND_COLOR = '#4CAF50';

    gameData.forEach((game, index) => {
        const homeTeamImage = new Image();
        const awayTeamImage = new Image();

        homeTeamImage.onload = () => {
            awayTeamImage.onload = () => {
                ctx.drawImage(
                    homeTeamImage,
                    HOME_TEAM_X,
                    ITEM_HEIGHT * index,
                    TEAM_IMAGE_WIDTH,
                    TEAM_IMAGE_HEIGHT
                );

                ctx.fillStyle = TEXT_COLOR;
                ctx.font = `${canvasHeight / 60}px Arial`;
                ctx.fillText(
                    `${game.homeTeamAbbr} vs. ${game.awayTeamAbbr}`,
                    TEXT_X,
                    ITEM_HEIGHT * index + TEAM_IMAGE_HEIGHT / 2
                );

                ctx.drawImage(
                    awayTeamImage,
                    AWAY_TEAM_X,
                    ITEM_HEIGHT * index,
                    TEAM_IMAGE_WIDTH,
                    TEAM_IMAGE_HEIGHT
                );

                ctx.fillStyle = BUTTON_BACKGROUND_COLOR;
                ctx.fillRect(
                    PLAY_BUTTON_X,
                    ITEM_HEIGHT * index + TEAM_IMAGE_HEIGHT - 50,
                    PLAY_BUTTON_WIDTH,
                    PLAY_BUTTON_HEIGHT
                );

                ctx.fillStyle = TEXT_COLOR;
                ctx.font = `${canvasHeight / 105}px Arial`;
                ctx.fillText(
                    'START SIMULATION',
                    PLAY_BUTTON_X + PLAY_BUTTON_WIDTH / 20,
                    ITEM_HEIGHT * index + TEAM_IMAGE_HEIGHT + PLAY_BUTTON_HEIGHT / 1.5 - 50
                );
            };

            awayTeamImage.src = `./assets/${game.awayTeamAbbr}.png`;
        };

        homeTeamImage.src = `./assets/${game.homeTeamAbbr}.png`;
    });

    canvas.addEventListener('click', function handleClick(event) {
        const windowWidth = window.innerWidth;
        const scaleFactor = (windowWidth < 600) ? 0.5 : 1.0;
    
        const clickedIndex = Math.floor(
            (event.clientY + window.scrollY - canvas.offsetTop) / (ITEM_HEIGHT * scaleFactor)
        );
    
        if (gameData[clickedIndex]) {
            onGameSelected(gameData[clickedIndex]);
            canvas.removeEventListener('click', handleClick);
        }
    });
}
