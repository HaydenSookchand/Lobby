import { loadImage } from './services/imageLoader.js'

class Game {
  constructor(config, canvasContext, gameData) {
    this.config = config
    this.currentGame = gameData
    this.canvasContext = canvasContext
    this.totalDurationInterval = null
    this.counter = 0
    this.scoreDetails = []
  }

  startCountDown() {
    this.updateDOM()
 
    this.totalDurationInterval = setInterval(() => {
      this.playGame()
    }, 10) // Update the interval to 10 milliseconds
    window.scrollTo(0, 0)
  }

  playGame() {
    this.counter++
    let gameInfo = 'Game Started'
    const formattedCounter = (this.counter / 100).toFixed(2).replace('.', ':')

    // Game session completed
    if (this.counter * 10 === this.config.msGameTime) {
      console.log('Game Session Over')
      gameInfo = ' Half Time'
      this.endGameSession()
    }

    // All game sessions completed
    if (this.counter * 10 === this.getTotalGameTime()) {
      console.log('Full Time')
      gameInfo = 'Full Time'
      this.endGame()
    }

    this.clearCanvas()
    this.canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)' 
    this.canvasContext.fillRect(0, 0, canvas.width, canvas.height / 1.5)

    const homeTeamImage = new Image()
    homeTeamImage.src = `./assets/${this.currentGame.homeTeamAbbr}.png`

    const awayTeamImage = new Image()
    awayTeamImage.src = `./assets/${this.currentGame.awayTeamAbbr}.png`

    this.canvasContext.drawImage(homeTeamImage, 40, 10 + 80, 150, 150)
    this.canvasContext.fillStyle = '#fff'
    this.canvasContext.font = '20px Arial'
    this.canvasContext.fillText(`${this.currentGame.homeTeamAbbr}`, 100, 270)
    this.canvasContext.drawImage(awayTeamImage, 420, 10 + 80, 150, 150)
    this.canvasContext.fillText(`${this.currentGame.awayTeamAbbr}`, 470, 270)
    this.canvasContext.fillStyle = '#fff'
    this.canvasContext.font = '105px Arial bold'

    const scoreText = this.getScore(this.currentGame, this.counter)
    const scoreTextWidth = this.canvasContext.measureText(scoreText).width
    const scoreTextX = (canvas.width - scoreTextWidth) / 2
    this.canvasContext.fillText(scoreText, scoreTextX, 210)

    this.drawCounter(formattedCounter, gameInfo)
    const gameInfoWidth = this.canvasContext.measureText(gameInfo).width
    const gameInfoX = (canvas.width - gameInfoWidth) / 2
    this.canvasContext.fillText(gameInfo, gameInfoX, 300)
    // Iterate over scoreDetails and render each entry on a new line
    const startY = 360
    const lineHeight = 25

    for (let i = 0; i < this.scoreDetails.length; i++) {
      const y = startY + i * lineHeight

      const scoreDetailsText = this.scoreDetails[i]
      const scoreDetailsTextWidth = this.canvasContext.measureText(scoreDetailsText).width
      const scoreDetailsTextX = (canvas.width - scoreDetailsTextWidth) / 2
      this.canvasContext.fillText(scoreDetailsText, scoreDetailsTextX, y)

      const ballImage = new Image()
      ballImage.src = `./assets/ball.png`
      const ballX = 220
      this.canvasContext.drawImage(ballImage, ballX, y - 15, 20, 20)
    }
  }

  clearCanvas() {
    this.canvasContext.clearRect(0, 0, canvas.width, canvas.height)
  }

  drawCounter(formattedCounter) {
    this.canvasContext.font = '20px Arial'
    this.canvasContext.fillStyle = '#fff'
    this.canvasContext.fillText(formattedCounter, 270, 250)
  }

  endGameSession() {
    clearInterval(this.totalDurationInterval)

    // Start break timer
    setTimeout(() => {
      console.log('Break Over')
      this.startCountDown()
    }, this.config.breakDuration)
  }

  endGame() {
    clearInterval(this.totalDurationInterval)
  }

  getTotalGameTime() {
    return this.config.msGameTime * (this.config.totalBreaks + 1)
  }

  getScore(game, counter) {
    let goalsHome = 0
    let goalsAway = 0

    const uniqueScoreDetails = new Set(this.scoreDetails)
    const sortedGoals = game.goals.sort((a, b) => a.videoMS - b.videoMS)

    sortedGoals.forEach((goal) => {
      if (goal.teamAbbr === game.homeTeamAbbr && goal.videoMS <= counter * 10) {
        goalsHome++

        // Check if the score detail is not already in the Set before adding
        const scoreDetail = `${game.homeTeamAbbr} ${(goal.videoMS / 1000).toFixed(0).replace('.', ':')}'`
        if (!uniqueScoreDetails.has(scoreDetail)) {
          uniqueScoreDetails.add(scoreDetail)
          this.scoreDetails.push(scoreDetail)
          this.displayGoalAnimation()
        }
      } else if (goal.teamAbbr === game.awayTeamAbbr && goal.videoMS <= counter * 10) {
        goalsAway++

        // Check if the score detail is not already in the Set before adding
        const scoreDetail = `${game.awayTeamAbbr} ${(goal.videoMS / 1000).toFixed().replace('.', ':')}'`
        if (!uniqueScoreDetails.has(scoreDetail)) {
          uniqueScoreDetails.add(scoreDetail)
          this.scoreDetails.push(scoreDetail)
          this.displayGoalAnimation()
        }
      }
    })

    return `${goalsHome} - ${goalsAway}`
  }

  displayGoalAnimation() {
    const initialFontSize = 5;
    const goalText = 'GOAL!!!';
    const animationTiming = 1200;
    const startTime = Date.now();
    const centerX = canvas.width / 2;
  
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const fontSize = initialFontSize + (elapsed / animationTiming) * 35;
  
      this.canvasContext.font = `${fontSize}px Arial bold`;
      this.canvasContext.fillStyle = '#fff';
  
      const textWidth = this.canvasContext.measureText(goalText).width;
      const textX = centerX - textWidth / 2;
      const textY = 100;
  
      this.canvasContext.fillText(goalText, textX, textY);
  
      if (elapsed < animationTiming && fontSize < 40) {
        requestAnimationFrame(animate);
      } else {
        this.canvasContext.clearRect(0, 0, canvas.width, canvas.height / 1.5);
      }
    };
  
    requestAnimationFrame(animate);
  }
  
  updateDOM() {
    canvas.height = window.innerHeight + 150;
    document.body.style.backgroundImage = 'url("./assets/background.jpg")'
    document.body.style.backgroundColor = '#436f1a'
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100%'

    const backButton = document.createElement('img')
    backButton.src = './assets/back.png'
    backButton.style.width = '40px'
    backButton.style.height = '40px'
    backButton.style.position = 'fixed'
    backButton.style.top = '10px'
    backButton.style.right = '20px'

    backButton.addEventListener('click', () => {
      this.endGame()
      window.location.reload()
    })

    document.body.appendChild(backButton)
  }
}

export default Game
