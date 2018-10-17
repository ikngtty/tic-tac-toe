const readline = require('readline')

const FillAction = require('../lib/actions/fill-action')
const Board = require('../lib/game-states/board')
const GameState = require('../lib/game-states/game-state')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const displayBoard = board => {
  const sq = board.squaresString
  const getSq = i => sq[i] === '-' ? ' ' : sq[i]
  const text =
`   1 2 3
  ┏━┳━┳━┓
a ┃${getSq(0)}┃${getSq(1)}┃${getSq(2)}┃
  ┣━╋━╋━┫
b ┃${getSq(3)}┃${getSq(4)}┃${getSq(5)}┃
  ┣━╋━╋━┫
c ┃${getSq(6)}┃${getSq(7)}┃${getSq(8)}┃
  ┗━┻━┻━┛`
  console.log(text)
}

let gameState = GameState.initial()
displayBoard(gameState.board)

rl.prompt()
rl.on('line', input => {
  if (input === 'quit') {
    rl.close()
  } else if (Board.isValidNotation(input)) {
    const board = Board.fromNotation(input)
    gameState = new GameState(board)
    displayBoard(gameState.board)
    rl.prompt()
  } else if (FillAction.isValidNotation(input)) {
    const action = FillAction.fromNotation(input)
    gameState = action.applyTo(gameState)
    displayBoard(gameState.board)
    rl.prompt()
  } else {
    console.log('What?')
    rl.prompt()
  }
})
