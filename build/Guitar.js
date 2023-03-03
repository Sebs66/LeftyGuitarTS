class Guitar {
    constructor(scale, tunning) {
        this.string1 = new GuitarString(tunning[0], scale);
        this.string2 = new GuitarString(tunning[1], scale);
        this.string3 = new GuitarString(tunning[2], scale);
        this.string4 = new GuitarString(tunning[3], scale);
        this.string5 = new GuitarString(tunning[4], scale);
        this.string6 = new GuitarString(tunning[5], scale);
    }
}
export class GuitarString {
    constructor(rootNote, scale) {
        console.log(rootNote);
        this.rootNote = rootNote;
        const indexOfRoot = scale.scaleCromatic.indexOf(rootNote);
        const notes = [...scale.scaleCromatic.slice(indexOfRoot), ...scale.scaleCromatic.slice(1, indexOfRoot)]; /// Rearranging the notes in the guitarString order.
        this.notes = [...notes, ...notes];
    }
    /**
     *
     * @param index : number
     * @returns the note at the given index in the string.
     */
    getAt(index) {
        return this.notes[index];
    }
    /**
     *
     * @param note : string
     * @returns an array of the indexes of the note in the string
     */
    getIndexes(note) {
        const indexes = [];
        note = note;
        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i] === note) {
                indexes.push(i);
            }
        }
        return indexes;
    }
}
