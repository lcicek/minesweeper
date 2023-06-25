import { num_bombs, x, y } from "./parameters.js"
import { randInt } from "./utility.js"
import { Square } from "./square.js"

export class Board {
    constructor() {
        this.x = x
        this.y = y
        this.board = []
    }

    fill() {
        for (let i = 0; i < this.x; i++) {
            let row = []

            for (let j = 0; j < this.y; j++) {
                let val = randInt() <= num_bombs ? -1 : 0
                row.push(new Square(i, j, val))
            }
                
            this.board.push(row)
        }

    }

    number() {
        for (let i = 0; i < this.x; i++) {
            for (let j = 0; j < this.y; j++) {
                if (this.board[i][j].isBomb()) {
                    this.getNeighbors(i, j).forEach(sq => sq.inc()) // increment all neighbors (i.e. updating bomb_count)
                }
            }
        }
    }

    inBounds(i, j) {
        return !(i < 0 || j < 0 || i >= this.x || j >= this.y)
    }

    getNeighbors(i, j) { // returns all non-bomb neighbors of a given square
        let n = []

        for (let a = i-1; a <= i+1; a++) {
            for (let b = j-1; b <= j+1; b++) {
                if (!(a == i && b == j) && this.inBounds(a, b) && !(this.board[a][b].isBomb())) {
                    n.push(this.board[a][b])
                }
            }
        }

        return n
    }

    gameWon() { // returns true if all non-bomb squares are revealed
        for (let i = 0; i < this.x; i++) {
            for (let j = 0; j < this.y; j++) {
                let sq = this.board[i][j]
                if (!sq.isBomb() && sq.hidden) return false
            }
        }
        
        return true
    }
}