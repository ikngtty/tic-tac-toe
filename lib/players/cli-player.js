const ActionFactory = require('../actions/action-factory')

class CliPlayer {
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
    this._displayBoard(stateInfo.board)
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

  _displayBoard (board) {
    const sq = board.squaresString
    const getSq = i => sq[i] === '-' ? ' ' : sq[i]
    const text =
`    1   2   3
  ┏━━━┳━━━┳━━━┓
a ┃ ${getSq(0)} ┃ ${getSq(1)} ┃ ${getSq(2)} ┃
  ┣━━━╋━━━╋━━━┫
b ┃ ${getSq(3)} ┃ ${getSq(4)} ┃ ${getSq(5)} ┃
  ┣━━━╋━━━╋━━━┫
c ┃ ${getSq(6)} ┃ ${getSq(7)} ┃ ${getSq(8)} ┃
  ┗━━━┻━━━┻━━━┛`
    console.log(text)
  }
}

module.exports = CliPlayer
