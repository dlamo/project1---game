'use strict';

//DOM selectors
const main = document.getElementById('main');
const playerName = document.getElementById('nickname');
const player = document.getElementById('player');
const time = document.getElementById('time');
const points = document.getElementById('score');
const music = document.getElementById('music');
const introSound = document.querySelector('#start-screen audio');
const gameSound = document.querySelector('#game-sound');
const fireSound = document.querySelector('#fire-sound');
const restartButton = document.querySelector('#main header button');

//starting declarations
const maxScore = localStorage.getItem('maxScore');
const maxScoreName = localStorage.getItem('maxScoreName');
let seconds = 0; //game time
let gameSpeed = 1; //variable needeed to increment the speed of the game
let timerId = undefined; //initializating the variable that will become setInterval

//start game
window.onload = () => {
    //intro music control through button
    music.onclick = () => {
        introSound.paused ? introSound.play() : introSound.pause();
    }
    //when new-game is clicked, start game sounds, copy the nickname and start the game
    document.getElementById('new-game').onclick = () => {
        introSound.pause();
        gameSound.loop = true;
        gameSound.play(); 
        fireSound.loop = true;
        fireSound.volume = 0.5;
        fireSound.play();
        player.innerText = playerName.value;
        timerId = setInterval(countTime, 1000);
        newGame();
    }
    function newGame() {
        //change the screen
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('main').style.display = 'block';
        //print first fire
        building.addFire();
        //start the screening of the elements
        requestAnimationFrame(updateGame);
        //events arrow left/right
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

    //in case the game is not over
    if (!building.gameEnd()) {
        //lives, product and hydrant display
        context.save(); 
        firefighter.drawLives();
        firefighter.displayProduct();
        firefighter.drawHydrant();
        context.restore();
        
        //fire display
        context.save();
        building.fires[0].animateFire();
        context.restore();

        //bricks display
        context.save();
        building.fallingBricks(gameSpeed);
        context.restore();

        //product shots display
        context.save();
        firefighter.drawproductShots();
        context.restore();

        //eliminate product when it goes out of fire range, check collisions product-water and firefighter-brick
        firefighter.clearProduct();
        building.checkProductShots(firefighter.productShots);
        firefighter.checkBrickHit(building.bricks);

        requestAnimationFrame(updateGame);
    } else {
        //stop the timer once the game is over
        clearInterval(timerId);
        gameSound.pause();
        fireSound.pause();
        //check the maxscore in the localStorage and return if the game score is higher
        if (!maxScore) {
            context.save();
            firefighter.drawWinner();
            context.restore();
            localStorage.setItem('maxScore', parseInt(points.innerHTML));
            localStorage.setItem('maxScoreName', player.innerText);
            restartButton.style.display = 'block';
            playSound('tada');
            restartButton.addEventListener('click', () => location.reload());
        } else if (maxScore < parseInt(points.innerHTML)) {
            context.save();
            firefighter.drawWinner();
            context.restore();
            localStorage.maxScore = parseInt(points.innerHTML);
            localStorage.maxScoreName = player.innerText;
            restartButton.style.display = 'block';
            playSound('tada');
            restartButton.addEventListener('click', () => location.reload());
        } else {
            context.save();
            firefighter.drawLoser();
            context.restore();
            restartButton.style.display = 'block';
            playSound('gameOver');
            restartButton.addEventListener('click', () => location.reload());
        }
    }
}

//function to respond multiple keydown
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

//function that controls the time passed and the increase of the game speed
function countTime() {
    seconds++;
    if (seconds > 59) {
        let secondNumber = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
        time.innerHTML = `${Math.floor(seconds/60)}:${secondNumber}`;
    } else {
        time.innerHTML = seconds;
    }
    if (seconds % 20 == 0) {
        gameSpeed *= 1.004;
    }
}

/*function restart() {
    location.reload();
}*/