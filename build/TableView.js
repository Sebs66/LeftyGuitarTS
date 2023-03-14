import { scalesCromatic, intervalsText, relativeIntervalsText } from "./models/diccionarioNotas.js";
import { HtmlConstructor } from "./views/HtmlConstructor.js";
export class Table {
    constructor(id) {
        this.onSetScale = () => {
            console.log(this);
            return this.scaleDiv.onSetScale;
        };
        const divTable = document.getElementById(id);
        const h3_1 = document.createElement('h3');
        h3_1.innerText = 'Escala';
        divTable.appendChild(h3_1);
        this.scaleDiv = new ScaleDiv(divTable);
        this.tonesDiv = new TonesDiv(divTable);
        this.keyDiv = new KeyDiv(divTable);
        this.intervalsDiv = new IntervalsDiv(divTable);
        this.notesDiv = new NotesDiv(divTable);
        this.colorsDiv = new ColorsDiv(divTable);
        const h3_2 = document.createElement('h3');
        h3_2.innerText = 'Intervalos escala relativa:';
        divTable.appendChild(h3_2);
        this.relativeScaleDiv = new RelativeScaleDiv(divTable);
        this.resetDiv = new ResetDiv(divTable);
        this.bindEvents(); //* Acá vamos a bindear los elements
    }
    eventsMap() {
        return {
            /// Tiene que ser un evento que exista si es aplicado a un dom.
            'change:select#escala': this.onSetScale
        };
    }
    bindEvents() {
        const eventsMap = this.eventsMap();
        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');
            document.querySelectorAll(selector).forEach((element) => {
                console.log('element');
                console.log(element);
                element.addEventListener(eventName, eventsMap[eventKey]); //* Agrega el evento.
            });
        }
    }
}
/**
 * In charge of the construction and behaviour of the scales button.
 */
class ScaleDiv extends HtmlConstructor {
    constructor(parent) {
        super(parent);
        const scaleDiv = this.addElement('div', { class: 'divEscala' });
        const dropDownDiv = this.addSubElement(scaleDiv, 'div', { class: 'dropDownMenu' });
        const select = this.addSubElement(dropDownDiv, 'select', { id: 'escala' });
        const option1 = this.addSubElement(select, 'option', { value: 'major', innerText: 'Mayor' });
        const option2 = this.addSubElement(select, 'option', { value: 'minor', innerText: 'Menor' });
        const option3 = this.addSubElement(select, 'option', { value: 'pentatonicMajor', innerText: 'Pentatonica Mayor' });
        const option4 = this.addSubElement(select, 'option', { value: 'pentatonicMinor', innerText: 'Pentatonica Menor' });
        this.element = scaleDiv;
    }
    onSetScale() {
        console.log('cambiar escala');
    }
}
class TonesDiv extends HtmlConstructor {
    constructor(parent) {
        super(parent);
        const tonesDiv = this.addElement('div', { 'class': 'tabla__tonos' });
        for (let i = 0; i < 7; i++) {
            const p = this.addSubElement(tonesDiv, 'p', { id: tonesId[i], innerText: tonesTxt[i] });
            tonesDiv.appendChild(p);
            if ([1, 3, 4, 5, 6].includes(i)) { /// Cuando tengo que agregar la clase.
                p.classList.add(`${tonesId[i]}Mayor`);
            }
        }
        this.element = tonesDiv;
    }
}
class KeyDiv extends HtmlConstructor {
    constructor(parent) {
        super(parent);
        const keyDiv = this.addElement('div', { class: 'key' });
        const select = this.addSubElement(keyDiv, 'select', { id: 'rootNote', onchange: 'update();' });
        for (let i = 0; i < cromaticNotes.length; i++) {
            const option = this.addSubElement(select, 'option', { value: cromaticNotes[i], innerText: cromaticNotes[i] });
        }
        this.element = keyDiv;
    }
}
class IntervalsDiv extends HtmlConstructor {
    constructor(parent) {
        super(parent);
        const interval = this.addElement('div', { class: 'tabla__intervalos' });
        for (let i = 0; i < 13; i++) {
            const button = this.addSubElement(interval, 'button', { value: String(i), onclick: 'toggleIntervalo(this)', class: 'intervalos', innerText: intervalsText[i] });
        }
        this.element = interval;
    }
}
class NotesDiv extends HtmlConstructor {
    constructor(parent) {
        super(parent);
        const notesDiv = this.addElement('div', { class: 'tabla__notas' });
        for (let i = 0; i < 13; i++) {
            const button = this.addSubElement(notesDiv, 'button', { class: 'boton', innerText: scalesCromatic['major']['c'][i] });
        }
        this.element = notesDiv;
    }
}
class ColorsDiv extends HtmlConstructor {
    constructor(parent) {
        super(parent);
        const colorsDiv = this.addElement('div', { class: 'tabla__ColoresNotas' });
        for (let i = 0; i < 13; i++) {
            const select = this.addSubElement(colorsDiv, 'select', { position: String(i), onchange: 'changeColor(this);' });
            select.disabled = true;
            for (let i = 0; i < 4; i++) {
                const option = this.addSubElement(select, 'option', { value: `color${i + 1}`, class: `color${i + 1}` });
                if (i == 1) {
                    option.selected = true;
                }
            }
            colorsDiv.appendChild(select);
        }
    }
}
class RelativeScaleDiv extends HtmlConstructor {
    constructor(parent) {
        super(parent);
        const relativeScaleDiv = this.addElement('div', { class: 'tabla__intervalos escalaRelativa' });
        for (let i = 0; i < 13; i++) {
            const button = this.addSubElement(relativeScaleDiv, 'button', { value: String(i), onchange: 'toggleIntervalo(this)', class: 'intervalos', innerText: relativeIntervalsText[i] });
        }
    }
}
class ResetDiv extends HtmlConstructor {
    constructor(parent) {
        super(parent);
        const resetDiv = this.addElement('div', { class: 'botones_reset' });
        const button1 = this.addSubElement(resetDiv, 'button', { id: 'botonColores', onclick: 'resetColors()', innerText: 'Reset Colors', class: 'resetColors' });
        const button2 = this.addSubElement(resetDiv, 'button', { id: 'botonNotes', onclick: 'update()', innerText: 'Reset Notes', class: 'resetNotes' });
    }
}
const cromaticNotes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
const tonesId = ['tono1', 'tono2', 'tono3', 'tono4', 'tono5', 'semiTono1', 'semiTono2'];
const tonesTxt = ['T', 'T', 'T', 'T', 'T', 'S', 'S'];
