import{Png} from '/m/png.js'
import{getFileType}from '/m/file.js'

const messageText={
	jaJP:'pngファイルをこのウインドウにドロップしてください。',
	default:'Drop the png file into this window.'
}
const label=document.getElementById('label')
switch(navigator.language){
	case 'ja':case 'ja-JP':label.textContent=messageText.jaJP;break
	default:label.textContent=messageText.default
}
addEventListener('dragover',(event)=>event.preventDefault())
addEventListener('drop',filedrop)

async function filedrop(event){
	event.preventDefault()
	const code=document.getElementById('code')
	code.innerHTML=''
	const file=event.dataTransfer.files[0]
	const filetype=await getFileType(file)
	switch(filetype){
		case 'png':code.innerHTML=await Png.png(file);break
		default:code.innerHTML=filetype
	}
}