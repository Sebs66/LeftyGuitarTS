import { scalesCromatic,intervalsText,relativeIntervalsText } from "../models/diccionarioNotas.js";
import { HtmlConstructor, HTMLSelectionConstructor } from "./HtmlConstructor.js";
import { Scale } from "../models/Scale.js";

export class Table extends HtmlConstructor {
    private scaleDiv: ScaleDiv;
    private tonesDiv: TonesDiv;
    private keyDiv: KeyDiv;
    private intervalsDiv: IntervalsDiv;
    private notesDiv: NotesDiv;
    private colorsDiv: ColorsDiv;
    private relativeScaleDiv: RelativeScaleDiv;
    private resetDiv: ResetDiv;
    root;
    constructor(public id:string){
        const root = document.getElementById(id);
        if (!root) { throw new Error('No root element present!')} 
        super(root )
        this.root = root as HTMLDivElement;
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

    eventsMap(): {[key:string]: (event:Event)=> void }{
        return {
            /// Tiene que ser un evento que exista si es aplicado a un dom.
            'change:select#escala': this.onSetScale,
            'change:select#rootNote': this.onSetScale,
            'click:button.intervalos': this.onClickButton.bind(this), /// Tenemos acceso tanto a la instancia como al target del evento!
            'change:.tabla__ColoresNotas select': this.onSetColor.bind(this),
            'click:button#botonColores': this.onResetColors,
            'click:button#botonNotes': this.render,
        }
    }

    onResetColors = ()=>{ /// Arrow function so we can access to the instance of the class with the this keyword.
        this.notesDiv.resetColors(this.notesDiv.elements,'color1');
        this.colorsDiv.resetColors(this.colorsDiv.elements,'color1')
        this.intervalsDiv.resetColors(this.intervalsDiv.elements,'color1')

    }
    
    onSetColor(event:Event){
        const target =  event.target as HTMLSelectElement
        const colorClass = target.selectedOptions[0].value;
        const index = Number(target.getAttribute('position'));
        this.colorsDiv.changeColor(target,colorClass); /// ScaleColor element.
        //this.relativeScaleDiv.changeColor(this.relativeScaleDiv.elements[index] as HTMLElement,colorClass); /// We dont change the relative scales colors.
        this.notesDiv.changeColor(this.notesDiv.elements[index] as HTMLElement,colorClass); 
        this.intervalsDiv.changeColor(this.intervalsDiv.elements[index] as HTMLElement,colorClass); 
    }

    onClickButton(event:Event){
        const target = event.target as HTMLButtonElement
        //console.log(target.dataset.value)
        const index = Number(target.dataset.value);
        if (!index){
            throw new Error('dataset.value of target element is undefined')
        }
        this.notesDiv.toggleElement(this.notesDiv.elements[index] as HTMLElement);
        this.intervalsDiv.toggleElement(this.intervalsDiv.elements[index] as HTMLElement);
        this.relativeScaleDiv.toggleElement(this.relativeScaleDiv.elements[index] as HTMLElement);
        this.colorsDiv.toggleElement(this.colorsDiv.elements[index] as HTMLElement);
        const colorElement = this.colorsDiv.elements[index] as HTMLSelectElement;
        if (colorElement.disabled){
            colorElement.disabled = false;
        } else {
            colorElement.disabled = true;
        }
    }

    onSetScale = () => {
        this.render()
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

    render= ()=>{
        const scaleColor = this.scaleDiv.getValue();
        const note = this.keyDiv.getValue(); 
        const scale = new Scale(note,scaleColor)
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
    element;
    select;
    
    constructor(public parent:HTMLDivElement){
        super(parent);
        const scaleDiv = this.addElement('div',{class:'divEscala'});
        const dropDownDiv = this.addSubElement(scaleDiv,'div',{class:'dropDownMenu'}) 
        this.select = this.addSubElement(dropDownDiv,'select',{id:'escala'}) as HTMLSelectElement;  
        const option1 = this.addSubElement(this.select,'option',{value:'major',innerText:'Mayor'}) as HTMLOptionElement;
        const option2 = this.addSubElement(this.select,'option',{value:'minor',innerText:'Menor'}) as HTMLOptionElement;
        const option3 = this.addSubElement(this.select,'option',{value:'pentatonicMajor',innerText:'Pentatonica Mayor'}) as HTMLOptionElement;
        const option4 = this.addSubElement(this.select,'option',{value:'pentatonicMinor',innerText:'Pentatonica Menor'}) as HTMLOptionElement;
        this.element = scaleDiv
    }
    
    getValue():string {
        return this.select.value;
    }
}

class TonesDiv extends HtmlConstructor {
    tonesParent;
    constructor(parent:HTMLElement){
        super(parent)
        this.tonesParent = this.addElement('div',{'class':'tabla__tonos'})
        for (let i = 0; i<7;i++){
            const p = this.addSubElement(this.tonesParent,'p',{id:tonesId[i],innerText:tonesTxt[i]})
            this.tonesParent.appendChild(p);
            if ([1,3,4,5,6].includes(i)){ /// Cuando tengo que agregar la clase.
                p.classList.add(`${tonesId[i]}Mayor`)
            }
        }
        
    }

    update(color:string){
        const toneElements = Array.from(this.tonesParent.children);
        if (color === 'pentatonicMinor'){
            color = 'minor';
        } else if (color === 'pentatonicMajor'){
            color = 'major'
        }
        const intervalos = ['tono2','tono4','tono5','semiTono1','semiTono2']; /// Only these are relevants.
        color = color == 'major' ? 'Mayor' : 'Menor' 
        toneElements.forEach(tone=>{
            tone.setAttribute('class',''); /// Erase all clases.
            if (intervalos.indexOf(tone.id) !== -1){
                tone.setAttribute('class',`${tone.id}${color}`)
            }  
        })
    } 
}

class KeyDiv extends HtmlConstructor {
    element;
    select;
    constructor(parent:HTMLElement){
        super(parent)
        const keyDiv = this.addElement('div',{class:'key'}) 
        this.select = this.addSubElement(keyDiv,'select',{id:'rootNote'}) as HTMLSelectElement;
        for (let i = 0;i<cromaticNotes.length;i++){
            const option = this.addSubElement(this.select,'option',{value:cromaticNotes[i],innerText:cromaticNotes[i]})
        }
        this.element = keyDiv;
    }

    getValue(){
        return this.select.value;
    }
}

class IntervalsDiv extends HTMLSelectionConstructor {
    intervalsParent;
    elements;
    constructor(parent:HTMLDivElement){
        super(parent)
        const colorClass = 'color1'
        this.intervalsParent = this.addElement('div',{class:'tabla__intervalos'});
        for (let i = 0;i <13;i++){
            const button = this.addSubElement(this.intervalsParent,'button',{'data-value':String(i),class:`intervalos ${colorClass}`,innerText:intervalsText[i]});
        }
        this.elements =  Array.from(this.intervalsParent.children);
    }

    update(scale:Scale){
        this.updateSelected(this.elements,scale.activeNotes);
    }
}

class NotesDiv extends HTMLSelectionConstructor{
    notesParent;
    elements;
    constructor(parent:HTMLDivElement){
        super(parent);
        this.notesParent = this.addElement('div',{class:'tabla__notas'});
        for (let i=0;i<13;i++){
            const button = this.addSubElement(this.notesParent,'button',{class:'boton',innerText:scalesCromatic['major']['c'][i]});
        }
        this.elements = Array.from(this.notesParent.children); 
    }

    update(scale:Scale){
        const selected = 'seleccionado'
        this.updateSelected(this.elements,scale.activeNotes);
        this.elements.forEach((element,index)=>{
            element.textContent = scale.scaleCromatic[index];
        })
    }
}

class ColorsDiv extends HTMLSelectionConstructor {
    elements;
    constructor(parent:HTMLDivElement){
        super(parent);
        const colorsParent = this.addElement('div',{class:'tabla__ColoresNotas'});
        for (let i = 0; i<13; i++){
            const select = this.addSubElement(colorsParent,'select',{position:String(i)}) as HTMLSelectElement;
            select.disabled = true;
            select.classList.add('color1')
            for (let i = 0; i<4; i++){
                const option = this.addSubElement(select,'option',{value:`color${i+1}`,class:`color${i+1}`}) as HTMLOptionElement;
            }
            colorsParent.appendChild(select);
        }
        this.elements = Array.from(colorsParent.children) as HTMLSelectElement[];
    }

    update(scale:Scale){
        this.updateSelected(this.elements,scale.activeNotes);
        this.elements.forEach((element,index) =>{
            if (scale.activeNotes[index]){
                element.disabled = false;
            } else {
                element.disabled = true;
            }
        });
    }
}

class RelativeScaleDiv extends HTMLSelectionConstructor {
    relativeScaleParent;
    elements;
    constructor(parent:HTMLDivElement){
        super(parent);
        this.relativeScaleParent = this.addElement('div',{class:'tabla__intervalos escalaRelativa'});
        for (let i = 0; i<13; i++){
            const button = this.addSubElement(this.relativeScaleParent,'button',{'data-value':String(i),class:'intervalos',innerText:relativeIntervalsText[i]});
        }
        this.elements = Array.from(this.relativeScaleParent.children);
    }

    update(scale:Scale): void {
        
        this.updateSelected(this.elements,scale.activeNotes);
    }
}

class ResetDiv extends HtmlConstructor {
    constructor(parent:HTMLDivElement){
        super(parent);
        const resetDiv = this.addElement('div',{class:'botones_reset'});
        const button1 = this.addSubElement(resetDiv,'button',{id:'botonColores',innerText:'Reset Colors',class:'resetColors'});
        const button2 = this.addSubElement(resetDiv,'button',{id:'botonNotes',innerText:'Reset Notes',class:'resetNotes'});
    }
}

const cromaticNotes = ['C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#','Ab','A','A#','Bb','B'];

const tonesId = ['tono1','tono2','tono3','tono4','tono5','semiTono1','semiTono2'];
const tonesTxt = ['T','T','T','T','T','S','S'];