import Sport from './sport.js'

/**
 * @class
 * @extends Sport
 */
class Football extends Sport {
  /**
   * @constructor
   * @param {number} gameTime - The total time for a football game session
   * @param {number} breakTime - The duration of the break between halves.
   */
  constructor(gameTime, breakTime) {
    const msGameTime = gameTime
    const totalBreaks = 1
    const breakDuration = breakTime
    const numberOfPlayers = 11

    super(msGameTime, totalBreaks, breakDuration, numberOfPlayers)
  }
}

export default Football
