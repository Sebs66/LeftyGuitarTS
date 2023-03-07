import { scalesCromatic,intervalsText,relativeIntervalsText } from "./diccionarioNotas.js";


export class Table {
    scaleDiv;
    tonesDiv;
    keyDiv;
    intervalsDiv;
    notesDiv;
    colorsDiv;
    relativeScaleDiv;
    resetDiv;
    constructor(id:string){
        const divTable = document.getElementById(id) as HTMLDivElement;
        const h3_1 = document.createElement('h3');
        h3_1.innerText = 'Escala';
        divTable.appendChild(h3_1);
        const scaleDiv = new ScaleDiv(divTable);
        this.scaleDiv = scaleDiv;
        const tonesDiv = new TonesDiv(divTable);
        this.tonesDiv = tonesDiv;
        const keyDiv = new KeyDiv(divTable);
        this.keyDiv = keyDiv;
        const intervalsDiv = new IntervalsDiv(divTable);
        this.intervalsDiv = intervalsDiv;
        const notesDiv = new NotesDiv(divTable);
        this.notesDiv = notesDiv;
        const colorsDiv = new ColorsDiv(divTable);
        this.colorsDiv = colorsDiv
        const h3_2 = document.createElement('h3');
        h3_2.innerText = 'Intervalos escala relativa:';
        divTable.appendChild(h3_2);
        const relativeScaleDiv = new RelativeScaleDiv(divTable);
        this.relativeScaleDiv = relativeScaleDiv
        const resetDiv = new ResetDiv(divTable);
        this.resetDiv = resetDiv;
    }
}

class ScaleDiv {
    element;
    constructor(parentDiv:HTMLDivElement){
        const scaleDiv = document.createElement('div');
        parentDiv.appendChild(scaleDiv);
        scaleDiv.classList.add('divEscala')
        const dropDownDiv = document.createElement('div');
        scaleDiv.appendChild(dropDownDiv);
        dropDownDiv.classList.add('dropDownMenues');
        const select = document.createElement('select') as HTMLSelectElement;
        dropDownDiv.appendChild(select);
        const option1 = document.createElement('option') as HTMLOptionElement;
        const option2 = document.createElement('option') as HTMLOptionElement;
        const option3 = document.createElement('option') as HTMLOptionElement;
        const option4 = document.createElement('option') as HTMLOptionElement;
        select.appendChild(option1);
        select.appendChild(option2);
        select.appendChild(option3);
        select.appendChild(option4);
        option1.setAttribute('value','major');
        option2.setAttribute('value','minor');
        option3.setAttribute('value','pentatonicMajor');
        option4.setAttribute('value','pentatonicMinor');
        option1.innerText = 'Mayor';
        option2.innerText = 'Menor';
        option3.innerText = 'Pentatonica Major';
        option4.innerText = 'Pentatonica Menor';
        select.setAttribute('id','escala');
        select.setAttribute('onchange','update();');
        this.element = scaleDiv
    }
}

class TonesDiv {
    element;
    constructor(parentDiv:HTMLDivElement){
        const tonesDiv = document.createElement('div');
        parentDiv.appendChild(tonesDiv);
        tonesDiv.classList.add('tabla__tonos');
        for (let i = 0; i<7;i++){
            const p = document.createElement('p');
            p.id = tonesId[i];
            p.innerText = tonesTxt[i];
            tonesDiv.appendChild(p);
            if ([1,3,4,5,6].includes(i)){ /// Cuando tengo que agregar la clase.
                p.classList.add(`${tonesId[i]}Mayor`)
            }
        }
        this.element = tonesDiv
    }
}

class KeyDiv {
    element: HTMLDivElement;
    constructor(parentDiv:HTMLDivElement){
        const keyDiv = document.createElement('div');
        keyDiv.classList.add('key');
        parentDiv.appendChild(keyDiv);
        const select = document.createElement('select');
        keyDiv.appendChild(select);
        select.setAttribute('id','rootNote');
        select.setAttribute('onchange','update();');
        for (let i = 0;i<cromaticNotes.length;i++){
            const option = document.createElement('option');
            option.setAttribute('value',cromaticNotes[i]);
            option.innerText = cromaticNotes[i];
            select.appendChild(option);
        }
        this.element = keyDiv;
    }
}

class IntervalsDiv {
    element;
    constructor(parentDiv:HTMLDivElement){
        const intervalDiv = document.createElement('div');
        intervalDiv.classList.add('tabla__intervalos');
        parentDiv.appendChild(intervalDiv);
        for (let i = 0;i <13;i++){
            const button = document.createElement('button');
            button.setAttribute('value',String(i));
            button.setAttribute('onclick','toggleIntervalo(this);');
            button.classList.add('intervalos')
            button.innerText = intervalsText[i]
            intervalDiv.appendChild(button)
        }
        this.element = intervalDiv;
    }
}

class NotesDiv {
    element;
    constructor(parentDiv:HTMLDivElement){
        const notesDiv = document.createElement('div');
        notesDiv.classList.add('tabla__notas');
        parentDiv.appendChild(notesDiv);
        for (let i=0;i<13;i++){
            const button = document.createElement('button');
            button.classList.add('boton');
            button.innerText = scalesCromatic['major']['c'][i];
            notesDiv.appendChild(button);
        }
        this.element = notesDiv;
    }
}

class ColorsDiv {
    constructor(parentDiv:HTMLDivElement){
        const colorsDiv = document.createElement('div');
        colorsDiv.classList.add('tabla__ColoresNotas');
        parentDiv.appendChild(colorsDiv);
        for (let i = 0; i<13; i++){
            const select = document.createElement('select');
            select.disabled = true;
            select.setAttribute('onchange','changeColor(this);');
            select.setAttribute('position',String(i));
            for (let i = 0; i<4; i++){
                const option = document.createElement('option');
                option.setAttribute('value',`color${i+1}`);
                option.classList.add(`color${i+1}`);
                select.appendChild(option);
                if (i == 1){
                    option.selected = true;
                }
            }
            colorsDiv.appendChild(select);
        }
    }
}

class RelativeScaleDiv {
    constructor(parentDiv:HTMLDivElement){
        const relativeScaleDiv = document.createElement('div');
        relativeScaleDiv.classList.add('tabla__intervalos','escalaRelativa');
        parentDiv.appendChild(relativeScaleDiv);
        for (let i = 0; i<13; i++){
            const button = document.createElement('button');
            button.setAttribute('value',String(i));
            button.setAttribute('onchange','toggleIntervalo(this);');
            button.classList.add('intervalos')
            button.innerText = relativeIntervalsText[i]
            relativeScaleDiv.appendChild(button)
        }
    }
}

class ResetDiv {
    constructor(parentDiv:HTMLDivElement){
        const resetDiv = document.createElement('div');
        resetDiv.classList.add('botones_reset');
        parentDiv.appendChild(resetDiv);
        const button1 = document.createElement('button');
        const button2 = document.createElement('button');
        button1.setAttribute('id','botonColores');
        button1.setAttribute('onclick','resetColors();');
        button1.classList.add('resetColors');
        button1.innerText = 'Reset Colors';
        button2.setAttribute('id','botonNotes');
        button2.setAttribute('onclick','update();');
        button2.classList.add('resetNotes');
        button2.innerText = 'Reset Notes';
        resetDiv.appendChild(button1);
        resetDiv.appendChild(button2);
    }
}

const cromaticNotes = ['C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#','Ab','A','A#','Bb','B'];

const tonesId = ['tono1','tono2','tono3','tono4','tono5','semiTono1','semiTono2'];
const tonesTxt = ['T','T','T','T','T','S','S'];