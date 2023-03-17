// Escalas

type Scale = {
    [key:string]:string[]
}

type  ScalesCromatic = {
    [key:string]: Scale;
}

export const scalesCromatic: ScalesCromatic = {
    minor:{
        c:["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],
        d:["D","Eb","E","F","Gb","G","Ab","A","Bb","B","C","Db"],
        e:["E","F","F#","G","G#","A","A#","B","C","C#","D","D#"],
        f:["F","Gb","G","Ab","A","Bb","B","C","Db","D","Eb","E"],
        g:["G","Ab","A","Bb","B","C","Db","D","Eb","E","F","Gb"],
        a:["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"],
        b:["B","C","C#","D","D#","E","F","F#","G","G#","A","A#"],

        csharp:["C#","D","D#","E","F","F#","G","G#","A","A#","B","C"],
        dsharp:["D#","E","E#","F#","G","G#","A","A#","B","C","C#","D"],
        fsharp:["F#","G","G#","A","A#","B","C","C#","D","D#","E","F"],
        gsharp:["G#","A","A#","B","C","C#","D","D#","E","F","F#","G"],
        asharp:["A#","B","B#","C#","C##","D#","E","E#","F#","G","G#","A"],

        db:["Db","E","Eb","E","F","Gb","G","Ab","Bbb","Bb","B","C"], // doble bb, se usa C# en su lugar.
        eb:["Eb","E","F","Gb","G","Ab","A","Bb","B","C","Db","Eb"],
        gb:["Gb","G","Ab","Bbb","Bb","Cb","C","Db","Ebb","Eb","E","F"], // doble bb, se usa F# en su lugar.
        ab:["Ab","A","Bb","Cb","C","Db","D","Eb","Fb","F","Gb","G"],
        bb:["Bb","B","C","Db","D","Eb","E","F","Gb","G","Ab","A"],
    },

    major : {
        c:["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],
        d:["D","D#","E","F","F#","G","G#","A","A#","B","C","C#"],
        e:["E","F","F#","G","G#","A","A#","B","C","C#","D","D#"],
        f:["F","Gb","G","Ab","A","Bb","B","C","Db","D","Eb","E"],
        g:["G","G#","A","A#","B","C","C#","D","D#","E","F","F#"],
        a:["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"],
        b:["B","C","C#","D","D#","E","F","F#","G","G#","A","A#"],

        csharp:["C#","D","D#","E","E#","F#","G","G#","A","A#","B","B#"],
        dsharp:["D#","E","E#","F##","G","G#","A","A#","B","C","C#","C##"], // doble ##, se usa Eb en su lugar.
        fsharp:["F#","G","G#","A","A#","B","C","C#","D","D#","E","F"],
        gsharp:["G#","A","A#","B","C","C#","D","D#","E","F","F#","F##"], // doble ##, se usa Ab en su lugar.
        asharp:["A#","B","B#","C#","C##","D#","E","E#","F#","F##","G#","G##"], //doble ##, se usa Bb en su lugar.

        cb:["Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B","C"],
        db:["D#","E","E#","F#","G","G#","A","A#","B","C","C#","D"],
        eb:["Eb","E","F","Gb","G","Ab","A","Bb","B","C","Db","D"],
        gb:["Gb","G","Ab","A","Bb","Cb","C","Db","D","Eb","E","F"],
        ab:["Ab","A","Bb","B","C","Db","D","Eb","E","F","Gb","G"],
        bb:["Bb","B","C","Db","D","Eb","E","F","Gb","G","Ab","A"]
    }
}

export const activeNotes:{[key:string]:boolean[]} = {
    major: [true,false,true,false,true,true,false,true,false,true,false,true,true],
    minor: [true,false,true,true,false,true,false,true,true,false,true,false,true],
    pentatonicMajor: [true,false,true,false,true,false,false,true,false,true,false,false,true],
    pentatonicMinor: [true,false,false,true,false,true,false,true,false,false,true,false,true],
}

export const intervalsText = ['R','2m','2M','3m','3M','4','Tri','5','6m','6M','7m','7M','R'];
export const relativeIntervalsText = ['3m','3M','4','Tri','5','6m','6M','7m','7M','r','2m','2M','3m'];
