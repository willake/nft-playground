import * as P5 from "p5";
import { Vector, Size } from "../../../../utils/math";
import { Face } from "./face";

export class Face2 extends Face {
    eye: P5.Image;
    mouth: P5.Image;
    // range from 0 to 1, it will multiply canvas size 
    leftEyeRange = 0.4;
    rightEyeRange = 0.7;
    mouthEyeRange = 0.6;

    faceRotation = 0.0;

    constructor(p5: P5, eye: P5.Image, mouth: P5.Image) {
        super();

        this.eye = eye;
        this.mouth = mouth;

        // left eye
        let leftEyeRand = this.randomPointInArcRange(
            Math.floor(Math.random() * 180) + 90,
            Math.floor(Math.random() * p5.width / 2 * this.leftEyeRange)
        );

        this.positions[0] = [
            p5.width / 2 + leftEyeRand[0],
            p5.height / 2 + leftEyeRand[1] - 100,
            0, 0
        ];

        // mouth
        let mouthRand = this.randomPointInArcRange(
            Math.floor(Math.random() * 180 - 90),
            Math.floor(Math.random() * p5.width / 2 * this.mouthEyeRange)
        );

        this.positions[1] = [
            p5.width / 2 + mouthRand[0],
            p5.height / 2 + mouthRand[1] + 100,
            0, 0
        ];

        let radian =  Math.atan2(
            this.positions[1][1] - this.positions[0][1],
            this.positions[1][0] - this.positions[0][1]
        );

        this.faceRotation = Math.abs(radian * 180 / Math.PI) - 90;
        this.faceRotation = this.faceRotation * Math.PI / 180;
    }

    public drawEyes(p5: P5, size: Size) : void {
        p5.push();
        p5.translate(
            this.positions[0][0],
            this.positions[0][1]
        )
        p5.rotate(this.faceRotation);
        p5.scale(-1, 1);
        p5.image(
            this.eye, 
            0, 
            0,
            size.width, size.height);
        p5.pop();
    }

    public drawMouth(p5: P5, size: Size) : void {
        p5.push();
        p5.translate(
            this.positions[1][0],
            this.positions[1][1],
        )
        p5.rotate(this.faceRotation);
        p5.image(
            this.mouth, 
            0, 
            0,
            size.width, size.height);
        p5.pop();
    }

    public drawEyesRange(p5: P5, size: Size) : void {
        let strokeColor = Face.debugStorkeColors[0];
        let fillColor = Face.debugFillColors[0];
        p5.push();
        p5.stroke(
            strokeColor[0],
            strokeColor[1],
            strokeColor[2]
        );
        p5.strokeWeight(5);
        p5.fill(
            fillColor[0], 
            fillColor[1],
            fillColor[2], 
            0.2 * 255
        );
        p5.arc(
            p5.width / 2, 
            p5.height / 2 - 100, 
            Math.floor(p5.width * this.leftEyeRange), Math.floor(p5.height * this.leftEyeRange), Math.PI, 0);
        p5.pop();
    }

    public drawMouthRange(p5: P5, size: Size) : void {
        let strokeColor = Face.debugStorkeColors[2];
        let fillColor = Face.debugFillColors[2];
        p5.push();
        p5.push();
        p5.stroke(
            strokeColor[0],
            strokeColor[1],
            strokeColor[2]
        );
        p5.strokeWeight(5);
        p5.fill(
            fillColor[0], 
            fillColor[1],
            fillColor[2], 
            0.2 * 255
        );
        p5.arc(
            p5.width / 2, 
            p5.height / 2 + 100, 
            Math.floor(p5.width * this.mouthEyeRange), Math.floor(p5.height * this.mouthEyeRange), 0, Math.PI);
        p5.pop();
    }

    private randomPointInArcRange(angle: number, length: number) : Vector {
        let x = Math.sin(angle * (Math.PI / 180)) * length;
        let y = Math.cos(angle * (Math.PI / 180)) * length;

        return [x, y, 0, 0];
    }
}