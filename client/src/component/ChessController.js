import {ChessLogic} from './ChessLogic';
import {generateMoveMinMax} from './ChessComputer';

class ChessController {
  constructor(showVictoryScreen = () => {}) {
    this.ChessLogic = new ChessLogic();
    this.Blocks = this.generateBlocks();
    this.turn = 'white';
    this.socket = io('https://localhost:3000');

    this.emptyBlock = 'empty';
    this.selectedBlock = this.emptyBlock;

    this.moveList = [];

    this.aftermatch = false;
    this.showVictoryScreen = showVictoryScreen;
  }

  handleClick(block) {
    if (this.turn !== this.playerColor && this.computerOption === 'computer') {
      return;
    }

    if (this.selectedBlock === 'empty' ||
      this.selectedBlock.getPiece() === 'empty') {
      if (this.turn === block.getColor()) {
        this.highlight(block);
        this.selectedBlock = block;
      }
    } else if (this.movePiece(block)) {
      this.turn = (this.turn === 'white') ? 'black' : 'white';

      this.recordMove(block.getPiece().substr(5), block.row, block.col);

      this.checkWinner();
    }
  }

  handleComputerTurn() {
    if (this.turn === this.playerColor || this.computerOption !== 'computer') {
      return;
    }

    // Take the computer future move and map it to int array
    const moveArr = generateMoveMinMax(this.ChessLogic, this.turn, 3)
      .futureMove.split``.map((x)=>+x);

    this.recordMove(this.ChessLogic.getPiece(moveArr[0], moveArr[1]),
      moveArr[2], moveArr[3]);

    this.ChessLogic.movePiece(moveArr[0], moveArr[1], moveArr[2], moveArr[3]);

    this.turn = (this.turn === 'white') ? 'black' : 'white';

    this.checkWinner();
  }

  recordMove(piece, destRow, destCol) {
    this.moveList.push(
      (this.moveList.length + 1) + '. \t' +
      piece +
      ' move to ' +
      String.fromCharCode(destCol + 65) +
      (destRow + 1));
  }

  checkWinner() {
    if (this.ChessLogic.getWinner() !== 'none' && !this.aftermatch) {
      this.aftermatch = true;
      this.showVictoryScreen(this.ChessLogic.getWinner());
    }
  }

  movePiece(block) {
    let validMove = false;

    if (block.type === 'HighlightBlock') {
      this.ChessLogic.movePiece(this.selectedBlock.row, this.selectedBlock.col,
        block.row, block.col);

      validMove = true;
    }
    this.selectedBlock = this.emptyBlock;
    this.unhighlight();

    return validMove;
  }

  highlight(block) {
    this.ChessLogic.getValidTiles(block.row, block.col).forEach( (tile) =>
      this.getBlock(tile).highlight(),
    );
  }

  unhighlight() {
    this.Blocks.forEach( (blockRow) =>
      blockRow.forEach( (block) => block.unhighlight(),
      ),
    );
  }

  generateBlocks() {
    const blocks = [];
    for (let row = 0; row < 8; row++) {
      const Row = [];
      for (let col = 0; col < 8; col++) {
        Row.push(new Block(row, col, this.ChessLogic.Tiles[row][col]));
      }
      blocks.push(Row);
    }

    return blocks;
  }

  getBlock(tile) {
    return this.Blocks[tile.row][tile.col];
  }
}

class Block {
  constructor(row, col, tile) {
    this.row = row;
    this.col = col;
    this.tile = tile;
    this.unhighlight();
  }

  highlight() {
    this.type = 'HighlightBlock';
  }

  unhighlight() {
    this.type = (this.row + this.col) % 2 ? 'LightBlock' : 'DarkBlock';
  }

  getColor() {
    return this.tile.getColor();
  }

  getPiece() {
    return this.tile.getColor() + this.tile.getPiece();
  }
}

export default ChessController;
