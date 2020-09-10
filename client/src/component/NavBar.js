import React, {Component} from 'react';
import {Menu} from 'antd';
import 'antd/dist/antd.less';

class NavBar extends Component {
    state = {
        current: 'home',
    };

    handleClick = (e) => {
        console.log('click ', e);
        // eslint-disable-next-line no-invalid-this
        this.setState({current: e.key});
    };

    render() {
        const {current} = this.state;
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[current]}
                mode="horizontal"
            >
                <Menu.Item key="home">
                    home
                </Menu.Item>
                <Menu.Item key="login">
                    login
                </Menu.Item>
            </Menu>
        );
    }
}

export default NavBar;
