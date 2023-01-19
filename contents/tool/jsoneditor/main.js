import{downloadJson}from '/m/file.js'

const messageText={
	jaJP:'jsonファイルをこのウインドウにドロップしてください。downloadボタンを押すとminify後、ファイルをダウンロードフォルダに保存します。ボタンを押してもダウンロードが開始されない場合jsonの文法として間違っている可能性があります。',
	default:'Drop the json file into this window. When you press the download button, the file will be saved in the download folder after minify. If the download does not start even if you press the button, the json syntax may be incorrect.'
}
const label=document.getElementById('label')
const button=document.getElementById('button')
const textarea=document.getElementById('textarea')
switch(navigator.language){
	case 'ja':case 'ja-JP':label.textContent=messageText.jaJP;break
	default:label.textContent=messageText.default
}
addEventListener('dragover',(event)=>event.preventDefault())
addEventListener('drop',filedrop)
button.addEventListener('pointerdown',download)
textarea.addEventListener('keydown',keydown)
textarea.value=''
let file=undefined

function filedrop(event){
	event.preventDefault()
	file=event.dataTransfer.files[0]
	file.text().then((text)=>textarea.value=JSON.stringify(JSON.parse(text),null,'\t'))
}

function download(){
	const obj=JSON.parse(textarea.value)
	let filename
	if(file==undefined)filename='new.json'
	else filename=file.name
	downloadJson(obj,filename)
}

function keydown(event){
	if(event.key=='Tab'){
		event.preventDefault()
		const cursorPosition=textarea.selectionStart
		const l=textarea.value.substring(0,cursorPosition)
		const r=textarea.value.substring(cursorPosition)
		textarea.value=l+'\t'+r
		textarea.selectionEnd=cursorPosition+1
	}
}