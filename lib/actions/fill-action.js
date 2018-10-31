const Board = require('../game-states/board')
const GameState = require('../game-states/game-state')

class FillAction {
  constructor (playerChar, squareIndex) {
    if (playerChar.length !== 1) {
      throw new Error('The length of player character must be 1.')
    } else if (squareIndex < 0 || squareIndex > 8) {
      throw new Error('The index of square must be between 0 and 8.')
    }

    this._playerChar = playerChar
    this._squareIndex = squareIndex
  }

  static isValidNotation (notation) {
    return /^.:[a-c][1-3]$/.test(notation)
  }

  static fromNotation (notation) {
    if (!this.isValidNotation(notation)) {
      throw new Error('Invalid notation.')
    }
    const playerChar = notation[0]
    const rowNum = {
      a: 0,
      b: 1,
      c: 2
    }[notation[2]]
    const colNum = Number(notation[3]) - 1
    const squareIndex = rowNum * 3 + colNum
    return new this(playerChar, squareIndex)
  }

  toNotation () {
    const rowAlpha = ['a', 'b', 'c'][Math.floor(this._squareIndex / 3)]
    const colNum = this._squareIndex % 3 + 1
    return `${this._playerChar}:${rowAlpha}${colNum}`
  }

  applyTo (state) {
    const squareChars = Array.from(state.board.squaresString)
    squareChars[this._squareIndex] = this._playerChar
    const newSquaresString = squareChars.join('')
    const newBoard = new Board(newSquaresString)
    return new GameState(newBoard)
  }
}

module.exports = FillAction
