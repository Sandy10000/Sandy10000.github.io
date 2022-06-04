import * as THREE from '../../../../l/three/build/three.module.js'
import Stats from '../../../../l/three/examples/jsm/libs/stats.module.js'
import{OrbitControls}from '../../../../l/three/examples/jsm/controls/OrbitControls.js'
import{Character}from '../../../../m/three/character.js'

const scene=new THREE.Scene()
const camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,.1,10)
const renderer=new THREE.WebGLRenderer()
const clock=new THREE.Clock()
const controles=new OrbitControls(camera,renderer.domElement)
const stats=new Stats()
const lights={
	ambient:new THREE.AmbientLight(0xaaaaaa),
	directional:new THREE.DirectionalLight(0x888888)
}
const setting={
	_1:{
		skin:'middleagelightskinnedfemale',
		eyes:'blue',
		hair:'braid01',
		eyebrow:'eyebrow001',
		eyelashes:'eyelashes01',
		teeth:'teeth_shape01'
	},
	_2:{
		skin:'middleagelightskinnedfemale2',
		eyes:'bluegreen',
		hair:'ponytail01',
		eyebrow:'eyebrow002',
		eyelashes:'eyelashes02',
		teeth:'teeth_shape02'
	},
	_3:{
		skin:'middleagedarkskinnedfemale',
		eyes:'brown',
		hair:'short01',
		eyebrow:'eyebrow003',
		eyelashes:'eyelashes03',
		teeth:'teeth_shape03'
	},
	_4:{
		skin:'younglightskinnedfemale',
		eyes:'brownlight',
		hair:'long01',
		eyebrow:'eyebrow004',
		eyelashes:'eyelashes04',
		teeth:'teeth_shape04'
	},
	_5:{
		skin:'youngdarkskinnedfemale',
		eyes:'deepblue',
		hair:'afro01',
		eyebrow:'eyebrow005',
		eyelashes:'eyelashes01',
		teeth:'teeth_shape01'
	},
	_6:{
		skin:'younglightskinnedfemale2',
		eyes:'green',
		hair:'bob02',
		eyebrow:'eyebrow006',
		eyelashes:'eyelashes02',
		teeth:'teeth_shape02'
	},
	_7:{
		skin:'younglightskinnedfemale3',
		eyes:'grey',
		hair:'short02',
		eyebrow:'eyebrow007',
		eyelashes:'eyelashes03',
		teeth:'teeth_shape03'
	}
}
const char1=new Character(setting._1)
const char2=new Character(setting._2)
const char3=new Character(setting._3)
const char4=new Character(setting._4)
const char5=new Character(setting._5)
const char6=new Character(setting._6)
const char7=new Character(setting._7)
scene.background=new THREE.Color(0x888888)
camera.position.set(0,0.8,2.2)
controles.target.set(0,.8,0)
lights.directional.position.set(0,1,1).normalize
char1.model.position.x=-1.5
char2.model.position.x=-1
char3.model.position.x=-.5
char5.model.position.x=.5
char6.model.position.x=1
char7.model.position.x=1.5
addEventListener('resize', resize)
document.body.appendChild(renderer.domElement)
document.body.appendChild(stats.dom)
scene.add(
	lights.ambient,
	lights.directional,
	char1.model,
	char2.model,
	char3.model,
	char4.model,
	char5.model,
	char6.model,
	char7.model,
)
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
	stats.update()
	const delta=clock.getDelta()
	char1.mixer.update(delta)
	char2.mixer.update(delta)
	char3.mixer.update(delta)
	char4.mixer.update(delta)
	char5.mixer.update(delta)
	char6.mixer.update(delta)
	char7.mixer.update(delta)
}

function animate(){
    requestAnimationFrame(animate)
	render()
}
