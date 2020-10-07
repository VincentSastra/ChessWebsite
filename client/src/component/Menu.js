// Use link and Hooks
import React from 'react';
import {Card, Row} from 'antd';
import {Link} from 'react-router-dom';
import './Menu.less';

function MenuCard(props) {
  return (
    <div className="MenuCard">
      <Link to={{
        pathname: '/play',
        state: {option: props.option},
      }}>
        <Card
          cover={
            <img
              alt={props.title}
              src={props.img}
            />
          }
        >
          <Card.Meta
            title={props.title}
          />
        </Card>
      </Link>
    </div>
  );
}

function ChoiceCard(props) {
  return (
    <div className="MenuCard">
      <Card className="HideOnHover"
        cover={
          <img
            alt={props.title}
            src={props.img}
          />
        }
      >
        <Card.Meta
          title={props.title}
        />
      </Card>

      <div className="Underneath">
        <Row className="Row">
          <Link to={{
            pathname: '/play',
            state: {computerOption: props.computerOption,
              playerColor: 'white'},
          }}>
            <Card className="Choice"
              bordered={true}
              cover={
                <img
                  alt={props.title}
                  src={props.img}
                />
              }
            >
              <Card.Meta
                title="Play as White"
              />
            </Card>
          </Link>

          <Link to={{
            pathname: '/play',
            state: {computerOption: props.computerOption,
              playerColor: 'black'},
          }}>
            <Card className="Choice"
              bordered={true}
              cover={
                <img
                  alt={props.title}
                  src={props.img}
                />
              }
            >
              <Card.Meta
                title="Play as Black"
              />
            </Card>
          </Link>
        </Row>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <Row className="Centered">
      <MenuCard
        option={'local'}
        img={'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'}
        title={'Local Multiplayer'}
      />

      <ChoiceCard
        computerOption={'computer'}
        img={'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'}
        title={'Versus Computer'}
      />
    </Row>
  );
}

export default Menu;
