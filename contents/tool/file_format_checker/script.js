import { Png } from "../../../parts/module/png.js";
import { getFileType } from "../../../parts/module/file.js";

const inputElement = document.getElementById("input");
window.addEventListener("dragover", (event)=>event.preventDefault());
window.addEventListener("drop", filedrop);
inputElement.addEventListener("change", run);

function filedrop(event){
    event.preventDefault();
    inputElement.files = event.dataTransfer.files;
    run();
}

async function run(){
    const biew = document.getElementById("binaryview");
    biew.innerHTML = "";
    const file = inputElement.files[0];
    const filetype = await getFileType(file);
    switch(filetype){
        case "png":
            biew.innerHTML = await Png.png(file);
            break;
        default: biew.innerHTML = filetype;
    }
}
