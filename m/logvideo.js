const v = document.getElementById("video");

function logvideo(){
    document.onfullscreenchange = ()=> console.log("event document fullscreenchange fullscreenElement=" + document.fullscreenElement)
    v.onfullscreenchange = ()=> console.log("event element fullscreenchange")
    v.oncanplay = ()=> console.log("event video canplay");
    v.oncanplaythrough = ()=> console.log("event video canplaythrough");
    // v.complete = ()=> console.log("event video complete");
    v.ondurationchange = ()=> console.log("event video durationchange duration=" + v.duration);
    v.onemptied = ()=> console.log("event video emptied");
    v.onended = ()=> console.log("event video ended");
    v.onloadeddata = ()=> console.log("event video loadeddata");
    v.onloadedmetadata = ()=> console.log("event video loadedonmetadata");
    v.onpause = ()=> console.log("event video pause");
    v.onplay = ()=> console.log("event video play");
    v.onplaying = ()=> console.log("event video playing");
    v.onprogress = ()=> console.log("event video progress");
    v.onratechange = ()=> console.log("event video ratechange");
    v.onseeked = ()=> console.log("event video seeked");
    v.onseeking = ()=> console.log("event video seeking");
    v.onstalled = ()=> console.log("event video stalled");
    v.onsuspend = ()=> console.log("event video suspend");
    v.ontimeupdate = ()=> console.log("event video timeupdate currentTime=" + v.currentTime);
    v.onvolumechange = ()=> console.log("event video volumechange volume=" + v.volume + " muted=" + v.muted);
    v.onwaiting = ()=> console.log("event video waiting");
}

export { logvideo };
