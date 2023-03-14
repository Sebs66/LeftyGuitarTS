import { Table } from './views/TableView';
import { GuitarHTML } from './GuitarComponent';
const guitarra1 = new GuitarHTML('guitarra1');
const table = new Table('tabla');
table.render();
const guitarra2 = new GuitarHTML('guitarra2');
const buttonsNotes = Array.from(document.getElementsByClassName('boton'));
const buttonsInterval = Array.from(document.querySelectorAll('.tabla__intervalos')[0].children);
const colorsInterval = Array.from(document.getElementsByClassName('tabla__ColoresNotas')[0].children);
