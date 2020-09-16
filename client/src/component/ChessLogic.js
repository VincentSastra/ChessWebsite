class ChessLogic {
  constructor(tileArr = emptyArr(), castle = 'KQkq', peasant = '') {
    // Use shallow copy
    this.Tiles = generateChessBoard(tileArr);
    this.Castle = castle;
    this.Peasant = peasant;
  }

  movePiece(row1, col1, row2, col2) {
    const tile = this.Tiles[row1][col1];
    let eaten = 'empty';

    eaten = this.Tiles[row2][col2].getPiece();
    this.Tiles[row2][col2].piece = this.Tiles[row1][col1].piece;

    if (tile.getPiece() === 'Pawn' && '' + row2 + col2 === this.Peasant) {
      eaten = this.Tiles[row1][col2].getPiece();
      this.Tiles[row1][col2].piece = 'empty';
    } else if (tile.getPiece() === 'King') {
      if (Math.abs(col2 - col1) > 1) {
        if (col2 === 2) {
          this.movePiece(row1, 0, row2, 3);
        } else if (col2 === 6) {
          this.movePiece(row1, 7, row2, 5);
        }
      }

      if (tile.getColor() === 'white') {
        this.Castle = this.Castle.replace(/[KQ]/g, '');
      } else if (tile.getColor() === 'black') {
        this.Castle = this.Castle.replace(/[kq]/g, '');
      }
    } else if (tile.getPiece() === 'Rook') {
      if (row1 === 0 && col1 === 0) {
        this.Castle = this.Castle.replace('Q', '');
      } else if (row1 === 0 && col1 === 7) {
        this.Castle = this.Castle.replace('K', '');
      } else if (row1 === 7 && col1 === 0) {
        this.Castle = this.Castle.replace('q', '');
      } else if (row1 === 7 && col1 === 7) {
        this.Castle = this.Castle.replace('k', '');
      }
    }

    this.Peasant = '';

    if (tile.getPiece() === 'Pawn' && Math.abs(row2 - row1) === 2) {
      const direction = tile.getColor() === 'white' ? 1 : -1;
      this.Peasant = '' + (row1 + direction) + col1;
    }
    this.Tiles[row1][col1].piece = 'empty';

    return eaten;
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

      if ('' + tile.row + tile.col === this.Peasant) {
        validMoves.push(tile);
      } else if ((tile.getColor() !== 'empty' && tile.getColor() !== color) ||
          '' + tile.row + tile.col === this.Peasant) {
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
      this.Peasant,
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
