'use strict';

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
};