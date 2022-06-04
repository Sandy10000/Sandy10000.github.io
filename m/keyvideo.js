const v = document.getElementById("video");

function keyvideo(e) {
    switch(e.code){
        case "KeyF":
            keydown_f();
            break;
        case "KeyK":
            keydown_k();
            break;
        case "KeyL":
            keydown_l();
            break;
        case "KeyM":
            keydown_m();
            break;
        case "ArrowUp":
            keydown_arrow_up();
            break;
        case "ArrowDown":
            keydown_arrow_down();
            break;
        default:
            break;
    }
}

function keydown_f(){
    if (!document.fullscreenElement) v.requestFullscreen();
    else document.exitFullscreen();
}

function keydown_k(){
    if(v.paused) v.play();
    else v.pause();
}

function keydown_l(){
    if(v.loop) v.loop = false;
    else v.loop = true;
}

function keydown_m(){
    if(v.muted) v.muted = false;
    else v.muted = true;
}

function keydown_arrow_up(){
    if(v.volume * 1.05 > 1.0) v.volume = 1.0;
    else v.volume *= 1.05;
}

function keydown_arrow_down(){
    v.volume *= 0.95;
}

export { keyvideo };
