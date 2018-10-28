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
}

module.exports = ActionFactory
