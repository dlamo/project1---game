'use strict';

const main = document.getElementById('main');
const playerName = document.getElementById('nickname');
const player = document.getElementById('player');
const time = document.getElementById('time');
let seconds = 0;
const points = document.getElementById('score');
const music = document.getElementById('music');

const introSound = document.querySelector('#start-screen audio');
const gameSound = document.querySelector('#game-sound');
const fireSound = document.querySelector('#fire-sound');

let timerId = setInterval(countTime, 1000); // como relacionar el timer en la función más abajo

//start game
window.onload = () => {
    music.onclick = () => {
        // hacer un getattribute o coger la propiedad del style position para volver a quitarle el focus
        introSound.play();
    }
    document.getElementById('new-game').onclick = () => {
        gameSound.loop = true;
        gameSound.play(); 
        fireSound.loop = true;
        fireSound.volume = 0.5;
        fireSound.play();
        player.innerText = playerName.value;
        newGame();
    }
    function newGame() {
        //change the screen
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('main').style.display = 'block';
        //fire the building
        building.addFire();
        //start the screening of the elements
        requestAnimationFrame(updateGame);
        //events arrow left / right
        document.addEventListener('keydown', handleKeyEvent);
    }
};

//function to update the screen (canvas)
function updateGame() {

    //building display
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    building.draw();
    context.restore();

    //firefighter display
    context.save(); 
    firefighter.draw();
    context.restore();

    //lives, product and hydrant display
    context.save(); 
    firefighter.drawLives();
    firefighter.displayProduct();
    firefighter.drawHydrant();
    context.restore();

    if (!building.gameEnd()) {
        //fire display
        context.save();
        building.fires[0].animateFire();
        context.restore();

        //bricks display
        context.save();
        building.fallingBricks();
        context.restore();

        //product shots display
        context.save();
        firefighter.drawproductShots();
        context.restore();

        firefighter.clearProduct();
        building.checkProductShots(firefighter.productShots);
        firefighter.checkBrickHit(building.bricks);
        
        requestAnimationFrame(updateGame);

    } else {
        clearInterval(timerId);
        window.alert('Game Completed!');
    }
}

//function to respond the key down left and right
function handleKeyEvent(e) {
    if (e.code === 'ArrowLeft' && firefighter.x > 10) {
        firefighter.move('left');
    } else if (e.code === 'ArrowRight' && firefighter.x < 1090) {
        firefighter.move('right');
    } else if (e.code === 'Space') {
        firefighter.productShot(); //firefighter.x
    } else if (e.code === 'KeyC') {
        firefighter.selectExtinguishingAgent();
    }
}

function countTime() {
    seconds++;
    if (seconds > 59) {
        let secondNumber = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
        time.innerHTML = `${Math.floor(seconds/60)}:${secondNumber}`;
    } else {
        time.innerHTML = seconds;
    }
}