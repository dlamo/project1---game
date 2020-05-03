'use strict';

class Product {
    constructor(x, product, context) {
        this.x = x;
        this.y = canvas.height - 200;
        this.radius = 20;
        this.product = product;
        this.context = context;
    }
    draw() {
        //first update the position of the product shot, then draw them in the canvas
        this.y -= 5;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        if (this.product === 'water') {
            context.fillStyle = 'aqua';
        } else if (this.product === 'dry-chem') {
            context.fillStyle = 'white';
        }
        context.fill();
        context.closePath();
    }
    drawActualProduct() {
        this.x = 1080;
        this.y = 190;
        this.draw();
    }
    isAdequateProduct(fireType) {
        if (fireType === 'blue' && this.product === 'dry-chem') {
            return true;
        } else if (fireType === 'red' && this.product === 'water') {
            return true;
        } else {
            return false;
        }
    }
};