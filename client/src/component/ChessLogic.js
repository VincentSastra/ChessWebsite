class ChessLogic {
  constructor(tileArr = emptyArr(), castle = 'KQkq', peasant = '') {
    // Use shallow copy
    this.Tiles = generateChessBoard(tileArr);
    this.Castle = castle;
    this.Winner = 'none';
    this.Passant = peasant;
  }

  movePiece(sourceRow, sourceCol, destRow, destCol, promotion = 'Queen') {
    const sourceTile = this.Tiles[sourceRow][sourceCol];

    let eaten = this.Tiles[destRow][destCol].getPiece();

    if (eaten === 'King') {
      this.Winner = this.Tiles[destRow][destCol].getColor() === 'white' ?
        'Black' : 'White';
    }

    this.Tiles[destRow][destCol].piece = this.Tiles[sourceRow][sourceCol].piece;

    if (sourceTile.getPiece() === 'Pawn') {
      if ('' + destRow + destCol === this.Passant) {
        eaten = this.Tiles[sourceRow][destCol].getPiece();
        this.Tiles[sourceRow][destCol].piece = 'empty';
      } else if (destRow === 0 || destRow === 7) {
        this.Tiles[destRow][destCol].piece = sourceTile.getColor() + promotion;
      }
    } else if (sourceTile.getPiece() === 'King') {
      if (Math.abs(destCol - sourceCol) > 1) {
        if (destCol === 2) {
          this.movePiece(sourceRow, 0, destRow, 3);
        } else if (destCol === 6) {
          this.movePiece(sourceRow, 7, destRow, 5);
        }
      }

      if (sourceTile.getColor() === 'white') {
        this.Castle = this.Castle.replace(/[KQ]/g, '');
      } else if (sourceTile.getColor() === 'black') {
        this.Castle = this.Castle.replace(/[kq]/g, '');
      }
    } else if (sourceTile.getPiece() === 'Rook') {
      if (sourceRow === 0 && sourceCol === 0) {
        this.Castle = this.Castle.replace('Q', '');
      } else if (sourceRow === 0 && sourceCol === 7) {
        this.Castle = this.Castle.replace('K', '');
      } else if (sourceRow === 7 && sourceCol === 0) {
        this.Castle = this.Castle.replace('q', '');
      } else if (sourceRow === 7 && sourceCol === 7) {
        this.Castle = this.Castle.replace('k', '');
      }
    }

    this.Passant = '';

    // Set the en passant square
    if (sourceTile.getPiece() === 'Pawn' &&
      Math.abs(destRow - sourceRow) === 2) {
      const direction = sourceTile.getColor() === 'white' ? 1 : -1;
      this.Passant = '' + (sourceRow + direction) + sourceCol;
    }

    sourceTile.piece = 'empty';

    return eaten;
  }

  getWinner() {
    return this.Winner;
  }

  getPiece(row, col) {
    return this.Tiles[row][col].getPiece();
  }

  getValidTiles(row, col) {
    const TileSet = this.Tiles;
    const tile = TileSet[row][col];

    const color = tile.getColor();
    const piece = tile.getPiece();

    const validMoves = [];

    switch (piece) {
    case ('Queen'):

      for (let i = 0; i < 5; i++) {
        const colCounter = (i < 1.5) ? 1 : -1;
        let curCol = col + colCounter;

        const rowCounter = (i % 2) ? 1 : -1;
        let curRow = row + rowCounter;

        // processTile highlights the tile if the piece can go there
        // and return true if there is a piece there
        while (this.processTile(curRow, curCol, color, validMoves)) {
          curCol += colCounter;
          curRow += rowCounter;
        }
      }

      // no breaks so it also acts as a rook
      // eslint-disable-next-line no-fallthrough
    case ('Rook'): {
      const rowArr = [-1, 0, 0, 1];
      const colArr = [0, -1, 1, 0];

      for (let i = 0; i < 4; i++) {
        let curRow = rowArr[i] + row;
        let curCol = colArr[i] + col;

        // processTile highlights the tile if the piece can go there
        // and return true if there is a piece there
        while (this.processTile(curRow, curCol, color, validMoves)) {
          curRow += rowArr[i];
          curCol += colArr[i];
        }
      }
      break;
    }
    case ('Knight'): {
      for (let curRow = 1; curRow < 3; curRow++) {
        const curCol = 3 - curRow;

        // processTile highlights the tile if the piece can go there
        // and return true if there is a piece there
        this.processTile(row + curRow, col + curCol, color, validMoves);
        this.processTile(row + curRow, col - curCol, color, validMoves);
        this.processTile(row - curRow, col - curCol, color, validMoves);
        this.processTile(row - curRow, col + curCol, color, validMoves);
      }
      break;
    }

    case ('Bishop'): {
      for (let i = 0; i < 5; i++) {
        const colCounter = (i < 1.5) ? 1 : -1;
        let curCol = col + colCounter;

        const rowCounter = (i % 2) ? 1 : -1;
        let curRow = row + rowCounter;

        while (this.processTile(curRow, curCol, color, validMoves)) {
          curCol += colCounter;
          curRow += rowCounter;
        }
      }

      break;
    }
    case ('King'): {
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          this.processTile(row + i, col + j, color, validMoves);
        }
      }

      const startRow = color === 'white' ? 0 : 7;

      if (((color === 'white' && this.Castle.includes('K')) ||
          (color === 'black' && this.Castle.includes('k'))) &&
          TileSet[startRow][6].getColor() === 'empty' &&
          TileSet[startRow][5].getColor() === 'empty') {
        validMoves.push(TileSet[startRow][6]);
      }

      if (((color === 'white' && this.Castle.includes('Q')) ||
        (color === 'black' && this.Castle.includes('q'))) &&
        TileSet[startRow][1].getColor() === 'empty' &&
        TileSet[startRow][2].getColor() === 'empty' &&
        TileSet[startRow][3].getColor() === 'empty') {
        validMoves.push(TileSet[startRow][2]);
      }

      break;
    }

    case ('Pawn'): {
      const distance = (row === 1 || row === 6) ? 3 : 2;
      const direction = color === 'white' ? 1 : -1;

      for (let i = 1; i < distance; i++) {
        const curTile = TileSet[row + i * direction][col];

        if (curTile.piece === 'empty') {
          this.processTile(row + i * direction, col, color, validMoves);
        } else {
          break;
        }
      }

      this.processTilePawn(row + direction, col + 1, color, validMoves);
      this.processTilePawn(row + direction, col - 1, color, validMoves);

      break;
    }

    default:
      break;
    }

    return validMoves;
  }

  processTile(row, col, color, validMoves) {
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

  processTilePawn(row, col, color, validMoves) {
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
