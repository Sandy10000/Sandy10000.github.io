function intToHex(value,digits){
    let result = value.toString(16).toUpperCase();
    let len = result.length;
    for(len;len<digits;len++){
      result = "0" + result;
    }
    return result;
}

async function getArray(file, start, end){
    const slice = file.slice(start, end);
    const buffer = await slice.arrayBuffer()
    return new Uint8Array(buffer);
}

function getHexData(array){
    let result = "";
    array.forEach((value)=>{
        result += intToHex(value, 2) + " ";
    });
    return result;
}

function getTextData(array){
    let result = "";
    array.forEach((value)=>{
        if(value >= 32 && value <= 126){
            result += String.fromCharCode(value);
        }else result += ".";
    });
    return result;
}

function addSpace(value){
    let result = "";
    for(let i = 0; i< value; i++){
        result += " ";
    }
    return result;
}

export { intToHex, getArray, getHexData, getTextData, addSpace };
