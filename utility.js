export function color(bomb_count) { // readability: each bomb_count number has a different color
    let color = -1; 

    switch(bomb_count) {
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

    return color
}

export function createButton(i, j) { // creates button with coordinates i,j to reference when clicked
    let button = document.createElement("button")
    button.i = i
    button.j = j
    button.style.color = "transparent" // set button text (i.e.bomb_count) to invisible 
    button.style.opacity = i % 2 == 0 && j % 2 == 0 || i % 2 != 0 && j % 2 != 0 ? "calc(0.95)" : "calc(1)" // readability: chess-board like coloring instead of borders

    return button
}

export function revealButton(button, bomb_count) {
    let bomb_count_color = color(bomb_count)
    button.style.color = bomb_count_color // reveals text by changing color from transparent
    button.style.backgroundColor = "rgb(219, 164, 127)" // readability: sets differnet background-color 
}

export function randInt() { // random integer between 1 and 10 (inclusive)
    return Math.floor(Math.random() * 10) + 1
}