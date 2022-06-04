import * as THREE from '../../l/three/build/three.module.js'
import * as SkeletonUtils from '../../l/three/examples/jsm/utils/SkeletonUtils.js'
import{gltfDraco}from './gltfdraco.js'
import{materialsMh}from './materialsmh.js'
import{importText}from '../file.js'

const path={
	dracodecoder:'../../l/three/examples/js/libs/draco/',
	glb:'../../a/glb/'
}
const glb=await gltfDraco(path,'human.glb')
const jsontext=await importText('../../a/json/visible.json')
const visible=JSON.parse(jsontext)
console.log('glb',glb)

export class Character{
	constructor(setting){
		this.model=SkeletonUtils.clone(glb.scene.getObjectByName('Armature'))
		this.skin=setting.skin,
		this.eyes=setting.eyes,
		this.hair=setting.hair,
		this.eyebrow=setting.eyebrow,
		this.eyelashes=setting.eyelashes,
		this.teeth=setting.teeth
		this.mixer
		this.walk
		const body=this.model.getObjectByName('Human')
		body.geometry.setAttribute('visible',new THREE.BufferAttribute(new Uint8Array(visible.body),1,true))
		body.geometry.setAttribute('visible2',new THREE.BufferAttribute(new Uint8Array(visible.female_casualsuit01),1,true))
		const eyes=this.model.getObjectByName('eyes')
		const parts={
			hair:SkeletonUtils.clone(glb.scene.getObjectByName(this.hair)),
			eyebrow:SkeletonUtils.clone(glb.scene.getObjectByName(this.eyebrow)),
			eyelashes:SkeletonUtils.clone(glb.scene.getObjectByName(this.eyelashes)),
			teeth:SkeletonUtils.clone(glb.scene.getObjectByName(this.teeth)),
			cloth:SkeletonUtils.clone(glb.scene.getObjectByName('female_casualsuit01'))
		}
		for(let i in parts){
			parts[i].parent=this.model
			parts[i].skeleton=body.skeleton
			this.model.children.push(parts[i])
		}
		body.material=this.setSkin()
		eyes.material=this.setEyes()
		this.mixer=new THREE.AnimationMixer(body)
		this.walk=this.mixer.clipAction(glb.animations[0])
		this.walk.play()
		return this
	}
	setSkin(){
		switch(this.skin){
			case 'middleagedarkskinnedfemale':
				return materialsMh.skin.middleagedarkskinnedfemale
			case 'middleagelightskinnedfemale':
				return materialsMh.skin.middleagelightskinnedfemale
			case 'middleagelightskinnedfemale2':
				return materialsMh.skin.middleagelightskinnedfemale2
			case 'youngdarkskinnedfemale':
				return materialsMh.skin.youngdarkskinnedfemale
			case 'younglightskinnedfemale':
				return materialsMh.skin.younglightskinnedfemale
			case 'younglightskinnedfemale2':
				return materialsMh.skin.younglightskinnedfemale2
			case 'younglightskinnedfemale3':
				return materialsMh.skin.younglightskinnedfemale3
		}
	}
	setEyes(){
		switch(this.eyes){
			case 'blue':
				return materialsMh.eyes.blue
			case 'bluegreen':
				return materialsMh.eyes.bluegreen
			case 'brown':
				return materialsMh.eyes.brown
			case 'brownlight':
				return materialsMh.eyes.brownlight
			case 'deepblue':
				return materialsMh.eyes.deepblue
			case 'green':
				return materialsMh.eyes.green
			case 'grey':
				return materialsMh.eyes.grey
			case 'ice':
				return materialsMh.eyes.ice
			case 'lightblue':
				return materialsMh.eyes.lightblue
		}
	}
}

