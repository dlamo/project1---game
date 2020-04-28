const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const player = document.getElementById('player');
const playerName = document.getElementById('nickname').value;

//start game
window.onload = () => {
    document.getElementById('new-game').onclick = () => {
        newGame();
    }
    function newGame() {
        //change the screen
        document.getElementById('start').style.display = 'none';
        document.getElementById('main').style.display = 'block';
        //display the nickname in the screen
        player.innerHTML = playerName;
        //start the screening of the elements
        requestAnimationFrame(updateGame);
        //events arrow left / right
        document.addEventListener('keydown', handleKeyEvent);
    }
};

//define building object
const building = {
    x: 50,
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
    addFire: function() {
        this.fires.push(new Fire(0, 0));
    },
    drawFire: function(){
        this.addFire();
        const fire = this.fires[0];
        context.drawImage(fire.img, fire.x, fire.y);
    }
};

//define firefighter object
const firefighter = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    img: new Image(),
    draw: function() {
        this.img.src = 'images/firefighter-left.webp';
        this.y = canvas.height,
        this.width = 200,
        this.height = 200 * 498 / 960
        context.drawImage(this.img, this.x, this.y - this.height, this.width, this.height);
    },
    move: function(dir) {
        if (dir === 'left') {
            this.x -= 10;
        } else if (dir === 'right') {
            this.x += 10;
        }
    }
}

//define class fire constructor
class Fire {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health = 50;
        this.img = new Image();
        this.img.src = 'images/Fogo_1.png';
    }
}

//function to update the screen (canvas)
function updateGame() {
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    building.draw();
    building.drawFire();
    firefighter.draw();
    context.restore();
    requestAnimationFrame(updateGame);
}

//function to respond the key down left and right
function handleKeyEvent(e) {
    if (event.code === 'ArrowLeft') {
        firefighter.move('left');
    } else if (event.code === 'ArrowRight') {
        firefighter.move('right');
    }
}