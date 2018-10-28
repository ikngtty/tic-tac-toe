const EventEmitter = require('events')
const GameState = require('./game-states/game-state')

class GameMaster extends EventEmitter {
  constructor (oPlayer, xPlayer) {
    super()
    this._players = new Map()
    this._players.set('o', oPlayer)
    this._players.set('x', xPlayer)
  }

  async startGame (state = GameState.initial()) {
    const result = state.checkResult()
    if (result.resultType) {
      this.emit('gameend', result, state)
      return
    }

    const nextPlayer = this._players.get(state.nextPlayerChar)
    const stateInfo = state.perceivedBy(state.nextPlayerChar)
    const action = await nextPlayer.play(stateInfo)
    const nextState = action.applyTo(state)
    this.startGame(nextState)
  }
}

module.exports = GameMaster
