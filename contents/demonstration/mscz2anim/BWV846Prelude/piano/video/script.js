import { keyvideo } from '../../../../../../../parts/module/keyvideo.js';
// import { logvideo } from '../../../../../../../parts/module/logvideo.js';
window.onkeydown = keydown;
// logvideo();

function keydown(e) {
    // console.log("event keydown " + e.key, e.code, e.ctrlKey,  e.shiftKey, e.altKey, e.metaKey)
    keyvideo(e);
}
