const rows = document.getElementsByClassName("game-row");
const letterbox = document.getElementsByClassName("letterbox");
const letters = document.getElementsByClassName("letter");
const container = document.getElementById("game");
const green = "rgb(106, 170, 100)";
const yellow = "rgb(201, 180, 88)";
const grey = "grey";
const white = "white";

let word = wordlist[Math.floor(Math.random()*wordlist.length)];
let charCount = 0;
let submitted = false;
let round = 0;


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
        if(charCount % 5 === 0 && charCount/round===5) {
            letterbox[charCount].innerHTML = event.target.innerHTML;
            letterbox[charCount].style.borderColor = "black";
            charCount++;
        }
        });
}

document.getElementById("enter").addEventListener("click", function(event) {
    let tempWord = word;
    if (charCount % 5 === 0 && charCount !== 0) {
        enteredWord = letterbox[charCount-5].innerHTML +
            letterbox[charCount-4].innerHTML +
            letterbox[charCount-3].innerHTML +
            letterbox[charCount-2].innerHTML +
            letterbox[charCount-1].innerHTML;
        if(wordlist.includes(enteredWord)){
            for(i = 0; i < 5; i++) {
                if(letterbox[charCount-(5-i)].innerHTML === word.substr(i,1)) {
                    letterbox[charCount-(5-i)].style.backgroundColor = green;
                    letterbox[charCount-(5-i)].style.borderColor = green;
                    letterbox[charCount-(5-i)].style.color = white;
                    $("#"+letterbox[charCount-(5-i)].innerHTML).css("background-color", green);
                    tempWord = tempWord.replace(letterbox[charCount-(5-i)].innerHTML, "");
                }
            }
            for(i = 0; i < 5; i++) {
                if (tempWord.includes(letterbox[charCount-(5-i)].innerHTML)) {
                    if (letterbox[charCount-(5-i)].style.backgroundColor !== green) {
                        letterbox[charCount-(5-i)].style.backgroundColor = yellow;
                        letterbox[charCount-(5-i)].style.borderColor = yellow;
                        tempWord = tempWord.replace(letterbox[charCount-(5-i)].innerHTML, ""); 
                    }
                    letterbox[charCount-(5-i)].style.color = white;
                    if ($("#"+letterbox[charCount-(5-i)].innerHTML).css("background-color") !== green) {
                        $("#"+letterbox[charCount-(5-i)].innerHTML).css("background-color", yellow);
                    }
                } else {
                    if (letterbox[charCount-(5-i)].style.backgroundColor !== green &&
                        letterbox[charCount-(5-i)].style.backgroundColor !== yellow) {
                            letterbox[charCount-(5-i)].style.backgroundColor = "grey";
                            letterbox[charCount-(5-i)].style.borderColor = "grey";
                        }
                            letterbox[charCount-(5-i)].style.color = "white";
                    if( $("#"+letterbox[charCount-(5-i)].innerHTML).css("background-color") !== green &&
                        $("#"+letterbox[charCount-(5-i)].innerHTML).css("background-color") !== yellow ) {
                        $("#"+letterbox[charCount-(5-i)].innerHTML).css("background-color","grey");
                    }
                }
            }
        round++;
        } else {
            $( "#not-a-word" ).show(); 
            setTimeout(function() {
               $( "#not-a-word" ).hide();
             }, 3000);
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
    if((charCount % 5 !== 0 || (charCount % 5 === 0 && charCount/round!==5)) && charCount > 0) {
        charCount--;
        letterbox[charCount].innerHTML = "";
        letterbox[charCount].style.borderColor = "rgb(204, 204, 204)";
    }
});

makeGrid(5,6);