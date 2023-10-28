import{OrbitControlsMain}from '/l/orbitcontrolsworker/OrbitControlsMain.js'

const worker=new Worker('worker.js',{type:'module'})
const canvas=document.createElement('canvas')
const offscreen=canvas.transferControlToOffscreen()
let controlsMain
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
	controlsMain.listenToKeyEvents(window) 
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
