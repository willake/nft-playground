import * as p5 from "p5";
import { Vector, Size } from "../../../../utils/3d";
import { Face } from "./face";

export class Face1 extends Face {
    // range from 0 to 1, it will multiply canvas size 
    leftEyeRange = 0.7;
    rightEyeRange = 0.7;
    mouthEyeRange = 0.6;

    faceRotation = 0.0;

    constructor(canvas: p5) {
        super(canvas);

        // left eye
        let leftEyeRand = this.randomPointInArcRange(
            Math.floor(Math.random() * 90) + 180,
            Math.floor(Math.random() * this.canvas.width / 2 * this.leftEyeRange)
        );

        this.positions[0] = [
            canvas.width / 2 + leftEyeRand[0] - 50,
            canvas.height / 2 + leftEyeRand[1] - 50,
            0, 0
        ];

        // right eye
        let rightEyeRand = this.randomPointInArcRange(
            Math.floor(Math.random() * 90 + 90),
            Math.floor(Math.random() * this.canvas.width / 2 * this.rightEyeRange)
        );

        this.positions[1] = [
            canvas.width / 2 + rightEyeRand[0] + 50,
            canvas.height / 2 + rightEyeRand[1] - 50,
            0, 0
        ];

        // mouth
        let mouthRand = this.randomPointInArcRange(
            Math.floor(Math.random() * 180 - 90),
            Math.floor(Math.random() * this.canvas.width / 2 * this.mouthEyeRange)
        );

        this.positions[2] = [
            canvas.width / 2 + mouthRand[0],
            canvas.height / 2 + mouthRand[1] + 50,
            0, 0
        ];

        let eyeCenter = [
            (this.positions[1][0] + this.positions[0][0]) / 2,
            (this.positions[1][1] + this.positions[0][1]) / 2,
            0,
            0
        ]

        let radian =  Math.atan2(
            this.positions[2][1] - eyeCenter[1],
            this.positions[2][0] - eyeCenter[0]
        );

        this.faceRotation = Math.abs(radian * 180 / Math.PI) - 90;
        this.faceRotation = this.faceRotation * Math.PI / 180;
    }

    public drawLeftEye(image: p5.Image, size: Size) : void {
        this.canvas.push();
        this.canvas.translate(
            this.positions[0][0],
            this.positions[0][1]
        )
        this.canvas.rotate(this.faceRotation);
        this.canvas.scale(-1, 1);
        this.canvas.image(
            image, 
            0, 
            0,
            size.width, size.height);
        this.canvas.pop();
    }

    public drawRightEye(image: p5.Image, size: Size) : void {
        this.canvas.push();
        this.canvas.translate(
            this.positions[1][0],
            this.positions[1][1],
        )
        this.canvas.rotate(this.faceRotation);
        this.canvas.image(
            image, 
            0, 
            0,
            size.width, size.height);
        this.canvas.pop();
    }

    public drawMouth(image: p5.Image, size: Size) : void {
        this.canvas.push();
        this.canvas.translate(
            this.positions[2][0],
            this.positions[2][1],
        )
        this.canvas.rotate(this.faceRotation);
        this.canvas.image(
            image, 
            0, 
            0,
            size.width, size.height);
        this.canvas.pop();
    }

    public drawLeftEyeRange(size: Size) : void {
        let strokeColor = Face.debugStorkeColors[0];
        let fillColor = Face.debugFillColors[0];
        this.canvas.push();
        this.canvas.stroke(
            strokeColor[0],
            strokeColor[1],
            strokeColor[2]
        );
        this.canvas.strokeWeight(5);
        this.canvas.fill(
            fillColor[0], 
            fillColor[1],
            fillColor[2], 
            0.2 * 255
        );
        this.canvas.arc(
            this.canvas.width / 2 - 50, 
            this.canvas.height / 2 - 50, 
            Math.floor(this.canvas.width * this.leftEyeRange), Math.floor(this.canvas.height * this.leftEyeRange), Math.PI, - Math.PI / 2);
        this.canvas.pop();
    }

    public drawRightEyeRange(size: Size) : void {
        let strokeColor = Face.debugStorkeColors[1];
        let fillColor = Face.debugFillColors[1];
        this.canvas.push();
        this.canvas.push();
        this.canvas.stroke(
            strokeColor[0],
            strokeColor[1],
            strokeColor[2]
        );
        this.canvas.strokeWeight(5);
        this.canvas.fill(
            fillColor[0], 
            fillColor[1],
            fillColor[2], 
            0.2 * 255
        );
        this.canvas.arc(
            this.canvas.width / 2 + 50, 
            this.canvas.height / 2 - 50, 
            Math.floor(this.canvas.width * this.rightEyeRange), Math.floor(this.canvas.height * this.rightEyeRange), - Math.PI / 2, 0);
        this.canvas.pop();
    }

    public drawMouthRange(size: Size) : void {
        let strokeColor = Face.debugStorkeColors[2];
        let fillColor = Face.debugFillColors[2];
        this.canvas.push();
        this.canvas.push();
        this.canvas.stroke(
            strokeColor[0],
            strokeColor[1],
            strokeColor[2]
        );
        this.canvas.strokeWeight(5);
        this.canvas.fill(
            fillColor[0], 
            fillColor[1],
            fillColor[2], 
            0.2 * 255
        );
        this.canvas.arc(
            this.canvas.width / 2, 
            this.canvas.height / 2 + 50, 
            Math.floor(this.canvas.width * this.mouthEyeRange), Math.floor(this.canvas.height * this.mouthEyeRange), 0, Math.PI);
        this.canvas.pop();
    }

    private randomPointInArcRange(angle: number, length: number) : Vector {
        let x = Math.sin(angle * (Math.PI / 180)) * length;
        let y = Math.cos(angle * (Math.PI / 180)) * length;

        return [x, y, 0, 0];
    }
}