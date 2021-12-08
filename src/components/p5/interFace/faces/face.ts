import * as P5 from "p5";
import { Vector, Size } from '../../../../utils/math';

export abstract class Face {
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

    constructor() {
        this.positions = [];
    }

    public abstract drawEyes(p5: P5, size: Size): void;
    public abstract drawMouth(p5: P5, size: Size): void;

    public abstract drawEyesRange(p5: P5, size: Size): void;
    public abstract drawMouthRange(p5: P5, size: Size): void;
}