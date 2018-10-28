const resultType = require('../consts/result-type')
const Board = require('./board')

class GameState {
  constructor (
    board,
    nextPlayerChar,
    resignedPlayerChar = null,
    isAborted = false
  ) {
    this._board = board
    this._nextPlayerChar = nextPlayerChar
    this._resignedPlayerChar = resignedPlayerChar
    this._isAborted = isAborted
  }
  get board () { return this._board }
  get nextPlayerChar () { return this._nextPlayerChar }
  get resignedPlayerChar () { return this._resignedPlayerChar }
  get isAborted () { return this._isAborted }

  static initial () {
    const board = Board.fromNotation('[---,---,---]')
    const nextPlayerChar = 'o'
    return new this(board, nextPlayerChar)
  }

  perceivedBy (playerChar) {
    return this
  }

  checkResult () {
    if (this._isAborted) {
      return {
        resultType: resultType.ABORTED,
        winner: null,
        description: `The game is aborted.`
      }
    } else if (this._resignedPlayerChar) {
      const winner = (resined => {
        switch (resined) {
          case 'o': return 'x'
          case 'x': return 'o'
          default: throw new Error('An irregular player character.')
        }
      })(this._resignedPlayerChar)
      return {
        resultType: resultType.WIN_OR_LOSE,
        winner: winner,
        description: `"${this._resignedPlayerChar}" resigned.`
      }
    }

    const squareChars = Array.from(this._board.squaresString)
    const lines = [
      { indexes: [0, 1, 2], type: 'horizontal' },
      { indexes: [3, 4, 5], type: 'horizontal' },
      { indexes: [6, 7, 8], type: 'horizontal' },
      { indexes: [0, 3, 6], type: 'vertical' },
      { indexes: [1, 4, 7], type: 'vertical' },
      { indexes: [2, 5, 8], type: 'vertical' },
      { indexes: [0, 4, 8], type: 'diagonal' },
      { indexes: [2, 4, 6], type: 'diagonal' }
    ]
    for (const line of lines) {
      const chars = line.indexes.map(i => squareChars[i])
      if (
        ['o', 'x'].includes(chars[0]) &&
        chars[1] === chars[0] &&
        chars[2] === chars[0]
      ) {
        return {
          resultType: resultType.WIN_OR_LOSE,
          winner: chars[0],
          description: `A ${line.type} line is completed !`
        }
      }
    }

    if (squareChars.every(char => ['o', 'x'].includes(char))) {
      return {
        resultType: resultType.DRAW,
        winner: null,
        description: 'No line is completed.'
      }
    }

    return {
      resultType: null,
      winner: null,
      description: ''
    }
  }
}

module.exports = GameState
