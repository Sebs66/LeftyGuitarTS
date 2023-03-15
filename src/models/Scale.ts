import { scalesCromatic, activeNotes } from "../utils/KeySignatures.js";
import { Eventing } from "./Eventing.js";
import { Model, Events } from "./Model.js";

export interface ScaleProps {
    root:string;
    color:string;
    scaleCromatic: string[];
    activeNotes: boolean[];
}

export class Scale extends Model{
    scaleCromatic: string[];
    activeNotes: boolean[];

    constructor(public root:string,public scaleColor:string){
        const events: Events = new Eventing(); //* Hardcoded.
        super(events)
        this.root = this.root.toLowerCase().replace('#','sharp');
        let cromatic = scaleColor;
        if (scaleColor === 'pentatonicMajor'){
            cromatic = 'major'
        } else if (scaleColor === 'pentatonicMinor'){
            cromatic = 'minor'
        }
        this.scaleCromatic = scalesCromatic[cromatic][this.root]
        this.activeNotes = activeNotes[scaleColor] /// Solo debemos preocuparnos en activar/desactivar acá.
    }

    toggleNote(index:number): void {
        this.activeNotes[index] = this.activeNotes[index] ? false : true
        this.trigger('toggleNote')
    }

    getAll(): boolean[] {
        return this.activeNotes
    }

    get(index:number): boolean {
        return this.activeNotes[index]
    }

    changeScale(note:string,scaleColor:string){
        this.root = note.toLowerCase().replace('#','sharp');
        this.scaleColor = scaleColor;
        let cromatic = scaleColor;
        if (scaleColor === 'pentatonicMajor'){
            cromatic = 'major'
        } else if (scaleColor === 'pentatonicMinor'){
            cromatic = 'minor'
        }
        this.scaleCromatic = scalesCromatic[cromatic][this.root]
        this.activeNotes = activeNotes[scaleColor] /// Solo debemos preocuparnos en activar/desactivar acá.
        this.trigger('scaleChange');
    }

}
