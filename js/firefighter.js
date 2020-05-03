'use strict';

const firefighter = {
    x: 10,
    y: canvas.height,
    width: 200,
    height: 200 * 498 / 960,
    lives: 3,
    product: 'water',
    productShots: [],
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
        context.font = '36px Arial';
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
    displayProduct: function() {
        context.fillStyle = 'white';
        context.font = '36px Arial';
        context.fillText('Product:', 1060, 150);
        context.font = '30px Arial';
        context.fillText(this.product, 1060, 240);
        const legend = new Product(this.x, this.product, context);
        legend.drawActualProduct();
    },
    productShot: function() {
        this.productShots.push(new Product(this.x, this.product, context));
    },
    drawproductShots: function() {
        this.productShots.forEach(shot => {
            shot.draw();
        })
    },
    clearProduct: function() {
        if (this.productShots[0] && this.productShots[0].y <= building.fires[0].y) {
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
                this.productShots.forEach((shot, index) => {
                    console.log('punto 1')
                    if (bricksArr[i].y + bricksArr[i].height >= shot.y - shot.radius && bricksArr[i].y + bricksArr[i].height > shot.y) {
                        console.log('punto 2')
                        if (bricksArr[i].x + bricksArr[i].width >= shot.x - shot.radius && bricksArr[i].x < shot.x + shot.radius) {
                            this.productShots.splice(index, 1);
                        };
                    };
                });
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