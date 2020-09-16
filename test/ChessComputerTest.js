import {generateMoveMinMax} from '../server/services/ChessComputer';
const {ChessLogic} = require('../client/src/component/ChessLogic');

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
    ChessBoard.Tiles[2][1].piece = 'whiteRook';
    ChessBoard.Tiles[2][5].piece = 'blackRook';

    expect(generateMoveMinMax(ChessBoard, 'white', 1)
      .futureMove).toBe('2125');
  });

  // FEN notation '5Q2/8/8/8/2K2r2/8/8/8'
  test('Rook choose kill King or Queen', () => {
    const ChessBoard = new ChessLogic(emptyTileSet);
    ChessBoard.Tiles[3][2].piece = 'whiteKing';
    ChessBoard.Tiles[3][5].piece = 'blackRook';
    ChessBoard.Tiles[7][5].piece = 'whiteQueen';

    expect(generateMoveMinMax(ChessBoard, 'black', 2)
      .futureMove.substr(0, 4))
      .toBe('3532');
  });

  // FEN notation '8/5B2/8/8/8/1R3r2/8/8'
  test('Rook chooses guarded rook vs bishop', () => {
    const ChessBoard = new ChessLogic(emptyTileSet);
    ChessBoard.Tiles[3][2].piece = 'whiteRook';
    ChessBoard.Tiles[3][5].piece = 'blackRook';
    ChessBoard.Tiles[6][5].piece = 'whiteBishop';

    expect(generateMoveMinMax(ChessBoard, 'black', 2)
      .futureMove.substr(0, 4))
      .toBe('3565');
  });

  // FEN notation '8/5B2/8/8/8/1R3r2/8/8'
  test('Rook chooses guarded rook vs bishop only 1 loop', () => {
    const ChessBoard = new ChessLogic(emptyTileSet);
    ChessBoard.Tiles[3][2].piece = 'whiteRook';
    ChessBoard.Tiles[3][5].piece = 'blackRook';
    ChessBoard.Tiles[6][5].piece = 'whiteBishop';

    expect(generateMoveMinMax(ChessBoard, 'black', 1)
      .futureMove.substr(0, 4))
      .toBe('3532');
  });

  // Fen notation '1r2r1k1/5ppp/8/8/Q7/8/8/4R3'
  test('Checkmate in 3', () => {
    const ChessBoard = new ChessLogic(emptyTileSet);
    ChessBoard.Tiles[6][5].piece = 'blackPawn';
    ChessBoard.Tiles[6][6].piece = 'blackPawn';
    ChessBoard.Tiles[6][7].piece = 'blackPawn';
    ChessBoard.Tiles[7][4].piece = 'blackRook';
    ChessBoard.Tiles[7][2].piece = 'blackRook';
    ChessBoard.Tiles[7][6].piece = 'blackKing';

    ChessBoard.Tiles[3][0].piece = 'whiteQueen';
    ChessBoard.Tiles[0][4].piece = 'whiteRook';

    expect(generateMoveMinMax(ChessBoard, 'white', 5)
      .futureValue)
      .toBeGreaterThan(1000);
  });

  test('En Passant', () => {
    const ChessBoard = new ChessLogic(emptyTileSet);
    ChessBoard.Tiles[4][5].piece = 'blackPawn';
    ChessBoard.Tiles[4][6].piece = 'whitePawn';
    ChessBoard.Peasant = '55';

    expect(generateMoveMinMax(ChessBoard, 'white', 1)
      .futureMove)
      .toBe('4655');
  });

  test('Standard for Runtime', () => {
    const ChessBoard = new ChessLogic();
    generateMoveMinMax(ChessBoard, 'white', 4);
  });
});
