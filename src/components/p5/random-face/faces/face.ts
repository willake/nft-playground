import * as p5 from "p5";
import { Vector, Size } from '../../../../utils/3d';

export abstract class Face {
    protected canvas: p5;
    public positions: Vector[];
    static debugStorkeColors = [
        [170, 57, 57],
        [170, 132, 57],
        [170, 166, 57]
    ];
    static debugFillColors = [
        [212, 106, 106],
        [212, 177, 106],
        [212, 209, 106]
    ];

    constructor(canvas: p5) {
        this.positions = [];
        this.canvas = canvas;
    }

    public abstract drawLeftEye(image: p5.Image, size: Size): void;
    public abstract drawRightEye(image: p5.Image, size: Size): void;
    public abstract drawMouth(image: p5.Image, size: Size): void;

    public abstract drawLeftEyeRange(size: Size): void;
    public abstract drawRightEyeRange(size: Size): void;
    public abstract drawMouthRange(size: Size): void;
}