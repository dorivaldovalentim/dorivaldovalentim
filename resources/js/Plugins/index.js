import Dropzone from "dropzone";
import 'dropzone/dist/basic.css'
import 'dropzone/dist/dropzone.css'
import TomSelect from 'tom-select/dist/js/tom-select.complete'
import 'tom-select/dist/css/tom-select.bootstrap4.min.css'


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('#theme-select').forEach((el) => {
        let settings = {};
        new TomSelect(el, settings);
    });

    let myDropzone = new Dropzone("#dropzone");
    myDropzone.on("addedfile", file => {
        console.log(`File added: ${file.name}`);
    });
});