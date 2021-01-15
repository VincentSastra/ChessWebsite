// Use link and Hooks
import React from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Menu.less';

function MenuCard(props) {
  return (
    <Col className="MenuCard">
      <Link to={{
        pathname: '/play',
        state: {option: props.option},
      }} style={{textDecoration: 'inherit', color: 'inherit'}}>
        <Card component>
          <Card.Img variant="top" src={props.img} />
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

function ChoiceCard(props) {
  return (
    <Col className="MenuCard">
      <Card>
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
        </Card.Body>
      </Card>

      <div className="Underneath">
        <Row className="Row">
          <Link className="Link" to={{
            pathname: '/play',
            state: {computerOption: props.computerOption,
              playerColor: 'white'},
          }} style={{textDecoration: 'inherit', color: 'inherit'}}>
            <Card className="Choice">
              <Card.Img variant="top" src={'menu/white.jpg'} />
              <Card.Body>
                <Card.Title>Play as White'</Card.Title>
              </Card.Body>
            </Card>
          </Link>

          <Link className="Link" to={{
            pathname: '/play',
            state: {computerOption: props.computerOption,
              playerColor: 'black'},
          }} style={{textDecoration: 'inherit', color: 'inherit'}}>
            <Card className="Choice">
              <Card.Img variant="top" src={'menu/black.jpg'} />
              <Card.Body>
                <Card.Title>'Play as Black'</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Row>
      </div>
    </Col>
  );
}

function Menu() {
  return (
    <Row className="Centered">
      <MenuCard
        option={'local'}
        img={'menu/local.jpg'}
        title={'Local Multiplayer'}
      />

      <ChoiceCard
        computerOption={'computer'}
        img={'menu/computer.jpg'}
        title={'Versus Computer'}
      />
    </Row>
  );
}

export default Menu;
