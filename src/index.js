import InputSection from './components/input-section.js';
import "./styles.css";


const app = document.getElementById('app');

InputSection.render().forEach(element => app.appendChild(element));

//console.log("Amir")
//console.log("dadipoor")
//console.log("dadipoor")
