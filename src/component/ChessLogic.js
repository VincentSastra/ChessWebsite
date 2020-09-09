
class ChessLogic {
    constructor() {
        this.Tiles = generateChessBoard()
        this.selected = emptyTile()
        this.turn = "white"
    }

    handleClick(tile) {

        if(this.selected.piece === "empty") {
            if(this.turn === tile.getColor())
            this.highlight(tile)
        } else {
            if (this.movePiece(tile)) this.turn = (this.turn === "white") ? "black" : "white"
        }

    }

    movePiece(tile) {

        let ret = false

        if(tile.type === "highlightTile") {
            tile.piece = this.selected.piece
            this.selected.piece = "empty"
            ret = true
        }
        this.selected = emptyTile()
        this.dehighlight()

        return ret
    }

    highlight(tile) {

        console.log("highlighting " + tile)
        const color = tile.piece.substring(0, 5)
        const piece = tile.piece.substring(5)
        const TileSet = this.Tiles

        this.selected = tile

        const { row, col } = tile

        switch(piece) {

            case("Queen"):

                for (let i = 0; i < 5; i++) {

                    let colCounter = (i < 1.5) ? 1 : -1
                    let curCol = col + colCounter

                    let rowCounter = (i % 2) ? 1 : -1
                    let curRow = row + rowCounter

                    // processTile highlights the tile if the piece can go there
                    // and return true if there is a piece there
                    while(this.processTile(curRow, curCol)) {
                        curCol += colCounter
                        curRow += rowCounter
                    }

                }

            case("Rook"):

                let rowArr = [-1, 0, 0, 1]
                let colArr = [0, -1, 1, 0]

                for(let i = 0; i < 4; i++) {

                    let curRow = rowArr[i] + row
                    let curCol = colArr[i] + col

                    // processTile highlights the tile if the piece can go there
                    // and return true if there is a piece there
                    while (this.processTile(curRow, curCol, color)) {

                        curRow += rowArr[i]
                        curCol += colArr[i]

                    }
                }
                break

            case("Knight"):

                for (let curRow = 1; curRow < 3; curRow++) {

                    let curCol = 3 - curRow

                    // processTile highlights the tile if the piece can go there
                    // and return true if there is a piece there
                    this.processTile(row + curRow, col + curCol, color)
                    this.processTile(row + curRow, col - curCol, color)
                    this.processTile(row - curRow, col - curCol, color)
                    this.processTile(row - curRow, col + curCol, color)

                }
                break

            case("Bishop"):

                for (let i = 0; i < 5; i++) {

                    let colCounter = (i < 1.5) ? 1 : -1
                    let curCol = col + colCounter

                    let rowCounter = (i % 2) ? 1 : -1
                    let curRow = row + rowCounter

                    // processTile highlights the tile if the piece can go there
                    // and return true if there is a piece there
                    while(this.processTile(curRow, curCol, color)) {
                        curCol += colCounter
                        curRow += rowCounter
                    }

                }

                break

            case("King"):

                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        this.processTile(row + i, col + j, color)
                    }
                }

                break

            case("Pawn"):
                const distance = (row === 1 || row === 6) ?  3 : 2
                const direction = color === "white" ? 1 : -1

                for(let i = 1; i < distance; i++) {

                    const curTile = TileSet[row + i * direction][col]

                    if(curTile.piece === "empty") {
                        curTile.highlight()
                    } else {
                        break
                    }

                }

                this.highlightIfEnemy(row + direction, col + 1, color)
                this.highlightIfEnemy(row + direction, col - 1, color)

                break

            default:
                break

        }

    }

    processTile(row, col, color) {

        if(row > 7 || row < 0 || col > 7 || col < 0)
            return false

        const tile = this.Tiles[row][col]

        if (tile.piece.substr(0,5) === "empty") {
            tile.highlight()
            return true
        } else {
            if (tile.piece.substr(0, 5) !== color)
                tile.highlight()
            return false
        }
    }

    highlightIfEnemy(row, col, colour) {
        if(row > -1 && row < 8 && col > -1 && col < 8) {

            const tile = this.Tiles[row][col]

            if (tile.piece !== "empty" && tile.piece.substr(0, 5) !== colour)
                tile.highlight()

        }

    }

    dehighlight() {
        console.log("reset")

        this.Tiles.forEach(row =>
            row.forEach(tile =>
                tile.dehighlight()
            )
        )
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

function emptyTile() {
    return new TileInfo(4, 4)
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
                default:
                    this.piece = "empty"
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
                default:
                    this.piece = "empty"
            }
        }

    }

    getColor() {
        return this.piece.substr(0, 5)
    }

    highlight() {
        this.type="highlightTile"
    }

    dehighlight() {
        this.type = ((this.row + this.col) % 2) ? "LightTile" : "DarkTile"
    }

}

export default ChessLogic;