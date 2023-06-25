import { Board } from "./board.js"

/** 
 * cascadeReveal reveals blocks of numbers that contain an enclosed group of zeroes.
 * The algorithm is the following:
 *      If square value == non-zero, check if one of its neighbors its zero.
 *          If not, we're done.
 *          If it is zero and we haven't revealed it yet, repeat procedure for this zero.
 *      If square value == zero, reveal it.
 *          Then reveal all of its non-zero neighbors (because we know zeroes are enclosed).
 *          If one of the neighbors is zero, repeat procedure for this zero.
*/
function cascadeReveal(square) {
    square.unhide() // unhide current square to "mark it visited" and stop infinite recursion

    let neighbors = board.getNeighbors(square.i, square.j)
    neighbors.forEach(sq => {
        if (square.val == 0 && sq.val != 0) { // we know zeroes are enclosed, so reveal all non-zero neighbors of zeroes
            sq.unhide()
        }

        if (sq.val == 0 && sq.hidden) { // if one of the neighbors is a new zero, repeat procedure
            cascadeReveal(sq)
        }
    })
}

function reveal(button) {
    let square = board.board[button.i][button.j]

    if (square.isBomb()) alert("You lose.")
    else cascadeReveal(square, board)
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
    container.style.minWidth = "756px"
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

// depends on global variables: board, container
function start() {
    container.innerHTML = ""

    for (let i = 0; i < board.x; i++) {
        let row_div = document.createElement("div")
    
        for (let j = 0; j < board.y; j++) {
            let sq = board.board[i][j]
            sq.button.textContent = sq.val
            sq.button.onclick = function(event) { // event contains the target button
                reveal(event.target, board)
            }
    
            row_div.appendChild(sq.button)
        }
    
        container.appendChild(row_div)
    }
}

// depends on global variables: board, container
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

// GLOBAL VARIABLES:
var board = newGame()
var container = createContainer()

let newgame_button = createNewGameButton()

document.body.appendChild(container)
document.body.appendChild(newgame_button)

start()