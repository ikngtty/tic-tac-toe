const GameState = require('../game-states/game-state')

class ResignAction {
  constructor (playerChar) {
    if (!['o', 'x'].includes(playerChar)) {
      throw new Error('A player character must be "o" or "x".')
    }
    this._playerChar = playerChar
  }
  get playerChar () { return this._playerChar }

  static isValidNotation (notation) {
    return /^[ox]:resign$/.test(notation)
  }

  static fromNotation (notation) {
    if (!this.isValidNotation(notation)) {
      throw new Error('Invalid notation.')
    }
    const playerChar = notation[0]
    return new this(playerChar)
  }

  toNotation () {
    return `${this._playerChar}:resign`
  }

  checkValidation (state) {
    return {
      isValid: true,
      description: ''
    }
  }

  applyTo (state) {
    return new GameState(
      state.board,
      state.nextPlayerChar,
      this._playerChar,
      state.isAborted
    )
  }
}

module.exports = ResignAction
