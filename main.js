class Square {
    constructor(i, j, val, hidden=true, flag=false) {
        this.i = i
        this.j = j
        this.val = val
        this.hidden = hidden
        this.flag = flag

        this.button = document.createElement("button")
        this.button.i = i
        this.button.j = j
        this.button.style.color = "transparent"
        this.button.style.opacity = i % 2 == 0 && j % 2 == 0 || i % 2 != 0 && j % 2 != 0 ? "calc(0.95)" : "calc(1)"
    }

    unhide() {
        if (this.hidden) {
            this.hidden = false

            let color = -1; 

            switch(this.val) {
                case 0: 
                    color = "transparent"
                    break
                case 1: 
                    color = "blue"
                    break
                case 2: 
                    color = "green"
                    break
                case 3: 
                    color = "darkred"
                    break
                case 4: 
                    color = "purple"
                    break
                case 5: 
                    color = "yellow"
                    break
                case 6: 
                    color = "cyan"
                    break
                case 7: 
                    color = "orange"
                    break
                case 8: 
                    color = "black"
                    break
                default: color = "black"
            }

            this.button.style.color = color
            this.button.style.backgroundColor = "rgb(219, 164, 127)"
        }
    }

    setFlag() {
        if (!this.hidden) this.flag = True
    }

    inc() {
        this.val += 1
        this.button.textContent = this.val
    }

    isBomb() {
        return this.val < 0
    }
}

class Board {
    constructor() {
        this.x = 18
        this.y = 28
        this.board = []
    }

    fill() {
        for (let i = 0; i < this.x; i++) {
            let row = []

            for (let j = 0; j < this.y; j++) {
                let val = Math.floor(Math.random() * 10) <= 1 ? -1 : 0
                let sq = new Square(i, j, val)
                row.push(sq)
            }
                
            this.board.push(row)
        }

    }

    number() {
        for (let i = 0; i < this.x; i++) {
            for (let j = 0; j < this.y; j++) {
                if (this.board[i][j].val == -1) {
                    this.getNeighbors(i, j).forEach(sq => sq.inc())
                }
            }
        }
    }

    inBounds(i, j) {
        return !(i < 0 || j < 0 || i >= this.x || j >= this.y)
    }

    getNeighbors(i, j) {
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
}

function cascadeZeroes(square) {
    if (square.val == 0) square.unhide()

    let neighbors = board.getNeighbors(square.i, square.j)

    neighbors.forEach(sq => {
        if (square.val == 0 && sq.val != 0) { // if center square is zero, all neighbors will be revealed
            sq.unhide()
        }

        if (sq.val == 0 && sq.hidden) { // if one of the neighbors is a new zero, repeat procedure
            cascadeZeroes(sq)
        }
    })
}

function reveal(button) {
    let square = board.board[button.i][button.j]

    if (square.isBomb()) {
        alert("You lose.")
    }
    else {
        square.unhide()
        cascadeZeroes(square, board)
    }

}

function newGame() {
    let board = new Board()
    board.fill()
    board.number()

    return board
}

function createContainer() {
    let container = document.createElement("div")
    container.style.position = "absolute"
    container.style.backgroundColor = "black"
    container.style.margin = "auto"
    container.style.padding = "0"
    container.style.left = "50px"
    container.style.top = "100px"
    container.style.minWidth = `756px`
    container.addEventListener('contextmenu', function(event) {
        event.preventDefault()

        let button = event.target
        if (board.board[button.i][button.j].hidden) {
            if (button.style.backgroundColor != "rgb(231, 106, 106)") button.style.backgroundColor = "rgb(231, 106, 106)"
            else button.style.backgroundColor = "rgb(127, 179, 44)"
        }    
    })

    return container
}

function start() {
    container.innerHTML = ""

    for (let i = 0; i < board.x; i++) {
        let row_div = document.createElement("div")
    
        for (let j = 0; j < board.y; j++) {
            let sq = board.board[i][j]
            sq.button.textContent = sq.val
            sq.button.onclick = function(event) {
                reveal(event.target, board)
            }
    
            row_div.appendChild(sq.button)
        }
    
        container.appendChild(row_div)
    }
}

function createNewGameButton() {
    let newgame_button = document.createElement("button")
    newgame_button.id = "newgame"
    newgame_button.textContent = "New Game"
    newgame_button.onclick = function(e) {
        board = newGame()
        start()
    }

    return newgame_button
}

let board = newGame()
let container = createContainer()
let newgame_button = createNewGameButton()

document.body.appendChild(container)
document.body.appendChild(newgame_button)

start()