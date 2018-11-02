const readline = require('readline')
const resultType = require('../lib/consts/result-type')
const CpuPlayer = require('../lib/players/cpu-player')
const HumanPlayer = require('../lib/players/human-player')
const PlayerStrategyFool = require('../lib/players/player-strategy-fool')
const PlayerStrategyGod = require('../lib/players/player-strategy-god')
const GameMaster = require('../lib/game-master')
const util = require('../lib/util')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const playerGetters = new Map()
playerGetters.set('human', (playerChar, rl) => {
  return new HumanPlayer(playerChar, rl)
})
playerGetters.set('cpu1', (playerChar, rl) => {
  const strategy = new PlayerStrategyFool(playerChar)
  return new CpuPlayer(playerChar, strategy)
})
playerGetters.set('cpu2', (playerChar, rl) => {
  const strategy = new PlayerStrategyGod(playerChar)
  return new CpuPlayer(playerChar, strategy)
})

const getPlayer = (playerChar, args) => {
  return new Promise((resolve, reject) => {
    const ask = () => {
      rl.question(`Enter the kind of "${playerChar}" player. > `, answer => {
        if (answer === 'quit') {
          reject()
        } else if (playerGetters.has(answer)) {
          const player = playerGetters.get(answer)(playerChar, rl)
          args.players.push(player)
          resolve(args)
        } else {
          console.log('What?')
          ask()
        }
      })
    }
    ask()
  })
}
Promise.resolve({ players: [] })
  .then(args => getPlayer('o', args))
  .then(args => getPlayer('x', args))
  .then(args => {
    const gm = new GameMaster(args.players[0], args.players[1])

    gm.on('gameend', (result, state) => {
      util.displayBoard(state.board)
      switch (result.resultType) {
        case resultType.WIN_OR_LOSE:
          console.log(`"${result.winner}" win !`)
          break

        case resultType.DRAW:
          console.log('Draw !')
          break

        case resultType.ABORTED:
          console.log('The game is end.')
          break
      }
      console.log(result.description)
      rl.close()
    })

    gm.startGame()
  })
  .catch(() => { rl.close() })
