import { Scale } from './Scale.js'
import { GuitarString } from './Guitar.js'

function update():void{
    const rootNoteSelect = document.getElementById('rootNote') as HTMLSelectElement;
    const rootNote = rootNoteSelect.value.toLowerCase().replace('#','sharp');
    const colorSelect = document.getElementById('escala') as HTMLSelectElement;
    const color = colorSelect.value;
    console.log('update()',rootNote,color)
    setScale(rootNote,color);
    setScaleTones(color);
}

const buttonsNotes = Array.from(document.getElementsByClassName('boton'));
const buttonsInterval = Array.from(document.querySelectorAll('.tabla__intervalos')[0].children);
const buttonsRelativeIntervals = Array.from(document.querySelectorAll('.tabla__intervalos')[1].children);
const colorsInterval = Array.from(document.getElementsByClassName('tabla__ColoresNotas')[0].children) as HTMLSelectElement[];
const tonesElements = Array.from(document.getElementsByClassName('tabla__tonos')[0].children) as HTMLElement[];

/**
 * Change the scale tones layout depending on the type of scale. 
 */
function setScaleTones(color:string):void {
    if (color === 'pentatonicMinor'){
        color = 'minor'
    } else if (color === 'pentatonicMajor'){
        color = 'major'
    }
    const intervalos = ['tono2','tono4','tono5','semiTono1','semiTono2']; /// Only these are relevants.

    tonesElements.forEach(tone=>{
        tone.setAttribute('class','') /// Erase all clases.
        if (intervalos.indexOf(tone.id) !== -1){
            color = color == 'major' ? 'Mayor' : 'Menor'
            //console.log(color)
            tone.setAttribute('class',`${tone.id}${color}`)
        } 
    });
}

/**
 * Cambia los botones HTML de las notas. Cambia su contenido(Nota) y apaga/prende botones.
 * @param Scale 
 * 
 */
function setScale(nota:string,color:string):void {
    //console.log(nota,color)
    //console.log(color)
    const className = 'seleccionado';
    const scale = new Scale(nota,color);
    
    // primero apagar todos los botones.
    buttonsNotes.forEach((element,index) => {
       element.classList.remove(className);
       buttonsInterval[index].classList.remove(className);
       buttonsRelativeIntervals[index].classList.remove(className);
       colorsInterval[index].classList.remove(className);
        colorsInterval[index].disabled = true;
    });
    // Luego recorremos los intervalos acumulandolos y vamos prendiendo botones.
    scale.scaleIntervals.reduce((acc,distance,index)=>{
        buttonsNotes[acc].classList.add(className); // prendiendo.
        buttonsInterval[acc].classList.add(className);
        buttonsRelativeIntervals[acc].classList.add(className);
        colorsInterval[acc].classList.add(className);
        colorsInterval[acc].disabled = false;
        buttonsNotes[acc].innerHTML = scale.scaleCromatic[acc]; // Cambiando texto.
        
        acc += distance; // acumulando.
        return acc
    },0)
    // Agregamos ultimo boton.
    buttonsNotes[buttonsNotes.length-1].classList.add(className)
    buttonsInterval[buttonsNotes.length-1].classList.add(className)
    buttonsRelativeIntervals[buttonsNotes.length-1].classList.add(className)
}

/**
 * Turns on/off the buttons related to a specific note when any button is clicked.
 * @param button 
 * 
 */
function toggleIntervalo(button:HTMLElement):void{
    const className = 'seleccionado';
    const index = Number(button.getAttribute('value'))
    if(button.classList.contains(className)){
        buttonsNotes[index].classList.remove(className);
        buttonsInterval[index].classList.remove(className);
        buttonsRelativeIntervals[index].classList.remove(className);
        colorsInterval[index].classList.remove(className);
        colorsInterval[index].disabled = true;
    } else {
        buttonsNotes[index].classList.add(className);
        buttonsInterval[index].classList.add(className);
        buttonsRelativeIntervals[index].classList.add(className);
        colorsInterval[index].classList.add(className);
        colorsInterval[index].disabled = false;
    }   
}

/**
 * change the color of the specific botton and its relatives in the scale.
 * @param select 
 */
function changeColor(select:HTMLSelectElement):void {
    const index = Number(select.getAttribute('position'));
    const color = select.value;
    buttonsNotes[index].setAttribute('class','boton seleccionado') // removes previous color class.
    buttonsNotes[index].classList.add(color);
    select.setAttribute('class',`seleccionado ${color}`);
    buttonsInterval[index].setAttribute('class','intervalos seleccionado');
    buttonsInterval[index].classList.add(color);
}

/**
 * reset the colors of all buttons to its default.
 */
function resetColors(){
    const defaultColor = 'color2'
    console.log('resetColors')
    buttonsNotes.forEach((button,index)=>{
        const oldColor = Array.from(button.classList).filter(className=>{
            return !['seleccionado','boton'].includes(className)
        })[0];
        if (oldColor){
            button.classList.remove(oldColor);
            button.classList.add(defaultColor);
            colorsInterval[index].classList.remove(oldColor);
            colorsInterval[index].classList.add(defaultColor);
            buttonsInterval[index].classList.remove(oldColor);
            buttonsInterval[index].classList.add(defaultColor);
        }
    });
}

(window as any).toggleIntervalo = toggleIntervalo;
(window as any).update = update; /// Con esta línea hacemos que la función sea accesible en la consola y en los onchange!.
(window as any).changeColor = changeColor;
(window as any).resetColors = resetColors;
update()

const scale = new Scale('A','major');
const stringA = new GuitarString('E',scale);
console.log(stringA.getIndexes('A'));
console.log(stringA.getAt(5))