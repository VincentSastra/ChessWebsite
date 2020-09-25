import {ChessLogic} from './ChessLogic';
const io = require('socket.io-client');

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
    if (this.selectedBlock === 'empty' ||
      this.selectedBlock.getPiece() === 'empty') {
      if (this.turn === block.getColor()) {
        this.highlight(block);
        this.selectedBlock = block;
      }
    } else if (this.movePiece(block)) {
      this.turn = (this.turn === 'white') ? 'black' : 'white';

      this.moveList.push(
        (this.moveList.length + 1) + '. \t' +
        block.getPiece().substr(5) +
        ' move to ' +
        String.fromCharCode(block.col + 65) +
        (block.row + 1));
    }

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
