'use strict';

class Product {
    constructor(x, type, context) {
        this.x = x;
        this.y = canvas.height - 200;
        this.radius = 20;
        this.type = type;
        this.context = context;
    }
    draw() {
        //first update the position of the product shot, then draw them in the canvas
        this.y -= 5;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        if (this.type === 'water') {
            context.fillStyle = 'aqua';
        } else if (this.type === 'dry-chem') {
            context.fillStyle = 'white';
        }
        context.fill();
        context.closePath();
    }
    isAdequateProduct(fireType) {
        if (fireType === 'blue' && this.type === 'dry-chem') {
            return true;
        } else if (fireType === 'red' && this.type === 'water') {
            return true;
        } else {
            return false;
        }
    }
};