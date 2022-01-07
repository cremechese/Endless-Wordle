const rows = document.getElementsByClassName("game-row");
const letterbox = document.getElementsByClassName("letterbox");
const letters = document.getElementsByClassName("letter");
const container = document.getElementById("game");
const resetButtons = document.getElementsByClassName("restart");
let green = "rgb(106, 170, 100)";
let yellow = "rgb(201, 180, 88)";
const grey = "grey";
const white = "white";

let word = wordlist[Math.floor(Math.random()*wordlist.length)];
let charCount = 0;
let submitted = false;
let round = 0;
let colorBlindMode = document.getElementById("colorblind").checked;


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

    colorBlindMode = document.getElementById("colorblind").checked;
    if(colorBlindMode) {
        green = "rgb(245, 121, 58)";
        yellow = "rgb(133, 192, 249)";
    } else {
        green = "rgb(106, 170, 100)";
        yellow = "rgb(201, 180, 88)";
    }

    if (charCount % 5 === 0 && charCount !== 0) {
        enteredWord = letterbox[charCount-5].innerHTML +
            letterbox[charCount-4].innerHTML +
            letterbox[charCount-3].innerHTML +
            letterbox[charCount-2].innerHTML +
            letterbox[charCount-1].innerHTML;
        if(guesslist.includes(enteredWord)){
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
        if(tempWord === "") {
            $("#answer-win").html(word);
            $("#answer").html(word);
            $("#winner").show();
            $("#play-again").css("display", "flex");
        } else if (round === 6){
            $("#answer-lose").html(word);
            $("#answer").html(word);
            $("#loser").show();
            $("#play-again").css("display", "flex");
        }
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

for (i = 0; i < resetButtons.length; i++) {
    resetButtons[i].addEventListener("click", function(event) {
        $("#winner").hide();
        $("#loser").hide();
        word = wordlist[Math.floor(Math.random()*wordlist.length)];
        charCount = 0;
        round = 0;
        let currentRowAmount = rows.length;
        for (r = currentRowAmount - 1; r > -1; r--) {
            rows[r].remove();
        }
    
        for (i = 0; i < letters.length; i++) {
            letters[i].style.backgroundColor = "rgb(204, 204, 204)";
        }
    
        makeGrid(5,6);
    });
}

$(document).ready(function() {
    $(".menu").click( function(){
        $("#help").toggle();
    });
    $("#close").click( function(){
        $("#help").hide();
        $("#settings").hide();
    });
    $("#settings-close").click( function(){
        $("#help").hide();
        $("#settings").hide();
    });
    $("#w-close").click(function(){
        $("#winner").hide();
    });
    $("#l-close").click(function(){
        $("#loser").hide();
    });
    $(".settings").click( function(){
        $("#settings").toggle();
    });
    $("#colorblind").click( function() {
        for (i = 0; i < letters.length; i++) {
            if(letters[i].style.backgroundColor === "rgb(106, 170, 100)") { //green to orange
                letters[i].style.backgroundColor = "rgb(245, 121, 58)";
            } else if(letters[i].style.backgroundColor === "rgb(245, 121, 58)") { // orange to green
                letters[i].style.backgroundColor = "rgb(106, 170, 100)";
            } else if(letters[i].style.backgroundColor === "rgb(201, 180, 88)") { // yellow to blue
                letters[i].style.backgroundColor = "rgb(133, 192, 249)";
            } else if(letters[i].style.backgroundColor === "rgb(133, 192, 249)") { // blue to yellow
                letters[i].style.backgroundColor = "rgb(201, 180, 88)";
            }
        }

        for (i = 0; i < letterbox.length; i++) {
            if(letterbox[i].style.backgroundColor === "rgb(106, 170, 100)") { //green to orange
                letterbox[i].style.backgroundColor = "rgb(245, 121, 58)";
                letterbox[i].style.borderColor = "rgb(245, 121, 58)";
            } else if(letterbox[i].style.backgroundColor === "rgb(245, 121, 58)") { // orange to green
                letterbox[i].style.backgroundColor = "rgb(106, 170, 100)";
                letterbox[i].style.borderColor = "rgb(106, 170, 100)";
            } else if(letterbox[i].style.backgroundColor === "rgb(201, 180, 88)") { // yellow to blue
                letterbox[i].style.backgroundColor = "rgb(133, 192, 249)";
                letterbox[i].style.borderColor = "rgb(133, 192, 249)";
            } else if(letterbox[i].style.backgroundColor === "rgb(133, 192, 249)") { // blue to yellow
                letterbox[i].style.backgroundColor = "rgb(201, 180, 88)";
                letterbox[i].style.borderColor = "rgb(201, 180, 88)";
            }
        }
    });
});