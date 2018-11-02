const util = {
  getRandomInt: max => {
    return Math.floor(Math.random() * (max + 1))
  },

  getRandomItem: array => {
    return array.length <= 0 ? null
      : array[util.getRandomInt(array.length - 1)]
  },

  // TODO: Create an appropriate class.
  displayBoard: board => {
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

module.exports = util
