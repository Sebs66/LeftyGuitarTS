import { scalesCromatic, intervalsText, relativeIntervalsText } from "../models/diccionarioNotas.js";
import { HtmlConstructor, HTMLSelectionConstructor } from "./HtmlConstructor.js";
import { Scale } from "../models/Scale.js";
export class Table extends HtmlConstructor {
    constructor(id) {
        const root = document.getElementById(id);
        if (!root) {
            throw new Error('No root element present!');
        }
        super(root);
        this.id = id;
        this.onSetScale = () => {
            const scaleColor = this.scaleDiv.getValue();
            const note = this.keyDiv.getValue();
            //* Creamos una nueva escala y rendereamos la table de nuevo.
            const scale = new Scale(note, scaleColor);
            this.render(scale);
        };
        this.root = root;
        const h3_1 = document.createElement('h3');
        h3_1.innerText = 'Escala';
        this.root.appendChild(h3_1);
        this.scaleDiv = new ScaleDiv(this.root);
        this.tonesDiv = new TonesDiv(this.root);
        this.keyDiv = new KeyDiv(this.root);
        this.intervalsDiv = new IntervalsDiv(this.root);
        this.notesDiv = new NotesDiv(this.root);
        this.colorsDiv = new ColorsDiv(this.root);
        const h3_2 = document.createElement('h3');
        h3_2.innerText = 'Intervalos escala relativa:';
        this.root.appendChild(h3_2);
        this.relativeScaleDiv = new RelativeScaleDiv(this.root);
        this.resetDiv = new ResetDiv(this.root);
        this.bindEvents(); //* Acá vamos a bindear los elements
    }
    eventsMap() {
        return {
            /// Tiene que ser un evento que exista si es aplicado a un dom.
            'change:select#escala': this.onSetScale,
            'change:select#rootNote': this.onSetScale,
            'click:button.intervalos': this.onClickButton.bind(this),
            'change:.tabla__ColoresNotas select': this.onSetColor.bind(this)
        };
    }
    onSetColor(event) {
        const target = event.target;
        const colorClass = target.selectedOptions[0].value;
        const index = Number(target.getAttribute('position'));
        this.notesDiv.changeColor(target, colorClass); /// ScaleColor element.
        this.relativeScaleDiv.changeColor(this.relativeScaleDiv.elements[index], colorClass);
        this.notesDiv.changeColor(this.notesDiv.elements[index], colorClass);
        this.intervalsDiv.changeColor(this.intervalsDiv.elements[index], colorClass);
    }
    onClickButton(event) {
        const target = event.target;
        console.log(target.dataset.value);
        const index = Number(target.dataset.value);
        if (!index) {
            throw new Error('dataset.value of target element is undefined');
        }
        this.notesDiv.toggleElement(this.notesDiv.elements[index]);
        this.intervalsDiv.toggleElement(this.intervalsDiv.elements[index]);
        this.relativeScaleDiv.toggleElement(this.relativeScaleDiv.elements[index]);
        this.colorsDiv.toggleElement(this.colorsDiv.elements[index]);
        const colorElement = this.colorsDiv.elements[index];
        if (colorElement.disabled) {
            colorElement.disabled = false;
        }
        else {
            colorElement.disabled = true;
        }
    }
    bindEvents() {
        const eventsMap = this.eventsMap();
        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');
            document.querySelectorAll(selector).forEach((element) => {
                element.addEventListener(eventName, eventsMap[eventKey]); //* Agrega el evento.
            });
        }
    }
    render(scale) {
        this.tonesDiv.update(scale.color); /// Change positions of the tones in tonesDiv.
        this.intervalsDiv.update(scale);
        this.notesDiv.update(scale);
        this.colorsDiv.update(scale);
        this.relativeScaleDiv.update(scale);
    }
}
/**
 * In charge of the construction and behaviour of the scales button.
 */
class ScaleDiv extends HtmlConstructor {
    constructor(parent) {
        super(parent);
        this.parent = parent;
        const scaleDiv = this.addElement('div', { class: 'divEscala' });
        const dropDownDiv = this.addSubElement(scaleDiv, 'div', { class: 'dropDownMenu' });
        this.select = this.addSubElement(dropDownDiv, 'select', { id: 'escala' });
        const option1 = this.addSubElement(this.select, 'option', { value: 'major', innerText: 'Mayor' });
        const option2 = this.addSubElement(this.select, 'option', { value: 'minor', innerText: 'Menor' });
        const option3 = this.addSubElement(this.select, 'option', { value: 'pentatonicMajor', innerText: 'Pentatonica Mayor' });
        const option4 = this.addSubElement(this.select, 'option', { value: 'pentatonicMinor', innerText: 'Pentatonica Menor' });
        this.element = scaleDiv;
    }
    getValue() {
        return this.select.value;
    }
}
class TonesDiv extends HtmlConstructor {
    constructor(parent) {
        super(parent);
        this.tonesParent = this.addElement('div', { 'class': 'tabla__tonos' });
        for (let i = 0; i < 7; i++) {
            const p = this.addSubElement(this.tonesParent, 'p', { id: tonesId[i], innerText: tonesTxt[i] });
            this.tonesParent.appendChild(p);
            if ([1, 3, 4, 5, 6].includes(i)) { /// Cuando tengo que agregar la clase.
                p.classList.add(`${tonesId[i]}Mayor`);
            }
        }
    }
    update(color) {
        const toneElements = Array.from(this.tonesParent.children);
        if (color === 'pentatonicMinor') {
            color = 'minor';
        }
        else if (color === 'pentatonicMajor') {
            color = 'major';
        }
        const intervalos = ['tono2', 'tono4', 'tono5', 'semiTono1', 'semiTono2']; /// Only these are relevants.
        color = color == 'major' ? 'Mayor' : 'Menor';
        toneElements.forEach(tone => {
            tone.setAttribute('class', ''); /// Erase all clases.
            if (intervalos.indexOf(tone.id) !== -1) {
                tone.setAttribute('class', `${tone.id}${color}`);
            }
        });
    }
}
class KeyDiv extends HtmlConstructor {
    constructor(parent) {
        super(parent);
        const keyDiv = this.addElement('div', { class: 'key' });
        this.select = this.addSubElement(keyDiv, 'select', { id: 'rootNote', onchange: 'update();' });
        for (let i = 0; i < cromaticNotes.length; i++) {
            const option = this.addSubElement(this.select, 'option', { value: cromaticNotes[i], innerText: cromaticNotes[i] });
        }
        this.element = keyDiv;
    }
    getValue() {
        return this.select.value;
    }
}
class IntervalsDiv extends HTMLSelectionConstructor {
    constructor(parent) {
        super(parent);
        this.intervalsParent = this.addElement('div', { class: 'tabla__intervalos' });
        for (let i = 0; i < 13; i++) {
            const button = this.addSubElement(this.intervalsParent, 'button', { 'data-value': String(i), class: 'intervalos', innerText: intervalsText[i] });
        }
        this.elements = Array.from(this.intervalsParent.children);
    }
    update(scale) {
        this.updateSelected(this.elements, scale.activeNotes);
    }
}
class NotesDiv extends HTMLSelectionConstructor {
    constructor(parent) {
        super(parent);
        this.notesParent = this.addElement('div', { class: 'tabla__notas' });
        for (let i = 0; i < 13; i++) {
            const button = this.addSubElement(this.notesParent, 'button', { class: 'boton', innerText: scalesCromatic['major']['c'][i] });
        }
        this.elements = Array.from(this.notesParent.children);
    }
    update(scale) {
        const selected = 'seleccionado';
        this.updateSelected(this.elements, scale.activeNotes);
        this.elements.forEach((element, index) => {
            element.textContent = scale.scaleCromatic[index];
        });
    }
}
class ColorsDiv extends HTMLSelectionConstructor {
    constructor(parent) {
        super(parent);
        const colorsParent = this.addElement('div', { class: 'tabla__ColoresNotas' });
        for (let i = 0; i < 13; i++) {
            const select = this.addSubElement(colorsParent, 'select', { position: String(i) });
            select.disabled = true;
            select.classList.add('color2');
            for (let i = 0; i < 4; i++) {
                const option = this.addSubElement(select, 'option', { value: `color${i + 1}`, class: `color${i + 1}` });
            }
            colorsParent.appendChild(select);
        }
        this.elements = Array.from(colorsParent.children);
    }
    update(scale) {
        this.updateSelected(this.elements, scale.activeNotes);
        this.elements.forEach((element, index) => {
            if (scale.activeNotes[index]) {
                element.disabled = false;
            }
            else {
                element.disabled = true;
            }
        });
    }
}
class RelativeScaleDiv extends HTMLSelectionConstructor {
    constructor(parent) {
        super(parent);
        this.relativeScaleParent = this.addElement('div', { class: 'tabla__intervalos escalaRelativa' });
        for (let i = 0; i < 13; i++) {
            const button = this.addSubElement(this.relativeScaleParent, 'button', { 'data-value': String(i), class: 'intervalos', innerText: relativeIntervalsText[i] });
        }
        this.elements = Array.from(this.relativeScaleParent.children);
    }
    update(scale) {
        this.updateSelected(this.elements, scale.activeNotes);
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
