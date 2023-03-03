import { scaleIntervals,scalesCromatic } from "./diccionarioNotas.js";

export class Scale{
    root:string;
    color:string;
    scaleCromatic: string[];
    scaleIntervals: number[];

    constructor(note:string,color:string){
        let cromatic = color;
        this.root = note;
        this.color = color;
        if (color === 'pentatonicMajor'){
            cromatic = 'major'
        } if (color === 'pentatonicMinor'){
            cromatic = 'minor'
        }
        this.scaleCromatic = scalesCromatic[cromatic][note]
        this.scaleIntervals = scaleIntervals[color]
    }
}