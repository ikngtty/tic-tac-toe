const GameState = require('../game-states/game-state')

class AbortAction {
  constructor (playerChar) {
    if (!['o', 'x'].includes(playerChar)) {
      throw new Error('A player character must be "o" or "x".')
    }
    this._playerChar = playerChar
  }
  get playerChar () { return this._playerChar }

  static isValidNotation (notation) {
    return /^[ox]:abort$/.test(notation)
  }

  static fromNotation (notation) {
    if (!this.isValidNotation(notation)) {
      throw new Error('Invalid notation.')
    }
    const playerChar = notation[0]
    return new this(playerChar)
  }

  toNotation () {
    return `${this._playerChar}:abort`
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
      state.resignedPlayerChar,
      true
    )
  }
}

module.exports = AbortAction
