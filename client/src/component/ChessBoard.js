import React, {Component} from 'react';
import 'antd/dist/antd.less';
import './ChessBoard.less';
import {Row} from 'antd';
import ChessController from './ChessController';

class ChessBoard extends Component {
  constructor(props) {
    super(props);

    this.ChessController = new ChessController();
    this.state = {
      Blocks: this.ChessController.Blocks,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(block) {
    this.ChessController.handleClick(block);
    this.forceUpdate();
  }

  getImagePath(piece) {
    return ''.concat('pieceImages/', piece, '.png');
  }

  render() {
    const block = this.state.Blocks.slice(0).reverse().map(
      // Map each block row into an HTML row
      (blockRow, row) => {
        // Map each block' row's column into an individual HTML button
        const rowContent = blockRow.map( (block, col) => {
          return (
            <div
              key={block.col + block.row * 8}
              onClick={this.handleClick.bind(this, block)}
              className={block.type}>

              {block.getPiece() === 'empty' ? null :
                <img
                  src={this.getImagePath(block.getPiece())}
                  className={block.type + 'Piece'}
                  alt={block.getPiece()}
                />}

            </div>
          );
        });

        return (
          <Row key={rowContent[0].key / 8}>{rowContent}</Row>
        );
      },
    );

    return (
      <div className="Square">{block}</div>
    );
  }
}

export default ChessBoard;
