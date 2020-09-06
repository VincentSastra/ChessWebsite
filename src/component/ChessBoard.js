import React, { Component } from 'react';
import 'antd/dist/antd.less';
import './ChessBoard.less';
import { Row } from "antd";
import ChessLogic from "./ChessLogic";

class ChessBoard extends Component {

    constructor(props) {
        super(props);

        this.state = new ChessLogic();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(tile) {
        tile.piece = "blackPawn"
        this.forceUpdate()
    }

    render() {

        let tiles = this.state.Tiles.slice(0).reverse().map(
            // Map each tiles row into an HTML row
            row => {
                // Map each tiles' row's column into an indivual HTML button
                let rowContent = row.map( tile => {

                    return (
                        <div
                            key={tile.col + tile.row * 8}
                            onClick={this.handleClick.bind(this, tile)}
                            className={tile.type}>

                            {tile.piece === "empty" ? null :
                                <img
                                    src={''.concat("pieceImages/", tile.piece, ".png")}
                                    className={tile.type + "Piece"}
                                    alt={'piece'}
                                />}

                        </div>
                    )

                })

                return (
                    <Row key={rowContent[0].key / 8}>{rowContent}</Row>
                )
            }
        )

        return (
            <div className="Square">{tiles}</div>
        )};

}

export default ChessBoard;
