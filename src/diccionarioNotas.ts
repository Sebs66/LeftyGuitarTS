// Escalas

type Scale = {
    [key:string]:string[]
}

type  ScalesCromatic = {
    [key:string]: Scale;
}

export const scalesCromatic: ScalesCromatic = {
    minor:{
        c:["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B","C"],
        d:["D","Eb","E","F","Gb","G","Ab","A","Bb","B","C","Db","D"],
        e:["E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E"],
        f:["F","Gb","G","Ab","A","Bb","B","C","Db","D","Eb","E","F"],
        g:["G","Ab","A","Bb","B","C","Db","D","Eb","E","F","Gb","G"],
        a:["A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A"],
        b:["B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],

        csharp:["C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#"],
        dsharp:["D#","E","E#","F#","G","G#","A","A#","B","C","C#","D","D#"],
        fsharp:["F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#"],
        gsharp:["G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#"],
        asharp:["A#","B","B#","C#","C##","D#","E","E#","F#","G","G#","A","A#"],

        db:["Db","E","Eb","E","F","Gb","G","Ab","Bbb","Bb","B","C","Db"], // doble bb, se usa C# en su lugar.
        eb:["Eb","E","F","Gb","G","Ab","A","Bb","B","C","Db","Eb","E"],
        gb:["Gb","G","Ab","Bbb","Bb","Cb","C","Db","Ebb","Eb","E","F","Gb"], // doble bb, se usa F# en su lugar.
        ab:["Ab","A","Bb","Cb","C","Db","D","Eb","Fb","F","Gb","G","Ab"],
        bb:["Bb","B","C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb"],
    },

    major : {
        c:["C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C"],
        d:["D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D"],
        e:["E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E"],
        f:["F","Gb","G","Ab","A","Bb","B","C","Db","D","Eb","E","F"],
        g:["G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G"],
        a:["A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A"],
        b:["B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],

        csharp:["C#","D","D#","E","E#","F#","G","G#","A","A#","B","B#","C#"],
        dsharp:["D#","E","E#","F##","G","G#","A","A#","B","C","C#","C##","D#"], // doble ##, se usa Eb en su lugar.
        fsharp:["F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#"],
        gsharp:["G#","A","A#","B","C","C#","D","D#","E","F","F#","F##","G#"], // doble ##, se usa Ab en su lugar.
        asharp:["A#","B","B#","C#","C##","D#","E","E#","F#","F##","G#","G##","A#"], //doble ##, se usa Bb en su lugar.

        cb:["Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B","C","Db"],
        db:["D#","E","E#","F#","G","G#","A","A#","B","C","C#","D","D#"],
        eb:["Eb","E","F","Gb","G","Ab","A","Bb","B","C","Db","D","Eb"],
        gb:["Gb","G","Ab","A","Bb","Cb","C","Db","D","Eb","E","F","Gb"],
        ab:["Ab","A","Bb","B","C","Db","D","Eb","E","F","Gb","G","Ab"],
        bb:["Bb","B","C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb"]
    }
}

export const scaleIntervals: {[key:string]:number[]} = {
    major : [2,2,1,2,2,2,1],
    minor : [2,1,2,2,1,2,2],
    pentatonicMajor: [2,2,3,2,3],
    pentatonicMinor: [3,2,2,3,2],
} 