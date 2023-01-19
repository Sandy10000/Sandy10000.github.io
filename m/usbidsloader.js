import{loadTextAsync}from '/m/file.js'

const obj={vendor:{},deviceClasses:{}}
let vendorIdDec
const device={
	class:undefined,
	subclass:undefined
}
export async function usbidsLoader(file,callback){
	callback(await usbidsLoaderAsync(file))
}

export async function usbidsLoaderAsync(file){
	const text=await loadTextAsync(file)
	const array=text.split('\n')
	let i=0
	for(i;i<array.length;i++){
		if(array[i]=='# List of known device classes, subclasses and protocols')break
		const array2=array[i].split(' ')
		if(array2[0].startsWith('#'))continue
		else if(array2[0].startsWith('\t'))setDevice(array2)
		else setVendor(array2)
	}
	for(i;i<array.length;i++){
		if(array[i]=='# List of Audio Class Terminal Types')break
		const array2=array[i].split(' ')
		if(array2[0].startsWith('#'))continue
		else if(array2[0].startsWith('\t\t'))setProtocol(array2)
		else if(array2[0].startsWith('\t'))setSubclass(array2)
		else if(array2[0].startsWith('C'))setClass(array2)
	}
	return obj
}

function setProtocol(array){
	const hex=array[0].trimStart()
	const idDec=parseInt('0x'+hex,16)
	obj.deviceClasses[device.class].subclasses[device.subclass].protocol[idDec]={
		name:getName(array,2)
	}
}

function setSubclass(array){
	const hex=array[0].trimStart()
	device.subclass=parseInt('0x'+hex,16)
	obj.deviceClasses[device.class].subclasses[device.subclass]={
		name:getName(array,2),
		protocol:{}
	}
}

function setClass(array){
	device.class=parseInt('0x'+array[1],16)
	obj.deviceClasses[device.class]={
		name:getName(array,3),
		subclasses:{}
	}
}

function setDevice(array){
	const hex=array[0].trimStart()
	const idDec=parseInt('0x'+hex,16)
	obj.vendor[vendorIdDec].devices[idDec]={
		name:getName(array,2)
	}
}

function setVendor(array){
	vendorIdDec=parseInt('0x'+array[0],16)
	obj.vendor[vendorIdDec]={
		name:getName(array,2),
		devices:{}
	}
}

function getName(array,start){
	let name=''
	for(let i=start;i<array.length;i++){
		name+=array[i]
		if(i!=array.length-1)name+=' '
	}
	return name
}
