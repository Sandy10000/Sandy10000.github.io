import * as THREE from '../../../../l/three/build/three.module.js'
import{OrbitControls}from '../../../../l/three/examples/jsm/controls/OrbitControls.js'

const scene=new THREE.Scene()
const camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,.1,10)
const renderer=new THREE.WebGLRenderer()
const controles=new OrbitControls(camera,renderer.domElement)
const lights={
	ambient:new THREE.AmbientLight(0xaaaaaa),
	directional:new THREE.DirectionalLight(0x888888)
}
const mesh=new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshBasicMaterial({color:new THREE.Color(0xff0000)}))
scene.background=new THREE.Color(0x888888)
camera.position.set(0,1,2)
camera.lookAt(0,0,0)
lights.directional.position.set(0,1,1).normalize
addEventListener('resize', resize)
document.body.appendChild(renderer.domElement)
scene.add(lights.ambient,lights.directional,mesh)
resize()
animate()
console.log('THREE.REVISION',THREE.REVISION)
console.log('scene',scene)

function resize(){
	camera.aspect=innerWidth/innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(innerWidth,innerHeight)
	render()
}

function render(){
	renderer.render(scene,camera)
}

function animate(){
    requestAnimationFrame(animate)
	render()
}
