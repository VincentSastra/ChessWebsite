class ChessLogic {
  constructor(tileArr = emptyArr(), castle = 'KQkq', peasant = '') {
    /** The Chessboard tile representation
     *  This is an 8 by 8 array of TileInfo
     *  TileInfo will have getter & setter for the tiles.
     */
    this.Tiles = generateChessBoard(tileArr);

    /** Castle is the current availability of castling stored as FEN notation
     *  Passant contains the block where peasants can perform En Passant
     */
    this.Castle = castle;
    this.Winner = 'none';
    this.Passant = peasant;
  }

  getTiles() {
    return this.Tiles;
  }

  getTile(row, col) {
    return this.Tiles[row][col];
  }

  getWinner() {
    return this.Winner;
  }

  getPiece(row, col) {
    return this.Tiles[row][col].getPiece();
  }

  movePiece(sourceRow, sourceCol, destRow, destCol, promoteTo = 'Queen') {
    const sourceTile = this.Tiles[sourceRow][sourceCol];
    const destTile = this.Tiles[destRow][destCol];

    let eaten = destTile.getPiece();

    if (eaten === 'King') {
      this.Winner = destTile.getColor() === 'white' ?
        'Black' : 'White';
    }

    destTile.piece = sourceTile.piece;

    // eslint-disable-next-line default-case
    switch (sourceTile.getPiece()) {
    case ('Pawn'):
      if (this.validPassant(sourceTile, destTile)) {
        eaten = 'Pawn';
        this.Tiles[destRow][sourceCol].piece = 'empty';
      }
      this.handlePromotion(sourceTile, destTile, promoteTo);
      break;
    case ('King'):
      this.handleCastle(sourceTile, destTile);
      this.disableCastle(sourceTile);
      break;
    case ('Rook'):
      this.disableCastle(sourceTile);
      break;
    }
    this.setPassant(sourceTile, destTile);
    sourceTile.piece = 'empty';

    return eaten;
  }

  validPassant(sourceTile, destTile) {
    return (sourceTile.getPiece() === 'Pawn' &&
      '' + destTile.row + destTile.col === this.Passant);
  }

  setPassant(sourceTile, destTile) {
    if (sourceTile.getPiece() === 'Pawn' &&
      Math.abs(destTile.row - sourceTile.row) === 2) {
      const direction = sourceTile.getColor() === 'white' ? 1 : -1;
      this.Passant = '' + (sourceTile.row + direction) + sourceTile.col;
    } else {
      this.Passant = '';
    }
  }

  handlePromotion(sourceTile, destTile, promoteTo) {
    if (destTile.row === 0 || destTile.row === 7) {
      destTile.piece = sourceTile.getColor() + promoteTo;
    }
  }

  handleCastle(sourceTile, destTile) {
    if (Math.abs(destTile.col - sourceTile.col) > 1) {
      if (destTile.col === 2) {
        this.movePiece(sourceTile.row, 0, sourceTile.row, 3);
      } else if (destTile.col === 6) {
        this.movePiece(sourceTile.row, 7, sourceTile.row, 5);
      }
    }
  }

  disableCastle(sourceTile) {
    let letterToReplace = sourceTile.getPiece() === 'King' ? 'KQ' :
      sourceTile.col === 0 ? 'Q' : 'K';

    if (sourceTile.getColor() === 'black') {
      letterToReplace = letterToReplace.toLowerCase();
    }

    const regex = new RegExp(letterToReplace, '');
    this.Castle = this.Castle.replace(regex, '');
  }

  getValidTiles(row, col) {
    const tile = this.Tiles[row][col];

    const color = tile.getColor();
    const piece = tile.getPiece();

    const validMoves = [];

    // eslint-disable-next-line default-case
    switch (piece) {
    case ('Rook'): {
      this.getValidRookTiles(col, row, color, validMoves);
      break;
    }
    case ('Knight'): {
      this.getValidKnightTiles(col, row, color, validMoves);
      break;
    }
    case ('Bishop'): {
      this.getValidBishopTiles(col, row, color, validMoves);
      break;
    }
    case ('King'): {
      this.getValidKingTiles(col, row, color, validMoves);
      break;
    }
    case ('Queen'):
      this.getValidBishopTiles(col, row, color, validMoves);
      this.getValidRookTiles(col, row, color, validMoves);
      break;
    case ('Pawn'): {
      this.getValidPawnTiles(col, row, color, validMoves);
      break;
    }
    }

    return validMoves;
  }

  getValidKnightTiles(col, row, color, validMoves) {
    for (let curRow = 1; curRow < 3; curRow++) {
      const curCol = 3 - curRow;

      this.pushToValid(row + curRow, col + curCol, color, validMoves);
      this.pushToValid(row + curRow, col - curCol, color, validMoves);
      this.pushToValid(row - curRow, col - curCol, color, validMoves);
      this.pushToValid(row - curRow, col + curCol, color, validMoves);
    }
  }

  getValidRookTiles(col, row, color, validMoves) {
    const rowArr = [-1, 0, 0, 1];
    const colArr = [0, -1, 1, 0];

    for (let i = 0; i < 4; i++) {
      let curRow = rowArr[i] + row;
      let curCol = colArr[i] + col;

      while (this.pushToValid(curRow, curCol, color, validMoves)) {
        curRow += rowArr[i];
        curCol += colArr[i];
      }
    }
  }

  getValidBishopTiles(col, row, color, validMoves) {
    for (let i = 0; i < 5; i++) {
      const colCounter = (i < 1.5) ? 1 : -1;
      let curCol = col + colCounter;

      const rowCounter = (i % 2) ? 1 : -1;
      let curRow = row + rowCounter;

      while (this.pushToValid(curRow, curCol, color, validMoves)) {
        curCol += colCounter;
        curRow += rowCounter;
      }
    }
  }

  getValidKingTiles(col, row, color, validMoves) {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        this.pushToValid(row + i, col + j, color, validMoves);
      }
    }

    const startRow = color === 'white' ? 0 : 7;

    if (((color === 'white' && this.Castle.includes('K')) ||
      (color === 'black' && this.Castle.includes('k'))) &&
      this.Tiles[startRow][6].getColor() === 'empty' &&
      this.Tiles[startRow][5].getColor() === 'empty') {
      validMoves.push(this.Tiles[startRow][6]);
    }

    if (((color === 'white' && this.Castle.includes('Q')) ||
      (color === 'black' && this.Castle.includes('q'))) &&
      this.Tiles[startRow][1].getColor() === 'empty' &&
      this.Tiles[startRow][2].getColor() === 'empty' &&
      this.Tiles[startRow][3].getColor() === 'empty') {
      validMoves.push(this.Tiles[startRow][2]);
    }
  }

  getValidPawnTiles(col, row, color, validMoves) {
    const distance = (row === 1 || row === 6) ? 3 : 2;
    const direction = color === 'white' ? 1 : -1;

    for (let i = 1; i < distance; i++) {
      const curTile = this.Tiles[row + i * direction][col];

      if (curTile.piece === 'empty') {
        this.pushToValid(row + i * direction, col, color, validMoves);
      } else {
        break;
      }
    }

    this.pushToValidPawn(row + direction, col + 1, color, validMoves);
    this.pushToValidPawn(row + direction, col - 1, color, validMoves);
  }

  pushToValid(row, col, color, validMoves) {
    if (row > 7 || row < 0 || col > 7 || col < 0) {
      return false;
    }
    const tile = this.Tiles[row][col];

    if (tile.getColor() === 'empty') {
      validMoves.push(tile);
      return true;
    } else {
      if (tile.getColor() !== color) {
        validMoves.push(tile);
      }
      return false;
    }
  }

  pushToValidPawn(row, col, color, validMoves) {
    if (row > -1 && row < 8 && col > -1 && col < 8) {
      const tile = this.Tiles[row][col];

      if ('' + tile.row + tile.col === this.Passant) {
        validMoves.push(tile);
      } else if ((tile.getColor() !== 'empty' && tile.getColor() !== color) ||
          '' + tile.row + tile.col === this.Passant) {
        validMoves.push(tile);
      }
    }
  }

  clone() {
    return new ChessLogic(
      this.Tiles.map((row) =>
        row.map((tileInfo) => tileInfo.piece),
      ),
      this.Castle,
      this.Passant,
    );
  }
}

function generateChessBoard(pieceArr) {
  const tiles = [];

  for (let i = 0; i < 8; i++) {
    const curRow = [];
    for (let j = 0; j < 8; j++) {
      curRow.push(new TileInfo(i, j, pieceArr[i][j]));
    }
    tiles.push(curRow);
  }

  return tiles;
}


function emptyArr() {
  const arr = [];

  for (let i = 0; i < 8; i++) {
    const curRow = [];
    for (let j = 0; j < 8; j++) {
      curRow.push(generatePiece(i, j));
    }
    arr.push(curRow);
  }

  return arr;
}

function generatePiece(rowNum, colNum) {
  if (rowNum < 1) {
    switch (Math.abs(7 - 2 * colNum)) {
    case 7:
      return 'whiteRook';
    case 5:
      return 'whiteKnight';
    case 3:
      return 'whiteBishop';
    case 1:
      return colNum === 4 ? 'whiteKing' : 'whiteQueen';
    default:
      return 'empty';
    }
  } else if (rowNum < 2) {
    return 'whitePawn';
  } else if (rowNum < 6) {
    return 'empty';
  } else if (rowNum < 7) {
    return 'blackPawn';
  } else if (rowNum < 8) {
    switch (Math.abs(7 - 2 * colNum)) {
    case 7:
      return 'blackRook';
    case 5:
      return 'blackKnight';
    case 3:
      return 'blackBishop';
    case 1:
      return colNum === 4 ? 'blackKing' : 'blackQueen';
    default:
      return 'empty';
    }
  }
}

class TileInfo {
  constructor(rowNum, colNum, piece = this.generatePiece(rowNum, colNum)) {
    this.row = rowNum;
    this.col = colNum;

    this.piece = piece;
  }

  getColor() {
    return this.piece.substr(0, 5);
  }

  getPiece() {
    return this.piece.substr(5);
  }

  clone() {
    return new TileInfo(this.row, this.col, this.piece);
  }
}

export {ChessLogic, TileInfo};
