import * as p5 from "p5";
import * as math3d from "../../../utils/3d";

function importAll(req: __WebpackModuleApi.RequireContext) {
    let images : any[] = [];
    
    req.keys().forEach((item, index) => { 
        images.push(req(item)); 
    });
    
    return images;
}

interface Size {
    width: number,
    height: number
}

const eyes = importAll(require.context('./images/eyes', false, /\.(png)$/));
const mouths = importAll(require.context('./images/mouth', false, /\.(png)$/));
const CANVAS_SIZE: Size = { width: 600, height: 600 };
const IMAGE_SIZE: Size = { width: 270, height: 270 };

function shuffleArray(array: any[]) {
    return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

let Face1 = [
    [CANVAS_SIZE.width / 2 - 150, CANVAS_SIZE.height / 2 - 50, 0, 0 ],
    [CANVAS_SIZE.width / 2 + 150, CANVAS_SIZE.height / 2 - 50, 0, 0 ],
    [CANVAS_SIZE.width / 2, CANVAS_SIZE.height / 2 + 100, 0, 0 ],
    [CANVAS_SIZE.width / 2, CANVAS_SIZE.height / 2, 0, 0 ],
];

let Face2 = [
    [CANVAS_SIZE.width / 2, CANVAS_SIZE.height / 2, 0, 0 ],
    [CANVAS_SIZE.width / 2, CANVAS_SIZE.height / 2, 0, 0 ],
    [CANVAS_SIZE.width / 2, CANVAS_SIZE.height / 2, 0, 0 ],
    [CANVAS_SIZE.width / 2, CANVAS_SIZE.height / 2, 0, 0 ],
];

let Face3 = [
    [CANVAS_SIZE.width / 2, CANVAS_SIZE.height / 2, 0, 0 ],
    [CANVAS_SIZE.width / 2, CANVAS_SIZE.height / 2, 0, 0 ],
    [CANVAS_SIZE.width / 2, CANVAS_SIZE.height / 2, 0, 0 ],
    [CANVAS_SIZE.width / 2, CANVAS_SIZE.height / 2, 0, 0 ],
];

// function randomPosition(position: Position, range: number) {
//     let xRandom = (Math.random() * range * 2) - range;
//     let yRandom = (Math.random() * range * 2) - range;
//     return { x: position.x + xRandom, y: position.y + yRandom } as Position;
// }

const RandomFaceSketch = function(sketch: p5) {
    let width = 600;
    let height = 600;

    let eyeImage: p5.Image;

    let mouthImage: p5.Image;

    let face = Face1;

    // let positions = [facePostion.leftEye, facePostion.rightEye, facePostion.mouth]
    //     .map(pos => randomPosition(pos, 30));

    sketch.setup = function setup() {
        sketch.createCanvas(width, height);
        eyeImage = this.loadImage(eyes[Math.floor(Math.random() * eyes.length)].default);
        mouthImage = this.loadImage(mouths[Math.floor(Math.random() * mouths.length)].default);

        // positions = shuffleArray(positions);
        let trans = math3d.MatrixMath.identity;
        trans = math3d.MatrixMath.scale(trans, [2, 2, 2, 0])
        face.map(
            v => math3d.MatrixMath.multiplyMatrixAndPoint(trans, v)
        );
    };

    sketch.draw = function draw() {
        this.image(
            eyeImage, 
            face[0][0] - IMAGE_SIZE.width / 2, 
            face[0][1] - IMAGE_SIZE.height / 2, 
            IMAGE_SIZE.width, IMAGE_SIZE.height);

        this.image(
            eyeImage, 
            face[1][0] - IMAGE_SIZE.width / 2, 
            face[1][1] - IMAGE_SIZE.height / 2,
            IMAGE_SIZE.width, IMAGE_SIZE.height);
        
        this.image(
            mouthImage, 
            face[2][0] - IMAGE_SIZE.width / 2, 
            face[2][1] - IMAGE_SIZE.height / 2,
            IMAGE_SIZE.width, IMAGE_SIZE.height);
    };
} 

export default RandomFaceSketch;