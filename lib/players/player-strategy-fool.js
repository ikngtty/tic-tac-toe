const FillAction = require('../actions/fill-action')
const ResignAction = require('../actions/resign-action')
const util = require('../util')

class PlayerStrategyFool {
  constructor (playerChar) {
    this._playerChar = playerChar
  }

  play (stateInfo) {
    const actions = []
    for (const actionClass of this.constructor.USE_ACTION_CLASSES) {
      actionClass.createValidOnes(stateInfo)
        .filter(action => action.playerChar === this._playerChar) // For safety.
        .forEach(action => actions.push(action))
    }
    if (actions.length <= 0) { // For safety.
      return ResignAction(this._char)
    }

    return util.getRandomItem(actions)
  }
}
PlayerStrategyFool.USE_ACTION_CLASSES = [FillAction]

module.exports = PlayerStrategyFool
