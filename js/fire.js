'use strict';

class Fire {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 640;
        this.height = 384;
        this.intensity = 5;
        this.type = type;
        this.time = 25;
        this.img = new Image();
        this.img.src = this.type == 'blue' ? 'images/fire2_64.png' : 'images/fire1_64.png';
        //variables needed for the animation
        this.totalNumberOfFrames = 10 // ten images in the first image row
        this.imageFrameNumber = 0 // This is changed to make the sprite animate  
        this.widthOfImage = this.width; // find the width of the image
        this.heightOfImage = this.height / 6; // find the height of the image
        this.widthOfSingleImage = this.widthOfImage / this.totalNumberOfFrames; // The width of each image in the spirite
        this.rowImage = 0;
    }
    animateFire() {
        const n = 3; //
        this.imageFrameNumber++; // changes the sprite we look at
        this.imageFrameNumber = this.imageFrameNumber % this.totalNumberOfFrames; // Change this from 0 to 1 to 2 ... up to 9 
        if (this.imageFrameNumber === 0) {
            this.rowImage++; // change the row we are on
            this.rowImage = this.rowImage % 6; // Change this from 0 to 1 to 2 ... up to 5
        }
        context.drawImage(
            this.img, 
            this.imageFrameNumber * this.widthOfSingleImage, 0 + this.rowImage * this.heightOfImage, // x and y - where in the sprite
            this.widthOfSingleImage, this.heightOfImage, // width and height
            this.x - this.widthOfSingleImage, this.y - this.heightOfImage * n / 2 - 25, // x and y - where on the screen
            this.widthOfSingleImage * n, this.heightOfImage * n // width and height displayed
        );
    }
    //check time explosion
    checkExplosion() {
        if (this.time == 0) {
            playSound('bomb');
            return true;
        }
        return false;
    }
};