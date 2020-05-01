'use strict';

const playerName = document.getElementById('nickname').value;
const player = document.getElementById('player');
const time = document.getElementById('time');
const points = document.getElementById('score');

let timerId = setInterval(countdown, 1000);

//start game
window.onload = () => {
    document.getElementById('new-game').onclick = () => {
        newGame();
    }
    function newGame() {
        //change the screen
        document.getElementById('start').style.display = 'none';
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

    if (!building.gameEnd()) {
        //fire display
        context.save();
        //context.scale(building.fires[0].intensity, building.fires[0].intensity);
        building.fires[0].animateFire();
        context.restore();

        //bricks display ---> PRÓXIMAMENTE...
        /*context.save();
        building.fallingBricks();
        context.restore();*/

        //water shots display
        context.save();
        firefighter.drawWaterShots();
        context.restore();

        firefighter.clearWater();
        building.checkWaterShots(firefighter.waterShots);
        
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
        firefighter.waterShot(firefighter.x);
    }
}

function countdown() {
    time.innerHTML--;
}