import React, {Component} from 'react';
import 'antd/dist/antd.less';
import './ChessBoard.less';
import {Modal, Row, Card, List, Button} from 'antd';
import ChessController from './ChessController';
import {Link} from 'react-router-dom';

class ChessBoard extends Component {
  constructor(props) {
    super(props);

    console.log(props.location.state);

    if (props.location.state === undefined) {
      props.location.state = {
        computerOption: 'local',
        playerColor: 'white',
      };
    }

    this.ChessController = new ChessController({
      afterVictoryCallback: this.showVictoryScreen,
      computerOption: props.location.state.computerOption,
      playerColor: props.location.state.playerColor,
    });

    this.state = {
      Blocks: this.ChessController.Blocks,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(block) {
    this.ChessController.handleClick(block);
    this.forceUpdate();

    setTimeout(() => {
      this.ChessController.handleComputerTurn();
      this.forceUpdate();
    }, 1);
  }


  getImagePath(piece) {
    return ''.concat('/pieceImages/', piece, '.png');
  }

  showVictoryScreen(winner) {
    Modal.info({
      title: winner + ' Wins!',
      content: (
        <div>
          <p>Return to main menu for new game</p>
        </div>
      ),
      onOk() {},
    });
  }

  renderBoard() {
    const block = this.state.Blocks.slice(0).reverse().map(
      // Map each block row into an HTML row
      (blockRow) => {
        // Map each block' row's column into an individual HTML button
        const rowContent = blockRow.map( (block) => {
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

  renderMenu() {
    return (
      <Card className="SideMenu">
        <Link to="/">
          <Button block>Return to Main Menu</Button>
        </Link>

        <List
          className="MoveList"
          size="small"
          bordered="true"
          header={<div>Move List</div>}
          dataSource={this.ChessController.moveList}
          renderItem={(item) => (
            <List.Item style={{marginBottom: '0px'}}>
              <p className="SmallFont">{item}</p>
            </List.Item>
          )}
        />
      </Card>
    );
  }

  render() {
    const board = this.renderBoard();
    const menu = this.renderMenu();

    return (
      <Row className="Centered">
        {board}
        {menu}
      </Row>
    );
  }
}

export default ChessBoard;
