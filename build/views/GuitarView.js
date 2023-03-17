export class GuitarHTML {
    constructor(id) {
        this.frets = [];
        this.openStrings = [];
        const guitarRoot = document.getElementById(id);
        guitarRoot.classList.add('guitarra');
        const fret0 = document.createElement("div");
        fret0.classList.add('cuerdasCuello');
        for (let i = 0; i < 6; i++) {
            const string = document.createElement("div");
            string.classList.add('cuerda');
            fret0.appendChild(string);
        }
        guitarRoot.appendChild(fret0);
        const neck = document.createElement("div");
        neck.classList.add('cuello');
        guitarRoot.appendChild(neck);
        for (let i = 0; i < 24; i++) {
            const fret = document.createElement("div");
            fret.classList.add('traste');
            for (let i = 0; i < 6; i++) {
                const string = document.createElement("div");
                string.classList.add('cuerda');
                fret.appendChild(string);
            }
            neck.appendChild(fret);
            this.frets.push(fret);
        }
        const openNotes = document.createElement("div");
        openNotes.classList.add('notasCuerdas');
        guitarRoot.appendChild(openNotes);
        const fret = document.createElement('div');
        fret.classList.add('traste');
        openNotes.appendChild(fret);
        for (let i = 0; i < 6; i++) {
            const string = document.createElement("div");
            string.classList.add('open');
            fret.appendChild(string);
            this.openStrings.push(string);
        }
    }
    /**
     * The number of frets to be displayed. Up to 24.
     * @param quantity
     */
    displayFrets(quantity) {
        this.frets.slice(quantity).forEach((htmlElement) => {
            htmlElement.setAttribute('style', 'display:None');
        });
    }
    fillNotes(guitar) {
        this.openStrings.forEach((string, index) => {
            const notas = guitar.getAt(0);
            string.textContent = notas[index];
        });
        this.frets.forEach((fret, index) => {
            const cuerdas = Array.from(fret.querySelectorAll('.cuerda'));
            const notas = guitar.getAt(index + 1);
            cuerdas.forEach((cuerda, indexCuerda) => {
                const notaHTML = document.createElement('p');
                notaHTML.classList.add("nota", "seleccionado");
                notaHTML.textContent = notas[indexCuerda];
                cuerda.appendChild(notaHTML);
            });
        });
    }
    showScale(guitar) {
    }
}
class Fret {
    constructor(parent, index, stringType) {
        this.parent = parent;
        this.index = index;
        this.stringType = stringType;
        this.strings = [];
        this.html = document.createElement("div");
        this.html.classList.add('traste');
        for (let i = 0; i < 6; i++) {
            const string = document.createElement("div");
            string.classList.add(stringType, `cuerda${i + 1}`);
            const note = document.createElement('p');
            note.classList.add('nota');
            string.append(note);
            this.html.appendChild(string);
            this.strings.push(string);
        }
    }
}
class Strings {
    constructor(parent) {
        this.html = document.createElement("div");
        this.html.classList.add('cuerdasCuello');
        for (let i = 0; i < 6; i++) {
            const string = document.createElement("div");
            string.classList.add('cuerda');
            this.html.appendChild(string);
        }
        parent.append(this.html);
    }
}
class Neck {
    constructor(parent) {
        this.parent = parent;
        this.frets = [];
        this.strings = {};
        const html = document.createElement("div");
        html.classList.add('cuello');
        for (let i = 0; i < 24; i++) {
            const fret = new Fret(html, i, 'cuerda');
            html.appendChild(fret.html);
            this.frets.push(fret);
        }
        this.html = html;
        parent.appendChild(html);
        for (let i = 1; i <= 6; i++) {
            this.strings[`cuerda${i}`] = Array.from(this.html.querySelectorAll(`.cuerda${i} p.nota`));
        }
    }
    addSelected(note) {
        document.querySelectorAll('.traste .nota').forEach(noteHTML => {
            var _a;
            if (note.toLowerCase() === ((_a = noteHTML.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase())) {
                noteHTML.classList.add('seleccionado');
            }
        });
    }
    removeSelected(note) {
        document.querySelectorAll('.traste .nota').forEach(noteHTML => {
            var _a;
            if (note.toLowerCase() === ((_a = noteHTML.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase())) {
                noteHTML.classList.remove('seleccionado');
            }
        });
    }
    fillNotes(tuning, scale) {
        //document.querySelectorAll('.traste .nota').forEach((noteHTML)=>noteHTML.textContent='');
        console.log('neck.fillNotes');
        const copyTunning = [...tuning];
        copyTunning.reverse();
        for (let i = 0; i < 6; i++) {
            const indexOfRoot = scale.scaleCromatic.indexOf(copyTunning[i]);
            let notes = [...scale.scaleCromatic.slice(indexOfRoot), ...scale.scaleCromatic.slice(0, indexOfRoot)]; /// Rearranging the notes in the guitarString order.
            this.strings[`cuerda${i + 1}`].forEach(((notaHTML, index) => { notaHTML.textContent = notes[(index + 1) % 12]; }));
        }
        scale.activeNotes.forEach((bool, index) => {
            if (bool) {
                this.addSelected(scale.scaleCromatic[index % 12]);
            }
            else {
                this.removeSelected(scale.scaleCromatic[index % 12]);
            }
        });
    }
}
class OpenFret {
    constructor(parent) {
        this.parent = parent;
        this.html = document.createElement("div");
        this.html.classList.add('notasCuerdas');
        this.fret = new Fret(this.html, -1, 'open');
        this.parent.appendChild(this.html);
        this.html.append(this.fret.html);
    }
    fillOpenNotes(tuning) {
        const copyTunning = [...tuning];
        copyTunning.reverse();
        copyTunning.forEach((openNote, index) => {
            this.fret.strings[index].innerText = openNote;
        });
    }
}
export class GuitarView {
    constructor(id, scale, tuning) {
        this.scale = scale;
        this.tuning = tuning;
        this.fillNotes = () => {
            console.log('fillNotes()');
            this.deselectNotes();
            this.openFret.fillOpenNotes(this.tuning);
            this.neck.fillNotes(this.tuning, this.scale);
        };
        this.deselectNotes = () => {
            const notes = Array.from(document.querySelectorAll('.traste .cuerda .nota'));
            notes.forEach((note) => {
                note.classList.remove('seleccionado');
            });
        };
        this.onResetColors = () => {
            const notesHTML = Array.from(document.querySelectorAll('.traste .nota'));
            notesHTML.forEach((noteHTML) => {
                this.changeColor(noteHTML, 'color1');
            });
        };
        this.onResetGuitar = () => {
            this.scale.reset();
            this.fillNotes();
        };
        const parent = document.getElementById(id);
        if (!parent)
            throw new Error(`No element with id "${id}" found!`);
        this.parent = parent;
        this.parent.classList.add('guitarra');
        this.strings = new Strings(this.parent);
        this.neck = new Neck(this.parent);
        this.openFret = new OpenFret(this.parent);
        this.bindEvents();
    }
    renderNotes() {
        this.fillNotes();
    }
    eventsMap() {
        return {
            /// Tiene que ser un evento que exista si es aplicado a un dom.
            'change:select#escala': this.fillNotes,
            'change:select#rootNote': this.fillNotes,
            'click:button.intervalos': this.onClickButton.bind(this),
            'change:.tabla__ColoresNotas select': this.onSetColor.bind(this),
            'click:button#botonColores': this.onResetColors,
            'click:button#botonNotes': this.onResetGuitar,
        };
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
    changeColor(noteHTML, colorClass) {
        noteHTML.classList.forEach(className => {
            if (className.includes('color')) {
                noteHTML.classList.remove(className);
            }
        });
        noteHTML.classList.add(colorClass);
    }
    onClickButton(event) {
        /// Hay que verlo según el estado de scales.active notes, no según el toggle.
        const target = event.target;
        const index = Number(target.dataset.value);
        const noteTarget = document.querySelectorAll('.tabla__notas .boton')[index].textContent;
        if (!noteTarget)
            return;
        if (this.scale.activeNotes[index]) {
            this.addSelected(noteTarget);
        }
        else {
            this.removeSelected(noteTarget);
        }
    }
    onSetColor(event) {
        const target = event.target;
        const colorClass = target.selectedOptions[0].value;
        const index = Number(target.getAttribute('position'));
        const noteTarget = document.querySelectorAll('.tabla__notas .boton')[index].textContent;
        if (!noteTarget)
            return;
        this.changeAllColors(noteTarget, colorClass); /// ScaleColor element.
    }
    addSelected(note) {
        document.querySelectorAll('.traste .nota').forEach(noteHTML => {
            var _a;
            if (note.toLowerCase() === ((_a = noteHTML.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase())) {
                noteHTML.classList.add('seleccionado');
            }
        });
    }
    removeSelected(note) {
        document.querySelectorAll('.traste .nota').forEach(noteHTML => {
            var _a;
            if (note.toLowerCase() === ((_a = noteHTML.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase())) {
                noteHTML.classList.remove('seleccionado');
            }
        });
    }
    changeAllColors(note, colorClass) {
        const notesHTML = Array.from(document.querySelectorAll('.traste .nota'));
        notesHTML.forEach((noteHTML) => {
            var _a;
            if (note.toLowerCase() === ((_a = noteHTML.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase())) {
                this.changeColor(noteHTML, colorClass);
            }
        });
    }
    displayFrets(quantity) {
        this.neck.frets.forEach((fretInstance) => {
            fretInstance.html.setAttribute('style', '');
        });
        this.neck.frets.slice(quantity).forEach((fretInstance) => {
            fretInstance.html.setAttribute('style', 'display:None');
        });
    }
}
