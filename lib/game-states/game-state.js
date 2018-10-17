const Board = require('./board')

class GameState {
  constructor (board) {
    this._board = board
  }
  get board () { return this._board }

  static initial () {
    const board = Board.fromNotation('[---,---,---]')
    return new this(board)
  }
}

module.exports = GameState
