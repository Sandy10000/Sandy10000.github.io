
let raw;
let end;
let value;
let ascii;

function onDragOver(event){ 
  event.preventDefault(); 
} 

function onDrop(event){
  onAddFile();
  event.preventDefault(); 
}

function htmlspecialchars(str){
  return (str + '').replace(/&/g,'&amp;')
                   .replace(/"/g,'&quot;')
                   .replace(/'/g,'&#039;')
                   .replace(/</g,'&lt;')
                   .replace(/>/g,'&gt;'); 
}

function intToHex(value,digits){
  let result = value.toString(16).toUpperCase();
  let len = result.length;
  for(let i=len;i<digits;i++){
    result = '0' + result;
  }
  return result;
}

function getBinary(bytes){
  let result = '\r\n' + intToHex(end,4) + ' ';
  let column = 0;
  let now = end;
  let len;
  let asciiRow = '';
  ascii = '';
  value = 0;
  end = now + bytes;
  for(now;now<end;now++){
    if(now >= raw.length) break;
    if(column == 8){
		  result += asciiRow + '\r\n';
		  result += intToHex(now,4) + ' ';
      column = 0;
      ascii += asciiRow;
		  asciiRow = '';
		}
		
    result += intToHex(Number(raw[now]),2) + ' ';
    value += raw[now]*(256**(bytes - column - 1)); 
    if(raw[now] >= 32 && raw[now] <= 126){
      asciiRow += String.fromCharCode(raw[now]);
    }else{
      asciiRow += '.';
    }
    column++;
  }
  ascii += asciiRow;
  if (column == 8){
    len = 0;
  }else{
    len = 8 - (bytes % 8);
  }
  for(let i=0;i<len;i++){
    result += '   ';
  }
  result += asciiRow;
  for(let i=0;i<len + 1;i++){
    result += ' ';
  }
  return result;
}

function onAddFile() {
  let files;
  let reader = new FileReader();
  end = 0;
  if(event.target.files){
    files = event.target.files;
  }else{
    files = event.dataTransfer.files;   
  }
  reader.onload = function () {
    let result;
    raw = new Uint8Array(reader.result);
    if(raw[0]==137 &&raw[1]==80 &&raw[2]==78 &&raw[3]==71 &&raw[4]==13 &&raw[5]==10 &&raw[6]==26 &&raw[7]==10){
      result = png.png();
    }else if(raw[0]==255 &&raw[1]==216){
      console.log("jpeg");
    }else{
      console.log("other");
    }
    document.getElementById('BainryView').innerHTML = htmlspecialchars(result) ;  
  };

  if (files[0]){    
    reader.readAsArrayBuffer(files[0]);
  }
}
