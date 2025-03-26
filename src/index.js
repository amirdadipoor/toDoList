import InputSection from './components/input-section.js';
import ListSection from './components/list-section.js';
import "./styles.css";


const app = document.getElementById('app');

InputSection.render().forEach(element => app.appendChild(element));
app.appendChild(ListSection.render());


