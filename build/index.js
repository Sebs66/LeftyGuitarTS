import { Table } from './views/TableView';
import { GuitarHTML } from './GuitarComponent';
import { Scale } from './models/Scale';
const guitarra1 = new GuitarHTML('guitarra1');
const table = new Table('tabla', new Scale('C', 'major'));
table.render();
const guitarra2 = new GuitarHTML('guitarra2');
