let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")

let turnO = true;   //player X, player O
let count = 0;      //to track draw match
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enabledBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        console.log("box was clicked");
        if(turnO){ //playerO turn
            box.innerText = "O";
            turnO = false;  //the turn goes for playerX
        }else{ //playerX turn
            box.innerText = "X";
            turnO = true;   //again the turn goes for playerO
        }
        box.disabled = true;    //after double clicking the button it should not change its value 
        count++;

        let isWinner = checkWinner();

        if(count == 9 &&  !isWinner){
            gameDraw();
        }
        
    });
});

    const gameDraw = ()=>{
        msg.innerText = `Game was Draw...`;
        msgContainer.classList.remove("hide");
        disabledBoxes();
    }

const disabledBoxes = () => {           //after winning no other btn should work logic
    for(let box of boxes) {
        box.disabled = true;     
    }
}

const enabledBoxes = () => {           //after winning the game to restart the game logic
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";            //after reseting the all boxes should get empty      
    }
}


const showWinner = (winner)=>{  
    msg.innerText = `Congratulations, Winner is ${winner}`; //printing the winner message
    msgContainer.classList.remove ("hide");  //after displaying the winner remove the hide
    disabledBoxes();
}

const checkWinner = ()=> {      //checking the winner
  for(let pattern of winPatterns){
   // console.log(pattern[0], pattern[1], pattern[2]);        //taking individual index value
    // console.log(
    //     boxes[pattern[0]].innerText, 
    //     boxes[pattern[1]].innerText, 
    //     boxes[pattern[2]].innerText
    // );  //checking the boxes number wise
    
    let pos1Val =  boxes[pattern[0]].innerText;     //checking the boxes number wise
    let pos2Val =  boxes[pattern[1]].innerText;
    let pos3Val =  boxes[pattern[2]].innerText;

    if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
        if(pos1Val == pos2Val && pos2Val == pos3Val){   //winning condition
            console.log("winner", pos1Val);
            
            showWinner(pos1Val);                        //displaying the winner
            return true;
        }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);