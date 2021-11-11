import * as p5 from "p5";
import eye from './images/eye.png';
import nose from './images/nose.png';
import mouth from './images/mouth.png';

interface Position {
    x: number,
    y: number
}

interface Size {
    width: number,
    height: number
}

interface FacePosition {
    leftEye: Position,
    rightEye: Position,
    nose: Position,
    mouth: Position
}

function shuffleArray(array: any[]) {
    return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function offsetCenter(size: Size) {
    return { xOffset: -size.width / 2, yOffset: -size.height / 2 };
}

function randomPosition(position: Position, range: number) {
    let xRandom = (Math.random() * range * 2) - range;
    let yRandom = (Math.random() * range * 2) - range;
    return { x: position.x + xRandom, y: position.y + yRandom } as Position;
}

const RandomFaceSketch = function(sketch: p5) {
    let width = 600;
    let height = 600;

    let eyeImage: p5.Image;
    let eyeSize : Size = { width: 100, height: 60 };

    let noseImage: p5.Image;
    let noseSize : Size = { width: 76, height: 100 };

    let mouthImage: p5.Image;
    let mouthSize : Size = { width: 130, height: 82 };

    let facePostion : FacePosition = {
        leftEye: { x: (width / 2) - 100, y: 100},
        rightEye: { x: (width / 2) + 100, y: 100},
        nose: { x: (width / 2), y: 250 },
        mouth: { x: (width / 2), y: 380 }
    };

    let positions = [facePostion.leftEye, facePostion.rightEye, facePostion.nose, facePostion.mouth]
        .map(pos => randomPosition(pos, 30));
    

    let offsetEye = offsetCenter(eyeSize);
    let offsetNose = offsetCenter(noseSize);
    let offsetMouth = offsetCenter(mouthSize);

    sketch.setup = function setup() {
        sketch.createCanvas(width, height);
        eyeImage = this.loadImage(eye);
        noseImage = this.loadImage(nose);
        mouthImage = this.loadImage(mouth);

        positions = shuffleArray(positions);
    };

    sketch.draw = function draw() {
        this.image(
            eyeImage, 
            positions[0].x + offsetEye.xOffset, 
            positions[0].y + offsetEye.yOffset, 
            eyeSize.width, eyeSize.height);

        this.image(
            eyeImage, 
            positions[1].x + offsetEye.xOffset, 
            positions[1].y + offsetEye.yOffset, 
            eyeSize.width, eyeSize.height);
        
        this.image(
            noseImage, 
            positions[2].x + offsetNose.xOffset, 
            positions[2].y + offsetNose.yOffset, 
            noseSize.width, noseSize.height);
        
        this.image(
            mouthImage, 
            positions[3].x + offsetMouth.xOffset, 
            positions[3].y + offsetMouth.yOffset, 
            mouthSize.width, mouthSize.height);
    };
} 

export default RandomFaceSketch;