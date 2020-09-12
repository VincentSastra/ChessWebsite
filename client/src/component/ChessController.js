import ChessLogic from './ChessLogic';
const io = require('socket.io-client');

class ChessController {
  constructor() {
    this.ChessLogic = new ChessLogic();
    this.Blocks = this.generateBlocks();
    this.turn = 'white';
    //    this.socket = io('https://localhost:3000');

    this.emptyBlock = null;
    this.selected = this.emptyBlock;

    //    this.socket.on('message', (data) => {
    //      console.log(data);
    //    });
  }

  handleClick(block) {
    console.log('h');
    if (this.selected === null ||
      this.selected.getPiece() === 'empty') {
      this.selected = block;
      console.log('he');

      if (this.turn === block.getColor()) {
        console.log('hel');

        this.highlight(block);
      }
    } else if (this.movePiece(block)) {
      console.log('hell');

      this.turn = (this.turn === 'white') ? 'black' : 'white';
    }
  }

  movePiece(block) {
    let ret = false;
    console.log(block.type);

    if (block.type === 'HighlightBlock') {
      this.ChessLogic.movePiece(this.selected.row, this.selected.col, block.row, block.col);
      console.log('hello');
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
    return this.tile.piece.substr(0, 5);
  }

  getPiece() {
    return this.tile.piece;
  }
}

export default ChessController;
