class Sport {
  /**
   * @constructor
   * @param {number} msGameTime - The total time for a game session in milliseconds.
   * @param {number} totalBreaks - The total number of breaks during a game.
   * @param {number} breakDuration - The duration of each break in milliseconds.
   */
  constructor(msGameTime, totalBreaks, breakDuration) {
    /**
     * The total time for a game session in milliseconds.
     * @type {number}
     */
    this.msGameTime = msGameTime;

    /**
     * The total number of breaks during a game.
     * @type {number}
     */
    this.totalBreaks = totalBreaks;

    /**
     * The duration of each break in milliseconds.
     * @type {number}
     */
    this.breakDuration = breakDuration;
  }
}
export default Sport;
