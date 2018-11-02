const FillAction = require('./fill-action')
const ResignAction = require('./resign-action')
const AbortAction = require('./abort-action')

class ActionFactory {
  createFromNotation (notation) {
    const actions = [
      FillAction,
      ResignAction,
      AbortAction
    ]

    for (const actionClass of actions) {
      if (actionClass.isValidNotation(notation)) {
        return actionClass.fromNotation(notation)
      }
    }
    return null
  }

  // NOTE: Board action: fill <=> Non-board action: resign, abort
  enumerateValidBoardActions (state) {
    const playerChar = state.nextPlayerChar
    const squares = Array.from(state.board.squaresString)

    const unfilledSquareIndexes = []
    squares.forEach((char, i) => {
      if (!['o', 'x'].includes(char)) {
        unfilledSquareIndexes.push(i)
      }
    })

    const validFillActions = unfilledSquareIndexes.map(i => {
      return new FillAction(playerChar, i)
    })

    return validFillActions
  }
}

module.exports = ActionFactory
