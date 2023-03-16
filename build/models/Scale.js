import { scalesCromatic, activeNotes } from "../utils/KeySignatures.js";
import { Eventing } from "./Eventing.js";
import { Model } from "./Model.js";
export class Scale extends Model {
    constructor(root, scaleColor) {
        const events = new Eventing(); //* Hardcoded.
        super(events);
        this.root = root;
        this.scaleColor = scaleColor;
        this.root = this.root.toLowerCase().replace('#', 'sharp');
        let cromatic = scaleColor;
        if (scaleColor === 'pentatonicMajor') {
            cromatic = 'major';
        }
        else if (scaleColor === 'pentatonicMinor') {
            cromatic = 'minor';
        }
        this.scaleCromatic = scalesCromatic[cromatic][this.root];
        this.activeNotes = [...activeNotes[scaleColor]]; /// Solo debemos preocuparnos en activar/desactivar acá.
    }
    toggleNote(index) {
        this.activeNotes[index] = this.activeNotes[index] ? false : true;
        this.trigger('toggleNote');
    }
    getAll() {
        return this.activeNotes;
    }
    get(index) {
        return this.activeNotes[index];
    }
    changeScale(note, scaleColor) {
        this.root = note.toLowerCase().replace('#', 'sharp');
        this.scaleColor = scaleColor;
        let cromatic = scaleColor;
        if (scaleColor === 'pentatonicMajor') {
            cromatic = 'major';
        }
        else if (scaleColor === 'pentatonicMinor') {
            cromatic = 'minor';
        }
        this.scaleCromatic = scalesCromatic[cromatic][this.root];
        this.activeNotes = activeNotes[scaleColor]; /// Solo debemos preocuparnos en activar/desactivar acá.
        this.trigger('scaleChange');
    }
    reset() {
        this.activeNotes = [...activeNotes[this.scaleColor]]; /// Solo debemos preocuparnos en activar/desactivar acá. 
    }
}
