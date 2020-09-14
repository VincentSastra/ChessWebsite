import {generateMoveMinMax} from '../server/services/ChessComputer';
const {ChessLogic} = require('../server/services/ChessLogic');

describe('Min Max method', () => {
  const emptyTileSet = [];

  for (let i = 0; i < 8; i++) {
    const tileRow = [];
    for (let j = 0; j < 8; j++) {
      tileRow.push('empty');
    }
    emptyTileSet.push(tileRow);
  }

  test('Free Take', () => {
    const ChessBoard = new ChessLogic(emptyTileSet);
    ChessBoard.Tiles[2][1] = 'whiteRook';
    ChessBoard.Tiles[2][5] = 'blackRook';

    expect(generateMoveMinMax(ChessBoard.getPieceArray(), 'white', 1)
      .futureMove).toBe('2125');
  });

  // FEN notation '5Q2/8/8/8/2K2r2/8/8/8'
  test('Rook choose kill King or Queen', () => {
    const ChessBoard = new ChessLogic(emptyTileSet);
    ChessBoard.Tiles[3][2] = 'whiteKing';
    ChessBoard.Tiles[3][5] = 'blackRook';
    ChessBoard.Tiles[7][5] = 'whiteQueen';

    expect(generateMoveMinMax(ChessBoard.getPieceArray(), 'black', 2)
      .futureMove.substr(0, 4))
      .toBe('3532');
  });

  // FEN notation '8/5B2/8/8/8/1R3r2/8/8'
  test('Rook chooses guarded rook vs bishop', () => {
    const ChessBoard = new ChessLogic(emptyTileSet);
    ChessBoard.Tiles[3][2] = 'whiteRook';
    ChessBoard.Tiles[3][5] = 'blackRook';
    ChessBoard.Tiles[6][5] = 'whiteBishop';

    expect(generateMoveMinMax(ChessBoard.getPieceArray(), 'black', 2)
      .futureMove.substr(0, 4))
      .toBe('3565');
  });

  // FEN notation '8/5B2/8/8/8/1R3r2/8/8'
  test('Rook chooses guarded rook vs bishop only 1 loop', () => {
    const ChessBoard = new ChessLogic(emptyTileSet);
    ChessBoard.Tiles[3][2] = 'whiteRook';
    ChessBoard.Tiles[3][5] = 'blackRook';
    ChessBoard.Tiles[6][5] = 'whiteBishop';

    expect(generateMoveMinMax(ChessBoard.getPieceArray(), 'black', 1)
      .futureMove.substr(0, 4))
      .toBe('3532');
  });
});
