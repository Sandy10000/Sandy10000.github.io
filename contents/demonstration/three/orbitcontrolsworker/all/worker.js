import * as THREE from '/l/three/build/three.module.min.js'
import{OrbitControlsWorker}from '/l/orbitcontrolsworker/OrbitControlsWorker.js'

console.log('THREE.REVISION',THREE.REVISION)
const scene=new THREE.Scene()
const camera=new THREE.PerspectiveCamera()
let renderer,controlsWorker,key
const directionalLight = new THREE.DirectionalLight()
const ambientLight = new THREE.AmbientLight()
const geometry=new THREE.ConeGeometry()
const material=new THREE.MeshPhongMaterial()
for(let i=0;i<500;i++){
	const mesh=new THREE.Mesh(geometry,material)
	mesh.position.x=Math.random()*160-80
	mesh.position.y=0
	mesh.position.z=Math.random()*160-80
	mesh.updateMatrix()
	mesh.matrixAutoUpdate=false
	scene.add(mesh)
}
camera.position.set(40,20,0)
directionalLight.position.set(1,1,1)
scene.add(directionalLight,ambientLight)

function resize(size){
	camera.aspect=size.width/size.height
	camera.updateProjectionMatrix()
	renderer.setSize(size.width,size.height,false)
}

function animate(){
	requestAnimationFrame(animate)
	if(controlsWorker.autoRotate||controlsWorker.enableDamping)controlsWorker.update()
	render()
}

function render(){
	renderer.render(scene,camera)
}

function  message(event){
	switch(event.data.command){
		case 'init':
			init(event.data.config)
			resize(event.data.size)
			animate()
			break
		case 'resize':resize(event.data.size);break
		case 'changeProperty':
			key=Object.keys(event.data.object)[0]
			controlsWorker[key]=event.data.object[key]
			break
		case 'changePropertyTarget':
			key=Object.keys(event.data.object)[0]
			controlsWorker.target[key]=event.data.object[key]
			break
		case 'changePropertyCursor':
			key=Object.keys(event.data.object)[0]
			controlsWorker.cursor[key]=event.data.object[key]
			break
		case 'changePropertyMouseButtons':
			key=Object.keys(event.data.object)[0]
			controlsWorker.mouseButtons[key]=event.data.object[key]
			break
		case 'changePropertyTouches':
			key=Object.keys(event.data.object)[0]
			controlsWorker.touches[key]=event.data.object[key]
			break
		case 'getPolarAngle':console.log('getPolarAngle',controlsWorker.getPolarAngle());break
		case 'getAzimuthalAngle':console.log('getAzimuthalAngle',controlsWorker.getAzimuthalAngle());break
		case 'getDistance':console.log('getDistance',controlsWorker.getDistance());break
		case 'saveState':controlsWorker.saveState();break
		case 'reset':controlsWorker.reset();break
		default:controlsWorker.message(event.data)
	}
}

function init(config){
	renderer=new THREE.WebGLRenderer({canvas:config.drawingSurface})
	renderer.setPixelRatio(config.pixelRatio)
	controlsWorker=new OrbitControlsWorker(camera,renderer.domElement)
}

addEventListener('message',message)
