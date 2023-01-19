import{usbidsLoader}from '/m/usbidsloader.js'

const messageText={
	jaJP:'ボタンをクリックしデバイスを選択するとUSBデバイス情報が表示されます。このプログラムはwebUSB APIに対応したブラウザのみ実行できます。',
	default:'Click the button and select the device to display the USB device information. This program can only be executed with browsers that support the webUSB API.'
}
const label=document.getElementById('label')
const button=document.getElementById('button')
const textarea=document.getElementById('textarea')
let usbids
let text
switch(navigator.language){
	case 'ja':case 'ja-JP':label.textContent=messageText.jaJP;break
	default:label.textContent=messageText.default
}
usbidsLoader('/a/ids/usb.ids',usbidsLoaderCallback)

function usbidsLoaderCallback(obj){
	usbids=obj
	console.log('usbids',usbids)
	button.addEventListener('pointerdown',pointerdown)
}

async function pointerdown(){
	const usbDevice=await navigator.usb.requestDevice({'filters':[]})
	console.log('usbDevice',usbDevice)
	text='vendor\n\tvendorId\t:'
		+usbDevice.vendorId
		+'\t(0x'+usbDevice.vendorId.toString(16)
		+')\n\tmanufactureName:\t'
		+usbDevice.manufacturerName
		+'\n\tusb.ids vendor name:\t'
		+usbids.vendor[usbDevice.vendorId].name
		+'\n\nproduct\n\tproductId:\t'
		+usbDevice.productId
		+'\t(0x'+usbDevice.productId.toString(16)
		+')\n\tproductName:\t'
		+usbDevice.productName
		+'\n\tusb.ids device name:\t'
		+usbids.vendor[usbDevice.vendorId].devices[usbDevice.productId].name
		+'\n\nserialNumber\t'
		+usbDevice.serialNumber
		+'\n\ndeviceVersion:\t'
		+usbDevice.deviceVersionMajor+'.'+usbDevice.deviceVersionMinor+'.'+usbDevice.deviceVersionSubminor
		+'\n\nusbVersion:\t'
		+usbDevice.usbVersionMajor+'.'+usbDevice.usbVersionMinor+'.'+usbDevice.usbVersionSubminor
		+'\n\nconfigurations\n'
	setConfigurations(usbDevice.configurations)
	textarea.value=text
}

function setConfigurations(configurations){
	for(let i=0;i<configurations.length;i++){
		const configuration=configurations[i]
		text+='\tconfigurationValue:\t'
			+configuration.configurationValue
			+'\n\tconfigurationName:\t'
			+configuration.configurationName
			+'\n\tinterfaces\n'
		setInterfaces(configuration.interfaces)
	}
}

function setInterfaces(interfaces){
	for(let i=0;i<interfaces.length;i++){
		text+='\t\tinterfaceNumber:\t'
			+interfaces[i].interfaceNumber
			+'\n\t\talternates\n'
		setAlternates(interfaces[i].alternates)
	}
}

function setAlternates(alternates){
	for(let i=0;i<alternates.length;i++){
		const alternate=alternates[i]
		const interfaceClass=usbids.deviceClasses[alternate.interfaceClass]
		const interfaceSubclass=interfaceClass.subclasses[alternate.interfaceSubclass]
		text+='\t\t\talternateSetting:\t'
			+alternate.alternateSetting
			+'\n\t\t\tinterfaceName:\t'
			+alternate.interfaceName
			+'\n\t\t\tinterfaceClass:\t'
			+alternate.interfaceClass
			+'\t('+interfaceClass.name
			+')\n\t\t\tinterfaceSubclass:\t'
			+alternate.interfaceSubclass
			+'\t('+interfaceSubclass.name
			+')\n\t\t\tinterfaceProtocol:\t'
			+alternate.interfaceProtocol
			+'\t('+interfaceSubclass.protocol[alternate.interfaceProtocol].name
			+')\n\t\t\tendpoints\n'
		setEndpoints(alternate.endpoints)
	}
}

function setEndpoints(endpoints){
	for(let i=0;i<endpoints.length;i++){
		const endpoint=endpoints[i]
		text+='\t\t\t\tendpointNumber:\t'
			+endpoint.endpointNumber
			+'\n\t\t\t\t\tdirection:\t'
			+endpoint.direction
			+'\n\t\t\t\t\ttype:\t'
			+endpoint.type
			+'\n\t\t\t\t\tpacketSize:\t'
			+endpoint.packetSize+'\n'
	}
}