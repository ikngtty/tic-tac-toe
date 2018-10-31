const readline = require('readline')

const FillAction = require('../lib/actions/fill-action')
const Board = require('../lib/game-states/board')
const GameState = require('../lib/game-states/game-state')
const util = require('../lib/util')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let gameState = GameState.initial()
util.displayBoard(gameState.board)

rl.prompt()
rl.on('line', input => {
  if (input === 'quit') {
    rl.close()
  } else if (Board.isValidNotation(input)) {
    const board = Board.fromNotation(input)
    gameState = new GameState(board)
    util.displayBoard(gameState.board)
    rl.prompt()
  } else if (FillAction.isValidNotation(input)) {
    const action = FillAction.fromNotation(input)
    gameState = action.applyTo(gameState)
    util.displayBoard(gameState.board)
    rl.prompt()
  } else {
    console.log('What?')
    rl.prompt()
  }
})
