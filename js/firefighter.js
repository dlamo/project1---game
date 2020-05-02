'use strict';

const firefighter = {
    x: 10,
    y: canvas.height,
    width: 200,
    height: 200 * 498 / 960,
    lives: 3,
    product: 'dry-chem',
    productShots: [], /*AGENT*/
    img: new Image(),
    draw: function() {
        this.img.src = 'images/firefighter-left.webp';
        //rotate the firefighter img
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(90 * Math.PI / 180);
        context.drawImage(this.img, canvas.width / 2 - this.width, canvas.height / 2 - this.width / 2 - this.x, this.width, this.height);
    },
    drawLives: function() {
        const live = new Image();
        context.fillStyle = 'white';
        context.font = '48px Arial';
        context.fillText('Lives:', 10, 150);
        live.src = 'images/firefighter-left.webp';
        for (let i = 1; i <= this.lives; i++) {
            context.drawImage(live, 0, 120 + i * 50, this.width / 3, this.height / 3);
        };
    },
    drawHydrant: function() {
        const hydrant = new Image();
        hydrant.src = 'images/fire_hydrant.png';
        hydrant.height = 120;
        hydrant.width = 120;
        context.drawImage(hydrant, 1050, canvas.height - hydrant.height, hydrant.width, hydrant.height);
    },
    move: function(dir) {
        if (dir === 'left') {
            this.x -= 20;
        } else if (dir === 'right') {
            this.x += 20;
        };
    },
    productShot: function(x) {
        this.productShots.push(new Product(this.x)); /*AGENT*/
    },
    drawproductShots: function() {
        this.productShots.forEach(function(shot) { /*AGENT*/
            //first update the position of the product shot, then draw them in the canvas
            shot.y -= 5;
            context.beginPath();
            context.arc(shot.x, shot.y, 20, 0, 2 * Math.PI);
            context.fillStyle = 'aqua';
            context.fill();
            context.closePath();
        })
    },
    clearProduct: function() {
        if (this.productShots[0] && this.productShots[0].y <= building.fires[0].y) { /*AGENT*/
            this.productShots.shift();
        };
    },
    checkBrickHit: function(bricksArr) {
        if (bricksArr[0]){
            for (let i = 0; i < bricksArr.length; i++) {
                //check hit with the firefighter
                if (bricksArr[i].y === (this.y - 0.6*this.width)) {
                    const leftLimit = this.x;
                    const rightLimit = this.x + this.height;
                    if (bricksArr[i].x + bricksArr[i].width >= leftLimit && bricksArr[i].x < rightLimit) {
                        this.lives--;
                        building.gameEnd();
                    };
                };
                //check hit with water (PENDIENTE...)
            };
        };
    },
    selectExtinguishingAgent: function() {
        if (this.x === 1050) {
            if (this.product == 'water') {
                this.product = 'dry-chem'
            } else if (this.product == 'dry-chem') {
                this.product = 'water'
            };
        };
    }
};
/*AGENT*/