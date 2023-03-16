/// This is the builder of the HTML Guitar.
import { Guitar } from "./Guitar.js";
import { Scale } from "./models/Scale.js";

export class GuitarHTML {
    frets : HTMLElement[] = [];
    openStrings : HTMLElement[] = [];

    constructor(id:string){
        const guitarRoot = document.getElementById(id) as HTMLElement;
        guitarRoot.classList.add('guitarra');
        const fret0 = document.createElement("div");
        fret0.classList.add('cuerdasCuello');
        for (let i = 0; i <6;i++){
            const string = document.createElement("div");
            string.classList.add('cuerda');
            fret0.appendChild(string);
        }
        guitarRoot.appendChild(fret0)
        const neck = document.createElement("div");
        neck.classList.add('cuello');
        guitarRoot.appendChild(neck);
        for (let i = 0;i<24;i++){
            const fret = document.createElement("div");
            fret.classList.add('traste')
            for (let i = 0; i <6;i++){
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
        for (let i = 0; i <6;i++){
            const string = document.createElement("div");
            string.classList.add('open');
            fret.appendChild(string);
            this.openStrings.push(string)
        }  
    }
    /**
     * The number of frets to be displayed. Up to 24.
     * @param quantity 
     */
    displayFrets(quantity:number){
        this.frets.slice(quantity).forEach((htmlElement)=>{
            htmlElement.setAttribute('style','display:None');
        })
    }
    fillNotes(guitar:Guitar){
        this.openStrings.forEach((string,index)=>{
            const notas = guitar.getAt(0);
            string.textContent = notas[index];
        })
        this.frets.forEach((fret,index)=>{
            const cuerdas = Array.from(fret.querySelectorAll('.cuerda')) as HTMLElement[];
            const notas = guitar.getAt(index+1);
            cuerdas.forEach((cuerda,indexCuerda)=>{
                const notaHTML = document.createElement('p');
                notaHTML.classList.add("nota","seleccionado");
                notaHTML.textContent = notas[indexCuerda];
                cuerda.appendChild(notaHTML);
            });
        });
    }
    showScale(guitar:Guitar){

    }
}

class Fret {
    html:HTMLElement;
    strings: HTMLElement[] = [];
    constructor(public parent:HTMLElement,public index:number,public stringType:string){
        this.html = document.createElement("div");
        this.html.classList.add('traste')
        for (let i = 0; i <6;i++){
            const string = document.createElement("div");
            string.classList.add(stringType,`cuerda${i+1}`);
            const note = document.createElement('p');
            note.classList.add('nota');
            string.append(note);
            this.html.appendChild(string);
            this.strings.push(string);
        }
    } 
}

class Strings {
    html:HTMLElement;
    constructor(parent:HTMLElement){
        this.html = document.createElement("div");
        this.html.classList.add('cuerdasCuello');
        for (let i = 0; i <6;i++){
            const string = document.createElement("div");
            string.classList.add('cuerda');
            this.html.appendChild(string);
        }
        parent.append(this.html); 
    }
}

class Neck {
    frets:Fret[] = [];
    html: HTMLElement;
    strings:{[key:string]:HTMLElement[]} = {}
    constructor(public parent:HTMLElement){
        const html = document.createElement("div");
        html.classList.add('cuello');
        for (let i = 0;i<24;i++){
            const fret = new Fret(html,i,'cuerda');
            html.appendChild(fret.html);
            this.frets.push(fret)
        }
        this.html = html;
        parent.appendChild(html);
        for (let i = 1; i<=6; i++){
            this.strings[`cuerda${i}`] = Array.from(this.html.querySelectorAll(`.cuerda${i} p.nota`))

        }
    }

    fillNotes(tuning:TuningNotes,scale:Scale){
        console.log('neck.fillNotes')
        //tuning.reverse();
        for (let i = 0; i<6; i++){
            const indexOfRoot = scale.scaleCromatic.indexOf(tuning[i])
            let notes = [...scale.scaleCromatic.slice(indexOfRoot),...scale.scaleCromatic.slice(1,indexOfRoot)] /// Rearranging the notes in the guitarString order.
            notes = [...notes,...notes,...notes]
            let activeNotes =[...scale.activeNotes.slice(indexOfRoot),...scale.activeNotes.slice(1,indexOfRoot)] /// Rearranging the notes in the guitarString order. 
            activeNotes = [...activeNotes,...activeNotes,...activeNotes]
            this.strings[`cuerda${i+1}`].forEach((nota,index)=>{
                nota.innerText = notes[index+1];
                if (activeNotes[index+1]){
                    nota.classList.add('seleccionado')
                }
            });
        } 
    }

    toggleNote(note:string){

    }
}

class OpenFret {
    fret: Fret;
    html:HTMLElement;
    constructor(public parent: HTMLElement){
        this.html = document.createElement("div");
        this.html.classList.add('notasCuerdas');
        this.fret = new Fret(this.html,-1,'open');
        this.parent.appendChild(this.html);
        this.html.append(this.fret.html);
    }

    fillOpenNotes(tuning:TuningNotes){
        const copyTunning = [...tuning]
        copyTunning.reverse();
        copyTunning.forEach((openNote,index)=>{
            this.fret.strings[index].innerText = openNote;
        });
    }
}

export type TuningNotes = [string,string,string,string,string,string]


export class GuitarView {
    neck: Neck;
    openFret: OpenFret;
    strings: Strings;
    parent: HTMLElement;
    constructor(id:string,public scale:Scale, public tuning:TuningNotes){
        const parent = document.getElementById(id);
        if (!parent) throw new Error(`No element with id "${id}" found!`)
        this.parent = parent;
        this.parent.classList.add('guitarra');
        this.strings = new Strings(this.parent);
        this.neck = new Neck(this.parent);
        this.openFret = new OpenFret(this.parent);
        this.bindEvents(); 
    }

    renderNotes(): void {
        this.fillNotes()
    }

    fillNotes:()=> void = ()=>{
        console.log('fillNotes()')
        this.deselectNotes()
        this.openFret.fillOpenNotes(this.tuning);
        this.neck.fillNotes(this.tuning,this.scale);
    }

    deselectNotes:()=> void = ()=>{
        const notes = Array.from(document.querySelectorAll('.traste .cuerda .nota'));
        notes.forEach((note)=>{
            note.classList.remove('seleccionado')
        })
    }

    eventsMap(): {[key:string]: (event:Event)=> void }{
        return {
            /// Tiene que ser un evento que exista si es aplicado a un dom.
            'change:select#escala': this.fillNotes,
            'change:select#rootNote': this.fillNotes,
            'click:button.intervalos': this.onClickButton.bind(this), /// Tenemos acceso tanto a la instancia como al target del evento!
            'change:.tabla__ColoresNotas select': this.onSetColor.bind(this),
            'click:button#botonColores': this.onResetColors,
            'click:button#botonNotes': this.onResetGuitar,
        }
    }

    bindEvents(): void {
        const eventsMap = this.eventsMap();
        for (let eventKey in eventsMap){
            const [eventName,selector] = eventKey.split(':');
            document.querySelectorAll(selector).forEach((element)=>{
                element.addEventListener(eventName,eventsMap[eventKey]) //* Agrega el evento.
            });
        }
    }

    changeColor(noteHTML:Element,colorClass:string){
        noteHTML.classList.forEach(className=>{
            if (className.includes('color')){
                noteHTML.classList.remove(className)
            }  
        });
        noteHTML.classList.add(colorClass) 
    }

    onResetColors = ()=>{
        const notesHTML = Array.from(document.querySelectorAll('.traste .nota'));
        notesHTML.forEach((noteHTML)=>{
            this.changeColor(noteHTML,'color1');
        });
    }

    onClickButton(event:Event): void {
        const target = event.target as HTMLButtonElement
        const index = Number(target.dataset.value);
        const noteTarget = document.querySelectorAll('.tabla__notas .boton')[index].textContent;
        if (!noteTarget) return
        this.toggleNotes(noteTarget);
    }

    onSetColor(event:Event): void {
        const target =  event.target as HTMLSelectElement
        const colorClass = target.selectedOptions[0].value;
        const index = Number(target.getAttribute('position'));
        const noteTarget = document.querySelectorAll('.tabla__notas .boton')[index].textContent;
        if (!noteTarget) return
        this.changeAllColors(noteTarget,colorClass); /// ScaleColor element.

    }

    toggleNotes(note:string){
        const notesHTML = Array.from(document.querySelectorAll('.traste .nota'));
        notesHTML.forEach((noteHTML)=>{
            if (note.toLowerCase() === noteHTML.textContent?.toLowerCase()){
                noteHTML.classList.toggle('seleccionado');
            }
        })
    }

    changeAllColors(note:string,colorClass:string): void {
        const notesHTML = Array.from(document.querySelectorAll('.traste .nota'));
        notesHTML.forEach((noteHTML)=>{
            if (note.toLowerCase() === noteHTML.textContent?.toLowerCase()){
                this.changeColor(noteHTML,colorClass)
            }
        });
    }

    onResetGuitar= ()=>{
        this.scale.reset();
        this.fillNotes();
    }

    displayFrets(quantity:number){
        this.neck.frets.forEach((fretInstance)=>{
            fretInstance.html.setAttribute('style','')
        })
        this.neck.frets.slice(quantity).forEach((fretInstance)=>{
            fretInstance.html.setAttribute('style','display:None');
        })
    }
}