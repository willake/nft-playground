export type Vector = number[];

export type Matrix = number[];
let sin = Math.sin;
let cos = Math.cos;

export class Shape {
    vertices: Vector[];

    constructor() {
        this.vertices = [];
    }
}

export class MatrixMath {
    static identity : Matrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
    static scale(matrix: Matrix, v: Vector) : Matrix {

        return MatrixMath.multiplyMatrices(
            matrix, 
            [
                v[0], 0, 0, 0,
                0, v[1], 0, 0,
                0, 0, v[2], 0,
                0, 0, 0, 1
            ]
        );
    }

    static translate(matrix: Matrix, v: Matrix) : Matrix {

        return MatrixMath.multiplyMatrices(
            matrix,
            [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                v[0], v[1], v[2], 1
            ]
        )
    }

    static rotateAroundXAxis(matrix: Matrix, a: number) {

        return MatrixMath.multiplyMatrices(
            matrix,
            [
                1,       0,        0,     0,
                0,  cos(a),  -sin(a),     0,
                0,  sin(a),   cos(a),     0,
                0,       0,        0,     1
            ]
        );
      }
      
    static rotateAroundYAxis(matrix: Matrix, a: number) {

        return MatrixMath.multiplyMatrices(
            matrix,
            [
                cos(a),   0, sin(a),   0,
                0,   1,      0,   0,
                -sin(a),   0, cos(a),   0,
                0,   0,      0,   1
            ]
        );
      }
      
    static rotateAroundZAxis(matrix: Matrix, a: number) {
        return MatrixMath.multiplyMatrices(
            matrix,
            [
                cos(a), -sin(a),    0,    0,
                sin(a),  cos(a),    0,    0,
                     0,       0,    1,    0,
                     0,       0,    0,    1
            ]
        );
      }

    static multiplyMatrices(matrixA: Matrix, matrixB: Matrix) {
        let row0: Vector = [matrixB[ 0], matrixB[ 1], matrixB[ 2], matrixB[ 3]];
        let row1: Vector = [matrixB[ 4], matrixB[ 5], matrixB[ 6], matrixB[ 7]];
        let row2 = [matrixB[ 8], matrixB[ 9], matrixB[10], matrixB[11]];
        let row3 = [matrixB[12], matrixB[13], matrixB[14], matrixB[15]];
      
        let result0 = MatrixMath.multiplyMatrixAndPoint(matrixA, row0);
        let result1 = MatrixMath.multiplyMatrixAndPoint(matrixA, row1);
        let result2 = MatrixMath.multiplyMatrixAndPoint(matrixA, row2);
        let result3 = MatrixMath.multiplyMatrixAndPoint(matrixA, row3);

        return [
          result0[0], result0[1], result0[2], result0[3],
          result1[0], result1[1], result1[2], result1[3],
          result2[0], result2[1], result2[2], result2[3],
          result3[0], result3[1], result3[2], result3[3]
        ];
      }

    static multiplyMatrixAndPoint(matrix: Matrix, point: Vector) : Vector {
        let c0r0 = matrix[0], c1r0 = matrix[1], c2r0 = matrix[2], c3r0 = matrix[3];
        let c0r1 = matrix[4], c1r1 = matrix[5], c2r1 = matrix[6], c3r1 = matrix[7];
        let c0r2 = matrix[8], c1r2 = matrix[9], c2r2 = matrix[10], c3r2 = matrix[11];
        let c0r3 = matrix[12], c1r3 = matrix[13], c2r3 = matrix[14], c3r3 = matrix[15];
      
        let resultX = (point[0] * c0r0) + (point[1] * c0r1) + (point[2] * c0r2) + (point[3] * c0r3);
        let resultY = (point[0] * c1r0) + (point[1] * c1r1) + (point[2] * c1r2) + (point[3] * c1r3);
        let resultZ = (point[0] * c2r0) + (point[1] * c2r1) + (point[2] * c2r2) + (point[3] * c2r3);
        let resultW = (point[0] * c3r0) + (point[1] * c3r1) + (point[2] * c3r2) + (point[3] * c3r3);
      
        return [resultX, resultY, resultZ, resultW]
    };
}