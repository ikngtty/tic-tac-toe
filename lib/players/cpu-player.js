const util = require('../util')

class CpuPlayer {
  constructor (char, strategy) {
    this._char = char
    this._strategy = strategy
  }
  get char () { return this._char }

  async play (stateInfo) {
    util.displayBoard(stateInfo.board)
    const action = this._strategy.play(stateInfo)
    console.log(action.toNotation())
    console.log()
    return action
  }
}

module.exports = CpuPlayer
