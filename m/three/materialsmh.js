import * as THREE from '../../l/three/build/three.module.js'
import * as Nodes from '../../l/three/examples/jsm/nodes/Nodes.js'
import{nodeFrame}from '../../l/three/examples/jsm/renderers/webgl/nodes/WebGLNodes.js'
import{texturesMh}from './texturesmh.js'

const opacity=new Nodes.OperatorNode(
	'*',
	new Nodes.OperatorNode(
		'*',
		new Nodes.AttributeNode('visible'),
		new Nodes.AttributeNode('visible2')
	),
		new Nodes.UniformNode(65535)
)

export const materialsMh={
	skin:{
		middleagedarkskinnedfemale:new Nodes.MeshStandardNodeMaterial({
			colorNode:new Nodes.TextureNode(texturesMh.skin.middleagedarkskinnedfemale),
			opacityNode:opacity,
			transparent:true,
		}),
		middleagelightskinnedfemale:new Nodes.MeshStandardNodeMaterial({
			colorNode:new Nodes.TextureNode(texturesMh.skin.middleagelightskinnedfemale),
			opacityNode:opacity,
			transparent:true,
		}),
		middleagelightskinnedfemale2:new Nodes.MeshStandardNodeMaterial({
			colorNode:new Nodes.TextureNode(texturesMh.skin.middleagelightskinnedfemale2),
			opacityNode:opacity,
			transparent:true,
		}),
		youngdarkskinnedfemale:new Nodes.MeshStandardNodeMaterial({
			colorNode:new Nodes.TextureNode(texturesMh.skin.youngdarkskinnedfemale),
			opacityNode:opacity,
			transparent:true,
		}),
		younglightskinnedfemale:new Nodes.MeshStandardNodeMaterial({
			colorNode:new Nodes.TextureNode(texturesMh.skin.younglightskinnedfemale),
			opacityNode:opacity,
			transparent:true,
		}),
		younglightskinnedfemale2:new Nodes.MeshStandardNodeMaterial({
			colorNode:new Nodes.TextureNode(texturesMh.skin.younglightskinnedfemale2),
			opacityNode:opacity,
			transparent:true,
		}),
		younglightskinnedfemale3:new Nodes.MeshStandardNodeMaterial({
			colorNode:new Nodes.TextureNode(texturesMh.skin.younglightskinnedfemale3),
			opacityNode:opacity,
			transparent:true,
		}),
	},
	eyes:{
		blue:new THREE.MeshStandardMaterial({
			map:texturesMh.eyes.blue
		}),
		bluegreen:new THREE.MeshStandardMaterial({
			map:texturesMh.eyes.bluegreen
		}),
		brown:new THREE.MeshStandardMaterial({
			map:texturesMh.eyes.brown
		}),
		brownlight:new THREE.MeshStandardMaterial({
			map:texturesMh.eyes.brownlight
		}),
		deepblue:new THREE.MeshStandardMaterial({
			map:texturesMh.eyes.deepblue
		}),
		green:new THREE.MeshStandardMaterial({
			map:texturesMh.eyes.green
		}),
		grey:new THREE.MeshStandardMaterial({
			map:texturesMh.eyes.grey
		}),
		ice:new THREE.MeshStandardMaterial({
			map:texturesMh.eyes.ice
		}),
		lightblue:new THREE.MeshStandardMaterial({
			map:texturesMh.eyes.lightblue
		})
	}
}
