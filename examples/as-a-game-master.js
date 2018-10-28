const readline = require('readline')
const resultType = require('../lib/consts/result-type')
const CliPlayer = require('../lib/players/cli-player')
const GameMaster = require('../lib/game-master')

const displayBoard = board => {
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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const oPlayer = new CliPlayer('o', rl)
const xPlayer = new CliPlayer('x', rl)
const gm = new GameMaster(oPlayer, xPlayer)

gm.on('gameend', (result, state) => {
  displayBoard(state.board)
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
