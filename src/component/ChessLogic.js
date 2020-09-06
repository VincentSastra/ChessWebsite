
class ChessLogic {
    constructor() {
        this.Tiles = generateChessBoard()
    }
}

function generateChessBoard() {

    let tiles = []

    for (let i = 0; i < 8; i++) {
        const curRow = []
        for (let j = 0; j < 8; j++) {
            curRow.push(new TileInfo(i, j))
        }
        tiles.push(curRow)
    }

    return tiles

}

class TileInfo {

    constructor(rowNum, colNum) {
        this.row = rowNum;
        this.col = colNum;
        this.type = ((rowNum + colNum) % 2) ? "LightTile" : "DarkTile";

        if (rowNum < 1) {
            switch (Math.abs(7 - 2 * colNum)) {
                case 7:
                    this.piece = "whiteRook"
                    break
                case 5:
                    this.piece = "whiteKnight"
                    break
                case 3:
                    this.piece = "whiteBishop"
                    break
                case 1:
                    this.piece = colNum === 4 ? "whiteKing" : "whiteQueen"
                    break
            }
        } else if (rowNum < 2) {
            this.piece = "whitePawn"
        } else if (rowNum < 6) {
            this.piece = "empty"
        } else if (rowNum < 7) {
            this.piece = "blackPawn"
        } else if (rowNum < 8) {
            switch (Math.abs(7 - 2 * colNum)) {
                case 7:
                    this.piece = "blackRook"
                    break
                case 5:
                    this.piece = "blackKnight"
                    break
                case 3:
                    this.piece = "blackBishop"
                    break
                case 1:
                    this.piece = colNum === 4 ? "blackKing" : "blackQueen"
                    break
            }
        }

    }

    changePiece(piece) {
        this.piece = piece;
    }

}

export default ChessLogic;