import { Scale } from "./Scale.js";

export class Guitar {
    /// A guitar contains 22 frets.
    string1 : GuitarString; /// lowest (highest pitch) string. In standard tunning will be E.
    string2 : GuitarString;
    string3 : GuitarString;
    string4 : GuitarString;
    string5 : GuitarString;
    string6 : GuitarString;
    constructor(scale:Scale,tunning:string[]){
        this.string1 = new GuitarString(tunning[0],scale)
        this.string2 = new GuitarString(tunning[1],scale)
        this.string3 = new GuitarString(tunning[2],scale)
        this.string4 = new GuitarString(tunning[3],scale)
        this.string5 = new GuitarString(tunning[4],scale)
        this.string6 = new GuitarString(tunning[5],scale)
    }

    getAt(fret:number): string[] {
        return [
            this.string1.getAt(fret),
            this.string2.getAt(fret),
            this.string3.getAt(fret),
            this.string4.getAt(fret),
            this.string5.getAt(fret),
            this.string6.getAt(fret)
        ]
    }

    getIndexes(note:string): number[][] {
        return [
            this.string1.getIndexes(note),
            this.string2.getIndexes(note),
            this.string3.getIndexes(note),
            this.string4.getIndexes(note),
            this.string5.getIndexes(note),
            this.string6.getIndexes(note)
        ]
    }
}

export class GuitarString {
    rootNote : string;
    notes : string[];
    constructor(rootNote:string, scale:Scale){
        //console.log(rootNote)
        this.rootNote = rootNote;
        const indexOfRoot = scale.scaleCromatic.indexOf(rootNote)
        const notes = [...scale.scaleCromatic.slice(indexOfRoot),...scale.scaleCromatic.slice(1,indexOfRoot)] /// Rearranging the notes in the guitarString order.
        this.notes = [...notes,...notes]
    }

    /**
     * 
     * @param index : number
     * @returns the note at the given index in the string.
     */
    getAt(index:number): string{
        return this.notes[index];
    }
    /**
     * 
     * @param note : string
     * @returns an array of the indexes of the note in the string
     */
    getIndexes(note:string): number[] {
        const indexes:number[] = [];
        note = note;
        for (let i=0;i<this.notes.length;i++){
            if (this.notes[i] === note){
                indexes.push(i)
            }
        }
        return indexes
    }
}