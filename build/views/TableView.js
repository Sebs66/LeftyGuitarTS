import { scalesCromatic, intervalsText, relativeIntervalsText } from "../utils/KeySignatures.js";
import { HtmlConstructor, HTMLSelectionConstructor } from "./HtmlConstructor.js";
export class Table extends HtmlConstructor {
    constructor(id, scale) {
        const root = document.getElementById(id);
        if (!root) {
            throw new Error('No root element present!');
        }
        super(root);
        this.id = id;
        this.scale = scale;
        this.onResetColors = () => {
            this.notesDiv.resetColors(this.notesDiv.elements, 'color1');
            this.colorsDiv.resetColors(this.colorsDiv.elements, 'color1');
            this.intervalsDiv.resetColors(this.intervalsDiv.elements, 'color1');
        };
        this.onSetScale = () => {
            const scaleColor = this.scaleDiv.getValue();
            const note = this.keyDiv.getValue();
            this.scale.changeScale(note, scaleColor); /// activará el evento 'change' que desencadena en render.
        };
        this.render = () => {
            this.tonesDiv.update(this.scale.scaleColor); /// Change positions of the tones in tonesDiv.
            this.intervalsDiv.update(this.scale);
            this.notesDiv.update(this.scale);
            this.colorsDiv.update(this.scale);
            this.relativeScaleDiv.update(this.scale);
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
        this.bindEvents(); //* Acá vamos a bindear los events relacionados a los elementos html.
        this.bindModel(); //* Acá bindemos los eventos del modelo.
    }
    bindModel() {
        this.scale.on('scaleChange', () => {
            console.log('scaleChange event');
            this.render(); /// Cada vez que cambiemos el modelo, vamos a volver a rendear.
        });
        this.scale.on('toggleNote', () => {
            /// No estamos usando este evento, ya que con el evento del HTML podemos rescatar directamente el index del boton que apretamos.
            //console.log('toggleNote event');
        });
    }
    eventsMap() {
        return {
            /// Tiene que ser un evento que exista si es aplicado a un dom.
            'change:select#escala': this.onSetScale,
            'change:select#rootNote': this.onSetScale,
            'click:button.intervalos': this.onClickButton.bind(this),
            'change:.tabla__ColoresNotas select': this.onSetColor.bind(this),
            'click:button#botonColores': this.onResetColors,
            'click:button#botonNotes': this.render,
        };
    }
    onSetColor(event) {
        const target = event.target;
        const colorClass = target.selectedOptions[0].value;
        const index = Number(target.getAttribute('position'));
        this.colorsDiv.changeColor(target, colorClass); /// ScaleColor element.
        //this.relativeScaleDiv.changeColor(this.relativeScaleDiv.elements[index] as HTMLElement,colorClass); /// We dont change the relative scales colors.
        this.notesDiv.changeColor(this.notesDiv.elements[index], colorClass);
        this.intervalsDiv.changeColor(this.intervalsDiv.elements[index], colorClass);
    }
    onClickButton(event) {
        const target = event.target;
        //console.log(target.dataset.value)
        const index = Number(target.dataset.value);
        if (!index) {
            throw new Error('dataset.value of target element is undefined');
        }
        this.scale.toggleNote(index);
        this.toggleElements(index);
    }
    toggleElements(index) {
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
}
/**
 * In charge of the construction of html div with the select for the color of the scale.
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
/**
 * In charge of the construction and update of the div that has the tone distance information.
 */
class TonesDiv extends HtmlConstructor {
    constructor(parent) {
        super(parent);
        this.tonesParent = this.addElement('div', { 'class': 'tabla__tonos' });
        const tonesId = ['tono1', 'tono2', 'tono3', 'tono4', 'tono5', 'semiTono1', 'semiTono2'];
        const tonesTxt = ['T', 'T', 'T', 'T', 'T', 'S', 'S'];
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
/**
 * In charge of the construction of the select element fot the key of the scale.
 */
class KeyDiv extends HtmlConstructor {
    constructor(parent) {
        super(parent);
        const keyDiv = this.addElement('div', { class: 'key' });
        this.select = this.addSubElement(keyDiv, 'select', { id: 'rootNote' });
        let cromaticNotes = scalesCromatic['major']['c'];
        for (let i = 0; i < cromaticNotes.length; i++) {
            const option = this.addSubElement(this.select, 'option', { value: cromaticNotes[i], innerText: cromaticNotes[i] });
        }
        this.element = keyDiv;
    }
    getValue() {
        return this.select.value;
    }
}
/**
 * In charge of the construction and update of the div with the intervals buttons.
 */
class IntervalsDiv extends HTMLSelectionConstructor {
    constructor(parent) {
        super(parent);
        const colorClass = 'color1';
        this.intervalsParent = this.addElement('div', { class: 'tabla__intervalos' });
        for (let i = 0; i < 13; i++) {
            const button = this.addSubElement(this.intervalsParent, 'button', { 'data-value': String(i), class: `intervalos ${colorClass}`, innerText: intervalsText[i] });
        }
        this.elements = Array.from(this.intervalsParent.children);
    }
    update(scale) {
        this.updateSelected(this.elements, scale.activeNotes);
    }
}
/**
 * In charge of the construction and update of the div that contains the notes HTML buttons.
 */
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
/**
 * In charge of the construction and update of the div that contains the HTML selects for the colors of the buttons
 */
class ColorsDiv extends HTMLSelectionConstructor {
    constructor(parent) {
        super(parent);
        const colorsParent = this.addElement('div', { class: 'tabla__ColoresNotas' });
        for (let i = 0; i < 13; i++) {
            const select = this.addSubElement(colorsParent, 'select', { position: String(i) });
            select.disabled = true;
            select.classList.add('color1');
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
/**
 * In charge of the construction and update of the div that contains the relative scale interval buttons.
 */
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
/**
 * In charge of the construction of the two last buttons for reset the colors and the notes of the scale.
 */
class ResetDiv extends HtmlConstructor {
    constructor(parent) {
        super(parent);
        const resetDiv = this.addElement('div', { class: 'botones_reset' });
        const button1 = this.addSubElement(resetDiv, 'button', { id: 'botonColores', innerText: 'Reset Colors', class: 'resetColors' });
        const button2 = this.addSubElement(resetDiv, 'button', { id: 'botonNotes', innerText: 'Reset Notes', class: 'resetNotes' });
    }
}
