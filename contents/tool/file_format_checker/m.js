import{Png} from '../../../m/png.js'
import{getFileType}from '../../../m/file.js'

const inputElement=document.getElementById('input')
addEventListener('dragover',(e)=>e.preventDefault())
addEventListener('drop',filedrop)
inputElement.addEventListener('change',run)

function filedrop(e){
	e.preventDefault()
	inputElement.files=e.dataTransfer.files
	run()
}

async function run(){
	const biew=document.getElementById('binaryview')
	biew.innerHTML=''
	const file=inputElement.files[0]
	const filetype=await getFileType(file)
	switch(filetype){
		case 'png':
			biew.innerHTML=await Png.png(file)
			break
		default: biew.innerHTML=filetype
	}
}
