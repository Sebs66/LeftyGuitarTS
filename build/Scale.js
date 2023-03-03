import { scaleIntervals, scalesCromatic } from "./diccionarioNotas.js";
export class Scale {
    constructor(note, color) {
        let cromatic = color;
        this.root = note;
        this.color = color;
        if (color === 'pentatonicMajor') {
            cromatic = 'major';
        }
        if (color === 'pentatonicMinor') {
            cromatic = 'minor';
        }
        this.scaleCromatic = scalesCromatic[cromatic][note];
        this.scaleIntervals = scaleIntervals[color];
    }
}
