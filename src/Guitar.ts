class Guitar {
    /// A guitar contains 22 frets.
}

class NotePosition {
    string : string;
    fret : number;
    note : string;
    constructor(string:string,fret:number){
        this.string = string;
        this.fret = fret;
        this.note = '';
    }
}

class Fret {
    fret : number;
    constructor(fret:number){
        this.fret = 0;
    }
}