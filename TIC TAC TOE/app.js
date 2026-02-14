let boxes = document.querySelectorAll(".box");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.getElementById("msg");
let newBtn = document.getElementById("new-btn");
let reserbtn = document.getElementById("reset");


let turnO = true;
let count = 0;


const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const reserGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgcontainer.classList.add("hide");
};

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        let isWinner = checkwinner();

        if(count == 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = 'Game was a Draw.';
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const checkwinner = () => {
    for( let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 == pos2 && pos2 == pos3){
                showWinner(pos3);
                return true;
            }
        }
    }
};

reserbtn.addEventListener("click", reserGame);
newBtn.addEventListener("click", reserGame);