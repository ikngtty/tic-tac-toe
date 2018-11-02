const ActionFactory = require('../actions/action-factory')
const ResignAction = require('../actions/resign-action')
const util = require('../util')

class PlayerStrategyFool {
  constructor (playerChar) {
    this._playerChar = playerChar
  }

  play (stateInfo) {
    const actions =
      new ActionFactory().enumerateValidBoardActions(stateInfo)
        .filter(action => action.playerChar === this._playerChar) // For safety.
    if (actions.length <= 0) {
      return ResignAction(this._char)
    }

    return util.getRandomItem(actions)
  }
}

module.exports = PlayerStrategyFool
