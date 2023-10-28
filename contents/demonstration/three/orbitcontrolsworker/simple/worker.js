import * as THREE from '/l/three/build/three.module.min.js'
import{OrbitControlsWorker}from '/l/orbitcontrolsworker/OrbitControlsWorker.js'

console.log('THREE.REVISION',THREE.REVISION)
const scene=new THREE.Scene()
const camera=new THREE.PerspectiveCamera()
let renderer,controlsWorker
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
		default:controlsWorker.message(event.data)
	}
}

function init(config){
	renderer=new THREE.WebGLRenderer({canvas:config.drawingSurface})
	renderer.setPixelRatio(config.pixelRatio)
	controlsWorker=new OrbitControlsWorker(camera,renderer.domElement)
	controlsWorker.screenSpacePanning=false
}

addEventListener('message',message)
