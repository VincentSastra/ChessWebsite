class ChessLogic {
  constructor(tileArr = emptyArr()) {
    // Use shallow copy
    this.Tiles = generateChessBoard(tileArr);
  }

  movePiece(row1, col1, row2, col2) {
    this.Tiles[row2][col2].piece = this.Tiles[row1][col1].piece;
    this.Tiles[row1][col1].piece = 'empty';
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

      this.addIfEnemy(row + direction, col + 1, color, validMoves);
      this.addIfEnemy(row + direction, col - 1, color, validMoves);

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

  addIfEnemy(row, col, colour, validMoves) {
    if (row > -1 && row < 8 && col > -1 && col < 8) {
      const tile = this.Tiles[row][col];

      if (tile.getColor() !== 'empty' && tile.getColor() !== colour) {
        validMoves.push(tile);
      }
    }
  }

  clone() {
    return new ChessLogic(
      this.Tiles.map((row) =>
        row.map((tileInfo) => tileInfo.piece),
      ),
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
