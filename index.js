// let gosound = "https://drive.google.com/uc?id=1Yk7T0V6s72ntR6nMdIdncDiYaBUeRVN7";
// let bgm = "https://drive.google.com/uc?id=1xocToLUmQZSsvzEnUHpH17Q-CenJ3r4S";
// let fdsnd = "https://drive.google.com/uc?id=1CXcZ_U-HFV7J0bJOXruOFvtWTc13VIZx";
// let rtn = "https://drive.google.com/uc?id=1ivhtvujpkK5vDN16An7nfIpLnCcWHPF4";

let inputdir={x:0,y:0};
// const mainaudio= new Audio("bgm");
// const foodsound = new Audio("fdsnd");
// const rotation = new Audio("rtn");
// const gameover = new Audio("gosound");
// const gameover2 = new Audio("rahulji.mp3");
let speed=5;
let score=0;
let lastpaintedtime=0;

function getRandomNumber(min, max) {
    // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
    const randomDecimal = Math.random();
  
    // Scale the random decimal to the desired range and round it to the nearest integer
    const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;
  
    return randomNumber;
  }
  
  // Get a random number between 1 and 18
  const rn1 = getRandomNumber(1, 18);
  const rn2 = getRandomNumber(1, 18);

let snakeArr=[
    {x:rn1,y:rn2}
]

const rn3 = getRandomNumber(1, 18);
const rn4 = getRandomNumber(1, 18);

food={
    x:rn3,y:rn4
}

function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastpaintedtime)/1000<1/speed){
        return;
    }
    lastpaintedtime=ctime;
    gameEngine();
}

function iscollide(sarr){

    for(let i=1;i<sarr.length;i++){
        if(sarr[i].x==sarr[0].x && sarr[i].y==sarr[0].y){
            return true;
        }
    }
    if(snakeArr[0].x<0 || snakeArr[0].y<0 || snakeArr[0].y>18 || snakeArr[0].x>18){
        // gameover.play();
        return true;
    }
    return false;
}

function gameEngine(){

    //if snake collides
    if(iscollide(snakeArr)){
        // mainaudio.pause();
        // gameover.play();
        //gameover2.play();
        inputdir={x:0,y:0};
        alert("Reload the page and click restart to play again");
        rn1 = getRandomNumber(1, 18);
        rn2 = getRandomNumber(1, 18);
        snakeArr=[
            {x:rn1,y:rn2}
        ]
        score=0;
    }



    //snake eating food


    if(snakeArr[0].x === food.y && snakeArr[0].y === food.x){
        snakeArr.unshift({
            x:snakeArr[0].x+inputdir.x,
            y:snakeArr[0].y+inputdir.y
        });
        let rn5 = getRandomNumber(1,18);
        let rn6 = getRandomNumber(1,18);

        food={x:rn5,y:rn6};

        foodsound.play();
        score=score+1;
        var scoresetting = document.getElementById('score');
        scoresetting.innerHTML= score;
    }

    //snake moving
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;
    

    //snake add
    var board = document.getElementById("board");
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snake = document.createElement('div');
        snake.style.gridRowStart=e.y;
        snake.style.gridColumnStart=e.x;
        if(index==0){
            snake.classList.add('head');
        }
        else{
            snake.classList.add('snake');
        }
        board.appendChild(snake);
    })
    //food add
    fooditem = document.createElement('div');
    fooditem.style.gridRowStart=food.x;
    fooditem.style.gridColumnStart=food.y;
    fooditem.classList.add('food');
    board.appendChild(fooditem);
}

window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputdir = {x:0,y:0};
    // mainaudio.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log("moving up");
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case 'ArrowDown':
            console.log("moving down");
            inputdir.x = 0;
            inputdir.y = 1;
            break;
    
        case 'ArrowLeft':
            console.log("moving left");
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case 'ArrowRight':
            console.log("moving Right");
            inputdir.x = 1;
            inputdir.y = 0;
            break;

        default:
            break;
    }
})
