import { createButton, revealButton } from "./utility.js"

export class Square {
    constructor(i, j, val, hidden=true) {
        this.i = i
        this.j = j
        this.val = val
        this.hidden = hidden
        this.button = createButton(i, j)
    }

    unhide() {
        if (this.hidden) {
            this.hidden = false
            revealButton(this.button, this.val)
        }
    }

    inc() {
        this.val += 1
    }

    isBomb() {
        return this.val < 0
    }
}