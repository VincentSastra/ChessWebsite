const pieceValue = {
  'Queen': 90,
  'King': 200,
  'Rook': 50,
  'Knight': 30,
  'Bishop': 30,
  'Pawn': 10,
  '': 0,
};

// Time complexity is O(2^n)
export function generateMoveMinMax(board, turn, recursiveCall) {
  if (recursiveCall === 0) {
    const futureValue = 0;
    const futureMove = '';

    return {futureMove, futureValue};
  }

  const nextTurn = turn === 'white' ? 'black' : 'white';

  // Make sure that the HTML request couldn't do too processing power
  recursiveCall = Math.min(recursiveCall, 5);

  let optimalMove = '';
  let optimalValue = -1;


  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = board.Tiles[row][col];

      if (tile.piece.substr(0, 5) === turn) {
        board.getValidTiles(row, col).forEach((validTile) => {
          const nextBoard = board.clone();

          nextBoard.movePiece(row, col, validTile.row, validTile.col);

          const {futureMove, futureValue} = generateMoveMinMax(nextBoard,
            nextTurn, recursiveCall - 1);

          const curValue = pieceValue[board.Tiles[validTile.row][validTile.col]
            .piece.substr(5)];

          if (curValue - futureValue > optimalValue) {
            optimalValue = curValue - futureValue;

            // eslint-disable-next-line max-len
            optimalMove = '' + row + col + validTile.row + validTile.col + futureMove;
          }
        });
      }
    }
  }
  return {futureMove: optimalMove, futureValue: optimalValue};
}
