class Board {
  constructor (squaresString) {
    if (squaresString.length !== 9) {
      throw new Error('The board must contain just 9 characters.')
    }
    this._squaresString = squaresString
  }
  get squaresString () { return this._squaresString }

  static isValidNotation (notation) {
    return /^\[.{3},.{3},.{3}\]$/.test(notation)
  }

  static fromNotation (notation) {
    if (!this.isValidNotation(notation)) {
      throw new Error('Invalid notation.')
    }

    const squaresString =
      notation.substring(1, 4) +
      notation.substring(5, 8) +
      notation.substring(9, 12)
    return new this(squaresString)
  }

  toNotation () {
    return '[' +
      this._squaresString.substring(0, 3) +
      ',' +
      this._squaresString.substring(3, 6) +
      ',' +
      this._squaresString.substring(6, 9) +
      ']'
  }
}

module.exports = Board
