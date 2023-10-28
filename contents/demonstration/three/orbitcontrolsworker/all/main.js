import{MOUSE,TOUCH}from '/l/three/build/three.module.min.js'
import{OrbitControlsMain}from '/l/orbitcontrolsworker/OrbitControlsMain.js'
import{GUI}from '/l/three/examples/jsm/libs/lil-gui.module.min.js'

const worker=new Worker('worker.js',{type:'module'})
const canvas=document.createElement('canvas')
const offscreen=canvas.transferControlToOffscreen()
let controlsMain
const gui=new GUI()
const folderMain=gui.addFolder('Main')
const folderMainProperties=folderMain.addFolder('properties')
const folderMainPropertiesKeys=folderMainProperties.addFolder('keys')
const folderMainMethods=folderMain.addFolder('methods')
const folderWorker=gui.addFolder('Worker')
const folderWorkerProperties=folderWorker.addFolder('properties')
const folderWorkerPropertiesTarget=folderWorkerProperties.addFolder('target')
const folderWorkerPropertiesCursor=folderWorkerProperties.addFolder('cursor')
const folderWorkerPropertiesMouseButtons=folderWorkerProperties.addFolder('mouseButtons')
const folderWorkerPropertiesTouches=folderWorkerProperties.addFolder('touches')
const folderWorkerMethods=folderWorker.addFolder('methods')
const controlsWorker={
	properties:{
		target:{x:0,y:0,z:0},
		cursor:{x:0,y:0,z:0},
		minDistance:0,
		maxDistance:Infinity,
		minZoom:0,
		maxZoom:Infinity,
		minPolarAngle:0,
		maxPolarAngle:Math.PI,
		minAzimuthAngle:-Infinity,
		maxAzimuthAngle:Infinity,
		enableDamping:false,
		dampingFactor:.05,
		enableZoom:true,
		zoomSpeed:1.,
		enableRotate:true,
		rotateSpeed:1.,
		enablePan:true,
		panSpeed:1.,
		screenSpacePanning:true,
		keyPanSpeed:7.,
		zoomToCursor:false,
		autoRotate:false,
		autoRotateSpeed:2.,
		mouseButtons:{
			LEFT:'ROTATE',
			MIDDLE:'DOLLY',
			RIGHT:'PAN'
		},
		touches:{
			ONE:'ROTATE',
			TWO:'DOLLY_PAN'
		}
	}
}
const MOUSEKEYS=['ROTATE','DOLLY','PAN']
const TOUCHKEYS=Object.keys(TOUCH)
document.body.appendChild(canvas)
worker.addEventListener('error',onError,false)
addEventListener('resize',resize)
init()

function onError(e){
	console.log('error',e)
}

function init(){
	worker.postMessage({
		command:'init',
		config:{
			drawingSurface: offscreen,
			pixelRatio:devicePixelRatio
		},
		size:{
			width:innerWidth,
			height:innerHeight,
		}
	},[offscreen])
	controlsMain=new OrbitControlsMain(canvas,worker)
	folderMainProperties.add(controlsMain,'enabled')
	folderMainProperties.add(controlsMain,'zoomToCursor')
	folderMainPropertiesKeys.add(controlsMain.keys,'LEFT')
	folderMainPropertiesKeys.add(controlsMain.keys,'UP')
	folderMainPropertiesKeys.add(controlsMain.keys,'RIGHT')
	folderMainPropertiesKeys.add(controlsMain.keys,'BOTTOM')
	const mainMethod={
		listenToKeyEvents:function(){
			if(controlsMain._domElementKeyEvents==null){
				controlsMain.listenToKeyEvents(window)
				methodListenToKeyEvents.name('stopListenToKeyEvents')
			}else{
				controlsMain.stopListenToKeyEvents()
				methodListenToKeyEvents.name('listenToKeyEvents')
			}
		},
		dispose:function(){
			controlsMain.dispose()
			methodDispose.destroy()
		}
	}
	const methodListenToKeyEvents=folderMainMethods.add(mainMethod,'listenToKeyEvents')
	const methodDispose=folderMainMethods.add(mainMethod,'dispose')
	folderWorkerPropertiesTarget.add(controlsWorker.properties.target,'x').onChange(targetX)
	folderWorkerPropertiesTarget.add(controlsWorker.properties.target,'y').onChange(targetY)
	folderWorkerPropertiesTarget.add(controlsWorker.properties.target,'z').onChange(targetZ)
	folderWorkerPropertiesCursor.add(controlsWorker.properties.cursor,'x').onChange(cursorX)
	folderWorkerPropertiesCursor.add(controlsWorker.properties.cursor,'y').onChange(cursorY)
	folderWorkerPropertiesCursor.add(controlsWorker.properties.cursor,'z').onChange(cursorZ)
	folderWorkerProperties.add(controlsWorker.properties,'minDistance').onChange(minDistance)
	folderWorkerProperties.add(controlsWorker.properties,'maxDistance').onChange(maxDistance)
	folderWorkerProperties.add(controlsWorker.properties,'minZoom').onChange(minZoom)
	folderWorkerProperties.add(controlsWorker.properties,'maxZoom').onChange(maxZoom)
	folderWorkerProperties.add(controlsWorker.properties,'minPolarAngle').onChange(minPolarAngle)
	folderWorkerProperties.add(controlsWorker.properties,'maxPolarAngle').onChange(maxPolarAngle)
	folderWorkerProperties.add(controlsWorker.properties,'minAzimuthAngle').onChange(minAzimuthAngle)
	folderWorkerProperties.add(controlsWorker.properties,'maxAzimuthAngle').onChange(maxAzimuthAngle)
	folderWorkerProperties.add(controlsWorker.properties,'enableDamping').onChange(enableDamping)
	folderWorkerProperties.add(controlsWorker.properties,'dampingFactor').onChange(dampingFactor)
	folderWorkerProperties.add(controlsWorker.properties,'enableZoom').onChange(enableZoom)
	folderWorkerProperties.add(controlsWorker.properties,'zoomSpeed').onChange(zoomSpeed)
	folderWorkerProperties.add(controlsWorker.properties,'enableRotate').onChange(enableRotate)
	folderWorkerProperties.add(controlsWorker.properties,'rotateSpeed').onChange(rotateSpeed)
	folderWorkerProperties.add(controlsWorker.properties,'enablePan').onChange(enablePan)
	folderWorkerProperties.add(controlsWorker.properties,'panSpeed').onChange(panSpeed)
	folderWorkerProperties.add(controlsWorker.properties,'screenSpacePanning').onChange(screenSpacePanning)
	folderWorkerProperties.add(controlsWorker.properties,'keyPanSpeed').onChange(keyPanSpeed)
	folderWorkerProperties.add(controlsWorker.properties,'zoomToCursor').onChange(zoomToCursor)
	folderWorkerProperties.add(controlsWorker.properties,'autoRotate').onChange(autoRotate)
	folderWorkerProperties.add(controlsWorker.properties,'autoRotateSpeed').onChange(autoRotateSpeed)
	folderWorkerPropertiesMouseButtons.add(controlsWorker.properties.mouseButtons,'LEFT',MOUSEKEYS).onChange(left)
	folderWorkerPropertiesMouseButtons.add(controlsWorker.properties.mouseButtons,'MIDDLE',MOUSEKEYS).onChange(middle)
	folderWorkerPropertiesMouseButtons.add(	controlsWorker.properties.mouseButtons,'RIGHT',MOUSEKEYS).onChange(right)
	folderWorkerPropertiesTouches.add(controlsWorker.properties.touches,'ONE',TOUCHKEYS).onChange(one)
	folderWorkerPropertiesTouches.add(controlsWorker.properties.touches,'TWO',TOUCHKEYS).onChange(two)
	const workerMethods={
		getPolarAngle:function(){worker.postMessage({command:'getPolarAngle'})},
		getAzimuthalAngle:function(){worker.postMessage({command:'getAzimuthalAngle'})},
		getDistance:function(){worker.postMessage({command:'getDistance'})},
		saveState:function(){worker.postMessage({command:'saveState'})},
		reset:function(){worker.postMessage({command:'reset'})}
	}
	folderWorkerMethods.add(workerMethods,'getPolarAngle')
	folderWorkerMethods.add(workerMethods,'getAzimuthalAngle')
	folderWorkerMethods.add(workerMethods,'getDistance')
	folderWorkerMethods.add(workerMethods,'saveState')
	folderWorkerMethods.add(workerMethods,'reset')
}

function resize(){
	worker.postMessage({
		command:'resize',
		size:{
			width:innerWidth,
			height:innerHeight,
		}
	})
}

function targetX(){
	worker.postMessage({
		command:'changePropertyTarget',
		object:{x:controlsWorker.properties.target.x}
	})
}
function targetY(){
	worker.postMessage({
		command:'changePropertyTarget',
		object:{y:controlsWorker.properties.target.y}
	})
}
function targetZ(){
	worker.postMessage({
		command:'changePropertyTarget',
		object:{z:controlsWorker.properties.target.z}
	})
}

function cursorX(){
	worker.postMessage({
		command:'changePropertyCursor',
		object:{x:controlsWorker.properties.cursor.x}
	})
}
function cursorY(){
	worker.postMessage({
		command:'changePropertyCursor',
		object:{y:controlsWorker.properties.cursor.y}
	})
}
function cursorZ(){
	worker.postMessage({
		command:'changePropertyCursor',
		object:{z:controlsWorker.properties.cursor.z}
	})
}

function minDistance(){
	worker.postMessage({
		command:'changeProperty',
		object:{minDistance:controlsWorker.properties.minDistance}
	})
}

function maxDistance(){
	worker.postMessage({
		command:'changeProperty',
		object:{maxDistance:controlsWorker.properties.maxDistance}
	})
}

function minZoom(){
	worker.postMessage({
		command:'changeProperty',
		object:{minZoom:controlsWorker.properties.minZoom}
	})
}

function maxZoom(){
	worker.postMessage({
		command:'changeProperty',
		object:{maxZoom:controlsWorker.properties.maxZoom}
	})
}

function minPolarAngle(){
	worker.postMessage({
		command:'changeProperty',
		object:{minPolarAngle:controlsWorker.properties.minPolarAngle}
	})
}

function maxPolarAngle(){
	worker.postMessage({
		command:'changeProperty',
		object:{maxPolarAngle:controlsWorker.properties.maxPolarAngle}
	})
}

function minAzimuthAngle(){
	worker.postMessage({
		command:'changeProperty',
		object:{minAzimuthAngle:controlsWorker.properties.minAzimuthAngle}
	})
}

function maxAzimuthAngle(){
	worker.postMessage({
		command:'changeProperty',
		object:{maxAzimuthAngle:controlsWorker.properties.maxAzimuthAngle}
	})
}

function enableDamping(){
	worker.postMessage({
		command:'changeProperty',
		object:{enableDamping:controlsWorker.properties.enableDamping}
	})
}

function dampingFactor(){
	worker.postMessage({
		command:'changeProperty',
		object:{dampingFactor:controlsWorker.properties.dampingFactor}
	})
}

function enableZoom(){
	worker.postMessage({
		command:'changeProperty',
		object:{enableZoom:controlsWorker.properties.enableZoom}
	})
}

function zoomSpeed(){
	worker.postMessage({
		command:'changeProperty',
		object:{zoomSpeed:controlsWorker.properties.zoomSpeed}
	})
}

function enableRotate(){
	worker.postMessage({
		command:'changeProperty',
		object:{enableRotate:controlsWorker.properties.enableRotate}
	})
}

function rotateSpeed(){
	worker.postMessage({
		command:'changeProperty',
		object:{rotateSpeed:controlsWorker.properties.rotateSpeed}
	})
}

function enablePan(){
	worker.postMessage({
		command:'changeProperty',
		object:{enablePan:controlsWorker.properties.enablePan}
	})
}

function panSpeed(){
	worker.postMessage({
		command:'changeProperty',
		object:{panSpeed:controlsWorker.properties.panSpeed}
	})
}

function screenSpacePanning(){
	worker.postMessage({
		command:'changeProperty',
		object:{screenSpacePanning:controlsWorker.properties.screenSpacePanning}
	})
}

function keyPanSpeed(){
	worker.postMessage({
		command:'changeProperty',
		object:{keyPanSpeed:controlsWorker.properties.keyPanSpeed}
	})
}

function zoomToCursor(){
	worker.postMessage({
		command:'changeProperty',
		object:{zoomToCursor:controlsWorker.properties.zoomToCursor}
	})
}

function autoRotate(){
	worker.postMessage({
		command:'changeProperty',
		object:{autoRotate:controlsWorker.properties.autoRotate}
	})
}

function autoRotateSpeed(){
	worker.postMessage({
		command:'changeProperty',
		object:{autoRotateSpeed:controlsWorker.properties.autoRotateSpeed}
	})
}

function left(){
	worker.postMessage({
		command:'changePropertyMouseButtons',
		object:{LEFT:MOUSE[controlsWorker.properties.mouseButtons.LEFT]}
	})
}

function middle(){
	worker.postMessage({
		command:'changePropertyMouseButtons',
		object:{MIDDLE:MOUSE[controlsWorker.properties.mouseButtons.MIDDLE]}
	})
}

function right(){
	worker.postMessage({
		command:'changePropertyMouseButtons',
		object:{RIGHT:MOUSE[controlsWorker.properties.mouseButtons.RIGHT]}
	})
}

function one(){
	worker.postMessage({
		command:'changePropertyTouches',
		object:{ONE:TOUCH[controlsWorker.properties.touches.ONE]}
	})
}

function two(){
	worker.postMessage({
		command:'changePropertyTouches',
		object:{TWO:TOUCH[controlsWorker.properties.touches.TWO]}
	})
}

