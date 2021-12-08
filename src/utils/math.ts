export type Vector = number[];

export interface Size {
    width: number,
    height: number
}

export function randomPointInArcRange(angle: number, length: number) : Vector {
    let x = Math.sin(angle * (Math.PI / 180)) * length;
    let y = Math.cos(angle * (Math.PI / 180)) * length;

    return [x, y, 0, 0];
}