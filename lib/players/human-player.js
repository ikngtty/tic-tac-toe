const ActionFactory = require('../actions/action-factory')
const util = require('../util')

class HumanPlayer {
  constructor (char, readlineInterface) {
    this._char = char
    this._rl = readlineInterface
  }
  get char () { return this._char }

  async play (stateInfo) {
    return new Promise(resolve => this._ask(stateInfo, resolve))
  }

  get _ask () { return this.__ask.bind(this) }
  __ask (stateInfo, resolve) {
    util.displayBoard(stateInfo.board)
    this._rl.question(`"${this._char}" to play. > `, answer => {
      const notation = `${this._char}:${answer}`
      const action = new ActionFactory().createFromNotation(notation)
      if (!action) {
        console.log('Invalid notation.')
        console.log()
        this._ask(stateInfo, resolve)
        return
      }
      const validation = action.checkValidation(stateInfo)
      if (!validation.isValid) {
        console.log(`The action is rejected: ${validation.description}`)
        console.log()
        this._ask(stateInfo, resolve)
        return
      }
      console.log()
      resolve(action)
    })
  }
}

module.exports = HumanPlayer
