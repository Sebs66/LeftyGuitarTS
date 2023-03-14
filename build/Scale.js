import { scaleIntervals, scalesCromatic, activeNotes } from "./diccionarioNotas.js";
export class Scale {
    constructor(note, color) {
        let cromatic = color;
        this.root = note;
        this.color = color;
        this.scaleCromatic = scalesCromatic[cromatic][note.toLowerCase()];
        this.scaleIntervals = scaleIntervals[color];
        this.activeNotes = activeNotes[color]; /// Solo debemos preocuparnos en activar/desactivar acá.
    }
    toggleNote(index) {
        this.activeNotes[index] = this.activeNotes[index] ? false : true;
    }
}
