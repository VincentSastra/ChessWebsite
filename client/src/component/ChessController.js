import {ChessLogic} from './ChessLogic';
const io = require('socket.io-client');

class ChessController {
  constructor() {
    this.ChessLogic = new ChessLogic();
    this.Blocks = this.generateBlocks();
    this.turn = 'white';
    this.socket = io('https://localhost:3000');

    this.emptyBlock = 'empty';
    this.selected = this.emptyBlock;
  }

  handleClick(block) {
    console.log('h');
    if (this.selected === 'empty' ||
      this.selected.getPiece() === 'empty') {
      if (this.turn === block.getColor()) {
        this.highlight(block);
        this.selected = block;
      }
    } else if (this.movePiece(block)) {
      this.turn = (this.turn === 'white') ? 'black' : 'white';
    }
  }

  movePiece(block) {
    let ret = false;

    if (block.type === 'HighlightBlock') {
      this.ChessLogic.movePiece(this.selected.row, this.selected.col,
        block.row, block.col);

      ret = true;
    }
    this.selected = this.emptyBlock;
    this.unhighlight();

    return ret;
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
