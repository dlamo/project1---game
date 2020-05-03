'use strict';

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const building = {
    fires: [],
    bricks: [],
    draw: function() {
        //bricks design
        context.fillRect(0, 0, canvas.clientWidth, canvas.height);
        context.fillStyle = 'moccasin';
        context.fillRect(150, 0, 900, canvas.height);
        context.fillStyle = '#dc5539';
        for (let y = 6; y < canvas.height; y += 36) {
            context.fillRect(156, y, 50, 12);
            context.fillRect(150, y + 18, 25, 12);
            for (let x = 212; x < 1000; x += 56) {
                context.fillRect(x, y, 50, 12);
                context.fillRect(x - 31, y + 18, 50, 12);
            };
            context.fillRect(1021, y + 18, 29, 12);
        };
        //window design
        context.fillStyle = '#cecdcb';
        context.fillRect(125, 0, 950, 25);
        const windowWidth = 112.5;
        const windowHeight = windowWidth * 1.5;
        for (let z = 1; z < 4; z++) {
            for (let i = 1; i <= 5; i++) {
                const windowPositionX = 150 + (windowWidth / 2) * i + windowWidth * (i - 1);
                const windowPositionY = 35 + 80 * z + (windowHeight) * (z-1);
                //window border
                context.fillStyle = 'darkgrey';
                context.fillRect(
                    windowPositionX - 2, 
                    windowPositionY - 2, 
                    windowWidth + 4, 
                    windowHeight + 4
                );
                //window
                context.fillStyle = '#cecdcb';
                context.fillRect(
                    windowPositionX, 
                    windowPositionY, 
                    windowWidth, 
                    windowHeight
                );
                //upper glass
                context.fillStyle = '#373634';
                context.fillRect(
                    windowPositionX + 15, 
                    windowPositionY + 15, 
                    windowWidth - 30, 
                    windowHeight / 2 - 22.5
                );
                //lower glass
                context.fillRect(
                    windowPositionX + 15, 
                    windowPositionY + 15 + ((windowHeight) / 2 - 22.5) + 15, 
                    windowWidth - 30, 
                    windowHeight / 2 - 22.5
                );
            };
            context.fillStyle = '#cecdcb';
            context.beginPath();
            context.moveTo(125, 25);
            context.lineTo(150, 35);
            context.lineTo(1050, 35);
            context.lineTo(1075, 25);
            context.closePath();
            context.fill();
            context.fillStyle = 'darkgrey';
            context.fillRect(125, 23, 950, 2);
        }
    },
    addFires: function() {
        const positions = [];
        for (let z = 0; z <= 2; z++) {
            for (let x = 0; x <= 4; x++) {
                positions.push([150 + 112.5*(1 + 1.5 * x) - 32, 35 + 80*(1 + z) + 112.5*(1 + 1.5 * z) - 15]);
            };
        };
        for (let i = 0; i < 5; i++) { //CAMBIAR EL NÚMERO A MÁS GRANDE PARA ALARGAR EL JUEGO
            const randomPosition = Math.floor(Math.random() * positions.length);
            const randomFire = Math.random();
            if (randomFire > 0.65) {
                this.fires.push(new Fire(...positions[randomPosition],'blue'));
            } else {
                this.fires.push(new Fire(...positions[randomPosition],'red'));
            };
            
        };
    },
    checkProductShots: function(product) { //give product array as argument
        if (product[0]) {
            const bottomPoint = this.fires[0].y + this.fires[0].heightOfImage;
            for (let i = 0; i < product.length; i++) {
                if (product[0].y <= bottomPoint && product[0].y > (bottomPoint - 5) && product[0].isAdequateProduct(this.fires[0].type)) {
                    //defining the limits of the fire
                    const leftLimit = this.fires[0].x;
                    const rightLimit = this.fires[0].x + this.fires[0].widthOfSingleImage;
                    if (product[0].x >= leftLimit && product[0].x <= rightLimit) {
                        this.impactUpdate();
                    };
                };
            };
        };
    },
    impactUpdate: function() {
        this.fires[0].intensity--;
        firefighter.productShots.shift();
        points.innerHTML = parseInt(points.innerHTML) + 10;
        if (this.fires[0].intensity === 0) {
            this.fires.shift();
        }; 
    },
    gameEnd: function() {
        if (this.fires.length === 0 || time.innerHTML == 0 || firefighter.lives === 0) {
            return true;
        }
        return false; 
    },
    fallingBricks: function() {
        if (Math.random() > 0.99) {
            const x = Math.floor(Math.random() * 900 + 150);
            this.bricks.push(new Brick(x));
        }
        this.drawBricks();
    },
    drawBricks: function() {
        this.bricks.forEach(function(brick) {
            brick.y += 4;
            context.fillStyle = '#B73239';
            context.fillRect(brick.x, brick.y, brick.width, brick.height);
        });
        if (this.bricks[0] && this.bricks[0].y > canvas.height) {
            this.bricks.shift();
        }
    }
};