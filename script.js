const rows = document.getElementsByClassName("game-row");
const letterbox = document.getElementsByClassName("letterbox");
const letters = document.getElementsByClassName("letter");
const container = document.getElementById("game");

let word = "BASIC"
let charCount = 0;
let submitted = false;


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


for (i = 0; i < letters.length; i++) {
    letters[i].addEventListener("click", function(event) {
        if(charCount % 5 !== 0 || charCount === 0) {
            letterbox[charCount].innerHTML = event.target.innerHTML;
            letterbox[charCount].style.borderColor = "black";
            charCount++;
        }
        if(charCount % 5 === 0 && submitted === true) {
            letterbox[charCount].innerHTML = event.target.innerHTML;
            letterbox[charCount].style.borderColor = "black";
            charCount++;
            submitted = false;
        }
        });
}

document.getElementById("enter").addEventListener("click", function(event) {
    if (charCount % 5 === 0 && charCount !== 0) {
        enteredWord = letterbox[charCount-5].innerHTML +
            letterbox[charCount-4].innerHTML +
            letterbox[charCount-3].innerHTML +
            letterbox[charCount-2].innerHTML +
            letterbox[charCount-1].innerHTML;
        for(i = 0; i < 5; i++) {
            if(letterbox[charCount-(5-i)].innerHTML === word.substr(i,1)) {
                letterbox[charCount-(5-i)].style.backgroundColor = "green";
            }
        submitted = true;
        }
    } else {
        $( "#error" ).show(); 
        setTimeout(function() {
           $( "#error" ).hide();
         }, 3000);
        $(".game-row:nth-child("+Math.floor(charCount/5)+1+")").effect("shake");
    }
});

document.getElementById("backspace").addEventListener("click", function(event) {
    if(charCount>0) {
        charCount--;
        letterbox[charCount].innerHTML = "";
        letterbox[charCount].style.borderColor = "rgb(204, 204, 204)";
    }
});

makeGrid(5,6);