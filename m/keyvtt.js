const t = document.querySelector("track").track;

function keyvtt(e) {
    switch(e.code){
        case "KeyC":
            keydown_c();
            break;
        default:
            break;
    }
}

function keydown_c(){
    if(t.mode === 'showing') t.mode = 'hidden';
    else t.mode = 'showing';
}

export { keyvtt };
