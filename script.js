const rows = document.getElementsByClassName("game-row");
const container = document.getElementById("game");

function makeGrid(x, y) {
    for (r = 0; r < y; r++) {
        let row = document.createElement("div");
        container.appendChild(row).className = "game-row"
    }

    for (r = 0; r < rows.length; r++) {
        for (c = 0; c < x; c++) {
            let newCell = document.createElement("div");
            rows[r].appendChild(newCell).className = "letterbox"
        }
    }
}

makeGrid(5,6);