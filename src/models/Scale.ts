import { scaleIntervals,scalesCromatic, activeNotes } from "./diccionarioNotas.js";
import { Eventing } from "./Eventing.js";
import { Model, Events } from "./Model.js";

export interface ScaleProps {
    root:string;
    color:string;
    scaleCromatic: string[];
    activeNotes: boolean[];
}

export class Scale extends Model{

    root:string;
    color:string;
    scaleCromatic: string[];
    scaleIntervals: number[];
    activeNotes: boolean[];

    constructor(note:string,color:string){
        const events: Events = new Eventing(); //* Hardcoded.
        super(events)
        this.root = note.toLowerCase().replace('#','sharp');
        let cromatic = color;
        this.color = color;
        if (color === 'pentatonicMajor'){
            cromatic = 'major'
        } else if (color === 'pentatonicMinor'){
            cromatic = 'minor'
        }
        this.scaleCromatic = scalesCromatic[cromatic][this.root]
        this.scaleIntervals = scaleIntervals[color]
        this.activeNotes = activeNotes[color] /// Solo debemos preocuparnos en activar/desactivar acá.
    }

    toggleNote(index:number): void {
        this.activeNotes[index] = this.activeNotes[index] ? false : true
        this.trigger('change')
    }

    getAll(): boolean[] {
        return this.activeNotes
    }

    get(index:number): boolean {
        return this.activeNotes[index]
    }
}
