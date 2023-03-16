import { Table } from './views/TableView';
import { GuitarHTML, GuitarView } from './GuitarView';
import { Scale } from './models/Scale';
const scale = new Scale('C', 'major');
const tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
const guitarra1 = new GuitarHTML('guitarra1');
const table = new Table('tabla', scale);
table.render();
const guitarra2 = new GuitarView('guitarra2', scale, tuning);
guitarra2.renderNotes();
window.guitarra2 = guitarra2;
