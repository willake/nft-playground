import * as P5 from "p5";
import { Vector, Size } from "../../../utils/math";
import { Face } from "./faces/face";
import { Face1 } from "./faces/face-1";
import { Face2 } from "./faces/face-2";
import { importAllImages } from '../../../utils/assets-tools';

const backgroundColors : Vector[] = [
    [84, 113, 158, 0],
    [246, 208, 206, 0],
    [178, 156, 122, 0],
    [252, 199, 135, 0],
    [112, 193, 170, 0],
    [138, 161, 177, 0],
    [224, 213, 151, 0],
    [114, 160, 135, 0],
    [153, 204, 220, 0]
];

const CANVAS_SIZE: Size = { width: 1200, height: 1200 };
const IMAGE_SIZE: Size = { width: 800, height: 800 };

export function interFaceSketch(p5: P5) {

    let background: Vector;

    let face: Face | null;

    p5.setup = () => {
        let eyeImages = importAllImages(require.context('./images/eyes', false, /\.(png)$/));
        let mouthImages = importAllImages(require.context('./images/mouth', false, /\.(png)$/));

        p5.createCanvas(CANVAS_SIZE.width, CANVAS_SIZE.height);

        let random = Math.round(Math.random());
        
        switch(random) {
            case 1: 
                face = new Face2(
                    p5,
                    p5.loadImage(eyeImages[Math.floor(Math.random() * eyeImages.length)].default),
                    p5.loadImage(mouthImages[Math.floor(Math.random() * mouthImages.length)].default)
                ); 
                break;
            default: 
                face = new Face1(
                    p5,
                    p5.loadImage(eyeImages[Math.floor(Math.random() * eyeImages.length)].default),
                    p5.loadImage(eyeImages[Math.floor(Math.random() * eyeImages.length)].default),
                    p5.loadImage(mouthImages[Math.floor(Math.random() * mouthImages.length)].default)
                ); 
                break;
        }

        background = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    }

    p5.draw = () => {
        if(face == null) {
            return;
        }

        p5.background(background[0], background[1], background[2]);
        p5.imageMode(p5.CENTER);

        face.drawEyes(p5, IMAGE_SIZE);
        face.drawMouth(p5, IMAGE_SIZE);

        face.drawEyesRange(p5, IMAGE_SIZE);
        face.drawMouthRange(p5, IMAGE_SIZE);
    }
}

// const interFaceSketch = function(sketch: P5) {
//     let background: Vector;

//     let leftEyeImage: P5.Image;
//     let rightEyeImage: P5.Image;

//     let mouthImage: P5.Image;

//     let face: Face;

//     sketch.preload = function preload() {
//         leftEyeImage = this.loadImage(eyes[Math.floor(Math.random() * eyes.length)].default);
//         rightEyeImage = this.loadImage(eyes[Math.floor(Math.random() * eyes.length)].default);
//         mouthImage = this.loadImage(mouths[Math.floor(Math.random() * mouths.length)].default);
//     }

//     sketch.setup = function setup() {
//         sketch.createCanvas(CANVAS_SIZE.width, CANVAS_SIZE.height);

//         let random = Math.round(Math.random());
        
//         switch(random) {
//             case 0: face = new Face1(this); break;
//             case 1: face = new Face2(this); break;
//             default: face = new Face1(this); break;
//         }

//         background = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
//     };

//     sketch.draw = function draw() {
//         if(face == null) {
//             return;
//         }

//         this.background(background[0], background[1], background[2]);
//         this.imageMode(this.CENTER);

//         face.drawLeftEye(leftEyeImage, IMAGE_SIZE);
//         face.drawRightEye(rightEyeImage, IMAGE_SIZE);
//         face.drawMouth(mouthImage, IMAGE_SIZE);

//         face.drawLeftEyeRange(IMAGE_SIZE);
//         face.drawRightEyeRange(IMAGE_SIZE);
//         face.drawMouthRange(IMAGE_SIZE);
//     };
// } 