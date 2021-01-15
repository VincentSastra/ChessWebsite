import React, {Component} from 'react';
import 'antd/dist/antd.less';
import './ChessBoard.less';
import {Card, List} from 'antd';
import {Row, Col, Container, Button, Modal} from 'react-bootstrap';
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

    this.showVictoryScreen = (winner) => {
      this.setState({
        modalShow: true,
        winner: winner,
      });
    };

    this.ChessController = new ChessController({
      afterVictoryCallback: this.showVictoryScreen,
      computerOption: props.location.state.computerOption,
      playerColor: props.location.state.playerColor,
    });

    this.state = {
      Blocks: this.ChessController.Blocks,
      winner: 'White',
      modalShow: false,
      closeModal: () => this.setState({modalShow: false}),
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

  renderBoard() {
    const block = this.state.Blocks.slice(0).reverse().map(
      // Map each block row into an HTML row
      (blockRow) => {
        // Map each block' row's column into an individual HTML button
        const rowContent = blockRow.map((block) => {
          return (
            <Col
              key={block.col + block.row * 8}
              onClick={this.handleClick.bind(this, block)}
              className={block.type}>

              {block.getPiece() === 'empty' ? null :
                <img
                  src={this.getImagePath(block.getPiece())}
                  className={block.type + 'Piece'}
                  alt={block.getPiece()}
                />}

            </Col>
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

  // TOOD: OnHide should have a better function
  renderVictoryModal() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.state.modalShow}
        onHide={()=>{}}
      >
        <Modal.Body>
          <h4>{this.state.winner} Wins!</h4>
          <p>
            Return to the main menu for a new game.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.state.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const board = this.renderBoard();
    const menu = this.renderMenu();
    const victoryModal = this.renderVictoryModal();

    return (
      <Container className="Centered">
        {victoryModal}
        {board}
        {menu}
      </Container>
    );
  }
}

export default ChessBoard;
