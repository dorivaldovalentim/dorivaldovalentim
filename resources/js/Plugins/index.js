import Dropzone from "dropzone";
import 'dropzone/dist/basic.css'
import 'dropzone/dist/dropzone.css'


document.addEventListener("DOMContentLoaded", function () {
    let myDropzone = new Dropzone("#dropzone");
    myDropzone.on("addedfile", file => {
        console.log(`File added: ${file.name}`);
    });
});