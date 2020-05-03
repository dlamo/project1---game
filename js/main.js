'use strict';

const playerName = document.getElementById('nickname').value;
const player = document.getElementById('player');
const time = document.getElementById('time');
const points = document.getElementById('score');
const introSound = document.querySelector('#start-screen audio');
introSound.loop = true;

let timerId = setInterval(countdown, 1000); // como relacionar el timer en la función más abajo

//start game
window.onload = () => {
    //introSound.play();
    document.getElementById('new-game').onclick = () => { 
        newGame();
    }
    function newGame() {
        //change the screen
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('main').style.display = 'block';
        //fire the building
        building.addFires();
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
    if (e.code === 'ArrowLeft') {
        firefighter.move('left');
    } else if (e.code === 'ArrowRight') {
        firefighter.move('right');
    } else if (e.code === 'Space') {
        firefighter.productShot(); //firefighter.x
    } else if (e.code === 'KeyC') {
        firefighter.selectExtinguishingAgent();
    }
}

function countdown() {
    time.innerHTML--;
}