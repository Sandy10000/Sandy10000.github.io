import * as THREE from '../../l/three/build/three.module.js'

const path='../../a/png/mh/'
const loader=new THREE.TextureLoader()
export const texturesMh={
	skin:{
		middleagedarkskinnedfemale:loader.load(path+'skin/middleage_darkskinned_female_diffuse.png'),
		middleagelightskinnedfemale:loader.load(path+'skin/middleage_lightskinned_female_diffuse.png'),
		middleagelightskinnedfemale2:loader.load(path+'skin/middleage_lightskinned_female_diffuse2.png'),
		youngdarkskinnedfemale:loader.load(path+'skin/young_darkskinned_female_diffuse.png'),
		younglightskinnedfemale:loader.load(path+'skin/young_lightskinned_female_diffuse.png'),
		younglightskinnedfemale2:loader.load(path+'skin/young_lightskinned_female_diffuse2.png'),
		younglightskinnedfemale3:loader.load(path+'skin/young_lightskinned_female_diffuse3.png')
	},
	eyes:{
		blue:loader.load(path+'eyes/blue_eye.png'),
		bluegreen:loader.load(path+'eyes/bluegreen_eye.png'),
		brown:loader.load(path+'eyes/brown_eye.png'),
		brownlight:loader.load(path+'eyes/brownlight_eye.png'),
		deepblue:loader.load(path+'eyes/deepblue_eye.png'),
		green:loader.load(path+'eyes/green_eye.png'),
		grey:loader.load(path+'eyes/grey_eye.png'),
		ice:loader.load(path+'eyes/ice_eye.png'),
		lightblue:loader.load(path+'eyes/lightblue_eye.png')
	}
}
for(let i in texturesMh)for(let j in texturesMh[i])texturesMh[i][j].flipY=false
