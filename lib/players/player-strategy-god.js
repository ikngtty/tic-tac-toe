const resultType = require('../consts/result-type')
const ActionFactory = require('../actions/action-factory')
const ResignAction = require('../actions/resign-action')

// The better a game result for the player is,
// the higher number it is assessed at.
const assessments = {
  WIN: 2,
  DRAW: 1,
  UNKNOWN: 0,
  LOSE: -1
}

// TODO: To cache predictions.
class PlayerStrategyGod {
  constructor (playerChar) {
    this._playerChar = playerChar
  }

  play (stateInfo) {
    return this._playAndPredict(stateInfo).action
  }

  // Return not only an action but an assessment of action's final result.
  // For a recursive call.
  _playAndPredict (stateInfo) {
    const actions =
      new ActionFactory().enumerateValidBoardActions(stateInfo)
        .filter(action => action.playerChar === this._playerChar) // For safety.
    if (actions.length <= 0) {
      return {
        assessment: assessments.LOSE,
        action: ResignAction(this._char)
      }
    }

    // Apply an action and assess the next game state and store them.
    // We call a set of them a game node.
    // Return when finding an action to win.
    const gameNodes = []
    for (const action of actions) {
      const appliedState = action.applyTo(stateInfo)
      const assessment = this._assess(appliedState.checkResult())
      if (assessment === assessments.WIN) {
        return {
          assessment: assessments.WIN,
          action: action
        }
      }
      gameNodes.push({
        assessment: assessment,
        action: action,
        gameState: appliedState
      })
    }

    const enemyChar = this._enemyChar()

    // Make unknown assessments certain
    // with predicting final states of the game.
    // Return when finding an action to win.
    for (const node of gameNodes) {
      if (node.assessment !== assessments.UNKNOWN) {
        continue
      }
      const virtualEnemyStrategy = new PlayerStrategyGod(enemyChar)
      const stateInfoOfEnemy = node.gameState.perceivedBy(enemyChar)
      // A recursive call.
      // This call ends sometime, because the game state to pass the next call
      // is made move forward. (A game of tic-tac-toe must end sometime.)
      const enemyAssessment =
        virtualEnemyStrategy._playAndPredict(stateInfoOfEnemy).assessment
      if (enemyAssessment === assessments.LOSE) {
        return {
          assessment: assessments.WIN,
          action: node.action
        }
      }
      // Overwrite!
      node.assessment = (enemyAssessment => {
        switch (enemyAssessment) {
          case assessments.DRAW:
            return assessments.DRAW
          case assessments.WIN:
            return assessments.LOSE
          default:
            throw new Error(
              'Now the assessment of the virtual enemy must be DRAW or WIN.'
            )
        }
      })(enemyAssessment)
    }

    // OMG! There is no action to win!
    // Choose a less painful action.
    gameNodes.sort((l, r) => r.assessment - l.assessment) // Descendeing.
    const node = gameNodes[0]
    return {
      assessment: node.assessment,
      action: node.action
    }
  }

  _assess (result) {
    switch (result.resultType) {
      case null:
        return assessments.UNKNOWN
      case resultType.DRAW:
        return assessments.DRAW
      case resultType.WIN_OR_LOSE:
        if (result.winner === this._playerChar) {
          return assessments.WIN
        } else {
          return assessments.LOSE
        }
      default:
        throw new Error('Given result is unusual.')
    }
  }

  _enemyChar () {
    switch (this._playerChar) {
      case 'o': return 'x'
      case 'x': return 'o'
      default: throw new Error('An irregular player character.')
    }
  }
}

module.exports = PlayerStrategyGod
