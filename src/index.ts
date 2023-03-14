import { Table } from './views/TableView';
import { GuitarHTML } from './GuitarComponent';

const guitarra1 = new GuitarHTML('guitarra1');
const table = new Table('tabla')
const guitarra2 = new GuitarHTML('guitarra2');

const buttonsNotes = Array.from(document.getElementsByClassName('boton'));
const buttonsInterval = Array.from(document.querySelectorAll('.tabla__intervalos')[0].children);
const colorsInterval = Array.from(document.getElementsByClassName('tabla__ColoresNotas')[0].children) as HTMLSelectElement[];

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

(window as any).changeColor = changeColor;
(window as any).resetColors = resetColors;


