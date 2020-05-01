'use strict';

const firefighter = {
    x: 10,
    y: canvas.height,
    width: 200,
    height: 200 * 498 / 960,
    lives: 2,
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
};