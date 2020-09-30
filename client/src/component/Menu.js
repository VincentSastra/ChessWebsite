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

function Menu() {
  return (
    <Row className="Centered">
      <MenuCard
        option={'local'}
        img={'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'}
        title={'Local Multiplayer'}
      />

      <MenuCard
        option={'computer'}
        img={'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'}
        title={'Versus Computer'}
      />
    </Row>
  );
}

export default Menu;