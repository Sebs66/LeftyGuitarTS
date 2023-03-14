import { scaleIntervals, scalesCromatic, activeNotes } from "./diccionarioNotas.js";
import { Eventing } from "./Eventing.js";
import { Model } from "./Model.js";
export class Scale extends Model {
    constructor(note, color) {
        const events = new Eventing(); //* Hardcoded.
        super(events);
        this.root = note.toLowerCase().replace('#', 'sharp');
        let cromatic = color;
        this.color = color;
        if (color === 'pentatonicMajor') {
            cromatic = 'major';
        }
        else if (color === 'pentatonicMinor') {
            cromatic = 'minor';
        }
        this.scaleCromatic = scalesCromatic[cromatic][this.root];
        this.scaleIntervals = scaleIntervals[color];
        this.activeNotes = activeNotes[color]; /// Solo debemos preocuparnos en activar/desactivar acá.
    }
    toggleNote(index) {
        this.activeNotes[index] = this.activeNotes[index] ? false : true;
        this.trigger('change');
    }
    getAll() {
        return this.activeNotes;
    }
    get(index) {
        return this.activeNotes[index];
    }
}
