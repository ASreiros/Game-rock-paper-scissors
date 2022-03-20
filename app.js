function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function gamestart() {
    gameon = true;
    bbs.classList.add("noshow");
    bbc.classList.remove("noshow");
    h3.innerHTML = "Choose your sign and press show"
    rbox.innerHTML = `<img id="rhand" class="closehand-r hand" src="./img/Rock R.png" alt="closehand"></img>`
    lbox.innerHTML = `<img id="lhand" class="closehand-l hand" src="./img/Rock L.png" alt="closehand"></img>`
    writestatistics()   
}

function gamelost() {
    bbs.classList.remove("noshow");
    bbc.classList.add("noshow");
    victorypoints = 0;
    rbox.innerHTML = `<img id="rhand" class="hand" src="./img/Rock R.png" alt="closehand"></img>`
    lbox.innerHTML = `<img id="lhand" class="hand" src="./img/Rock L.png" alt="closehand"></img>`
    writestatistics()
    gamestart() 
}

function writestatistics() {
    bestrow = Number(localStorage.getItem("bestrow"))
    document.querySelector(".message-screen-holder>p").innerHTML = `You won ${won} times total`
    document.querySelector(".message-screen-holder>p:nth-of-type(2)").innerHTML = `You lost ${lost} times total`
    document.querySelector(".message-screen-holder>p:nth-of-type(3)").innerHTML = `You draw ${draw} times total`
    document.querySelector(".anounce").innerHTML = `You won ${row} times in a row. <br> Your best result  ${bestrow} times in a row`;
    infoArr = [won, draw, lost]
    localStorage.setItem("rockpaperscissorsinfo", JSON.stringify(infoArr))

}

function showhand(a,o){
  switch (a) {
    case 0:
    lbox.innerHTML = `<img id="lhand" class = "hand" src="./img/Rock L.png" alt="closehand"></img>`    
    break;
    case 1:
    lbox.innerHTML = `<img id="lhand" class = "hand" src="./img/Scissors L.png" alt="two fingers"></img>`    
    break;
    case 2:
    lbox.innerHTML = `<img id="lhand" class = "hand" src="./img/Paper L.png" alt="openhand"></img>`    
    break;
}
switch (o) {
    case 0:
    rbox.innerHTML = `<img id="rhand" class="hand" src="./img/Rock R.png" alt="closehand"></img>`    
    break;
    case 1:
    rbox.innerHTML = `<img id="rhand" class="hand" src="./img/Scissors R.png" alt="two fingers"></img>`    
    break;
    case 2:
    rbox.innerHTML = `<img id="rhand" class="hand" src="./img/Paper R.png" alt="openhand"></img>`    
    break;
}    

}

function signnoshow(){
    bbrk.classList.add("noshow")
    bbsc.classList.add("noshow")
    bbsp.classList.add("noshow")
}

function signshow(){
    bbrk.classList.remove("noshow")
    bbsc.classList.remove("noshow")
    bbsp.classList.remove("noshow")
}


const logicArr =[[0,1,2],[1,2,0],[2,0,1]]
let lh = document.querySelector("#lhand");
let rh = document.querySelector("#rhand");
const bbs = document.querySelector("#bbs");
const bbc = document.querySelector("#bbc");
const bbshow = document.querySelector("#bbshow");
const bbok = document.querySelector("#bbok")
let gameon = false;
const h3= document.querySelector("h3");
let victorypoints = 0;
const selector = document.querySelector("#selector")
let row = 0;
let opponent = 0;
let won = 0;
let draw = 0;
let lost = 0;
const lbox = document.querySelector("#left-box");
const rbox = document.querySelector("#right-box");
const bbrk = document.querySelector(".sign-scissors");
const bbsc = document.querySelector(".sign-rock");
const bbsp = document.querySelector(".sign-paper");
const bbcr = document.querySelector(".bbcr");

let bestrow = Number(localStorage.getItem("bestrow"))
let infoArr = JSON.parse(localStorage.getItem("rockpaperscissorsinfo"))

if(infoArr === null){
    won = 0;
    draw = 0;
    lost = 0;
 } else{
    won = infoArr[0];
    draw = infoArr[1];
    lost = infoArr[2];
 }


if(bestrow === null){
   localStorage.setItem("bestrow", 0)
}

bbcr.addEventListener("click", ()=>{
    won = 0;
    draw = 0;
    lost = 0;
    writestatistics()
})

bbs.addEventListener("click", ()=>{
gamestart()
})

bbc.addEventListener("click", ()=>{
    h3.innerHTML = "Press start to play";
    lh = document.querySelector("#lhand");
    rh = document.querySelector("#rhand");
    lh.classList.remove("closehand-l");
    rh.classList.remove("closehand-r");
    signshow();
    gameon = false;
    bbs.classList.remove("noshow");
    bbc.classList.add("noshow");
    victorypoints = 0;
    row = 0;
    bbok.classList.add("noshow")
    writestatistics() 
})

document.querySelectorAll(".sign").forEach((a,i)=>{
    a.addEventListener("click", ()=>{
        game(i)
    })
})

 
 
 function game(x){   
 if (gameon===true) {
opponent = rand(0,2);
const your = x;
showhand(your, opponent)
bbok.classList.remove("noshow")
signnoshow()
logicArr[your].forEach((a,i) =>{
if(a === opponent){
    switch (i) {
        case 0:
            h3.innerHTML = "Draw";
            draw++;
            bbok.addEventListener("click",() =>{
                gamestart();
                bbok.classList.add("noshow")
                signshow()
            })
        break;
        case 1:
            h3.innerHTML = "You won" 
            won++;
            row++;
            bestrow = Number(localStorage.getItem("bestrow"))
            if (row > bestrow) {
              bestrow = row; 
              localStorage.setItem("bestrow", bestrow) 
            }
            bbok.addEventListener("click",() =>{
                gamestart();
                bbok.classList.add("noshow")
                signshow()
            })
        break;
        case 2:
            h3.innerHTML = "You lost"
            lost++
            row=0;
            bbok.addEventListener("click",() =>{
                gamelost();
                bbok.classList.add("noshow")
                signshow()
            }) 
            
        break;                
    }
}
    
 })


 } else{
     h3.innerHTML = "First start the game"
 }
 }

