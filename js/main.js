const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const player = document.getElementById('player');
const playerName = document.getElementById('nickname').value;
const time = document.getElementById('time');
const points = document.getElementById('score');

//start game
window.onload = () => {
    document.getElementById('new-game').onclick = () => {
        newGame();
    }
    function newGame() {
        //change the screen
        document.getElementById('start').style.display = 'none';
        document.getElementById('main').style.display = 'block';
        //add a fire in the building
        timerId = setInterval(countdown, 1000);
        building.addFires();
        //start the screening of the elements
        requestAnimationFrame(updateGame);
        //events arrow left / right
        document.addEventListener('keydown', handleKeyEvent);
    }
};

//define building object
const building = {
    x: 150,
    y: 0,
    width: 0,
    height: 0,
    fires: [],
    img: new Image(),
    draw: function() {
        this.img.src = 'images/building.webp';
        this.width = 900;
        this.height = 900 * 2048 / 2038;
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    },
    addFires: function() {
        const positions = [
            [260, 190], [570, 190], [870, 190], 
            [260, 480], [570, 480], [870, 480], 
            [260, 750], [570, 750], [870, 750]
        ];
        for (let i = 0; i < 5; i++) { //CAMBIAR EL NÚMERO A MÁS GRANDE PARA ALARGAR EL JUEGO
            const randomPosition = Math.floor(Math.random() * positions.length);
            this.fires.push(new Fire(...positions[randomPosition]));
        }
    },
    checkWaterShots: function(water) { //give water array as argument
        if (water[0]) {
            const bottomPoint = this.fires[0].y + this.fires[0].heightOfImage;
            for (let i = 0; i < water.length; i++) {
                if (water[0].y <= bottomPoint && water[0].y > (bottomPoint - 5)) {
                    //defining the limits of the fire
                    const leftLimit = this.fires[0].x;
                    const rightLimit = this.fires[0].x + this.fires[0].widthOfSingleImage;
                    if (water[0].x >= leftLimit && water[0].x <= rightLimit) {
                        this.impactUpdate();
                    }
                }
            }
        }
    },
    impactUpdate: function() {
        this.fires[0].intensity--;
        firefighter.waterShots.shift();
        points.innerHTML = parseInt(points.innerHTML) + 10;
        if (this.fires[0].intensity === 0) {
            this.fires.shift();
        } 
    },
    gameCompleted: function() {
        if (this.fires.length === 0) {
            return true;
        }
        return false; 
    }
};

//define firefighter object
const firefighter = {
    x: 10,
    y: canvas.height,
    width: 200,
    height: 200 * 498 / 960,
    waterShots: [],
    img: new Image(),
    draw: function() {
        this.img.src = 'images/firefighter-left.webp';
        //rotate the firefighter img
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(90 * Math.PI / 180);
        context.drawImage(this.img, canvas.width / 2 - this.width, canvas.height / 2 - this.width / 2 - this.x, this.width, this.height);
    },
    move: function(dir) {
        if (dir === 'left') {
            this.x -= 20;
        } else if (dir === 'right') {
            this.x += 20;
        }
    },
    waterShot: function(x) {
        this.waterShots.push(new Water(this.x));
    },
    drawWaterShots: function() {
        this.waterShots.forEach(function(shot) {
            //first update the position of the water shot, then draw them in the canvas
            shot.y -= 5;
            context.beginPath();
            context.arc(shot.x, shot.y, 20, 0, 2 * Math.PI);
            context.fillStyle = 'aqua';
            context.fill();
            context.closePath();
        })
    },
    clearWater: function() {
        if (this.waterShots[0] && this.waterShots[0].y <= building.fires[0].y) {
            this.waterShots.shift();
        }
    }
}

//define class fire constructor
class Fire {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 640;
        this.height = 384;
        this.intensity = 5;
        //variables needed for the animation
        this.img = new Image();
        this.img.src = 'images/fire1_64.png';
        this.totalNumberOfFrames = 10 // ten images in the image
        this.imageFrameNumber = 0 // This is changed to make the sprite animate  
        this.widthOfImage = this.width; // find the width of the image
        this.heightOfImage = this.height / 6; // find the height of the image (first we start with only the first row)
        this.widthOfSingleImage = this.widthOfImage / this.totalNumberOfFrames; // The width of each image in the spirite
    }
    animateFire() {
        this.imageFrameNumber++; // changes the sprite we look at
        this.imageFrameNumber = this.imageFrameNumber % this.totalNumberOfFrames; // Change this from 0 to 1 to 2 ... upto 9 
        context.drawImage(
            this.img, 
            this.imageFrameNumber * this.widthOfSingleImage, 0, // x and y - where in the sprite
            this.widthOfSingleImage, this.heightOfImage, // width and height
            this.x, this.y, // x and y - where on the screen
            this.widthOfSingleImage, this.heightOfImage // width and height
        );
    }
}

//define class water shots
class Water {
    constructor(x) {
        this.x = x;
        this.y = canvas.height - 200;
        this.radius = 20;
    }
}

//function to update the screen (canvas)
function updateGame() {
    //building display
        context.save();
        context.clearRect(0, 0, canvas.width, canvas.height);
        building.draw();

        //firefighter display
        context.save(); 
        firefighter.draw();
        context.restore();

    if (!building.gameCompleted()) {
        //fire display
        context.save();
        //context.scale(building.fires[0].intensity, building.fires[0].intensity);
        building.fires[0].animateFire();
        context.restore();

        //water shots display
        context.save();
        firefighter.drawWaterShots();
        context.restore();

        firefighter.clearWater();
        building.checkWaterShots(firefighter.waterShots);
        
        requestAnimationFrame(updateGame);

    } else {
        clearInterval(timerId);
        window.alert('Congrats! Game Completed!');
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