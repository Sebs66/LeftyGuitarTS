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
