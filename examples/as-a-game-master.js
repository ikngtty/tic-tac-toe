const readline = require('readline')
const resultType = require('../lib/consts/result-type')
const HumanPlayer = require('../lib/players/human-player')
const GameMaster = require('../lib/game-master')
const util = require('../lib/util')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const oPlayer = new HumanPlayer('o', rl)
const xPlayer = new HumanPlayer('x', rl)
const gm = new GameMaster(oPlayer, xPlayer)

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
