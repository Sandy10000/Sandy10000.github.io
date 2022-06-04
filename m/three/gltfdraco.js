import{GLTFLoader}from '../../l/three/examples/jsm/loaders/GLTFLoader.js'
import{DRACOLoader}from '../../l/three/examples/jsm/loaders/DRACOLoader.js'

const loader={
	gltf:new GLTFLoader(),
	draco:new DRACOLoader()
}
export async function gltfDraco(path,file){
	loader.draco.setDecoderPath(path.dracodecoder)
	loader.gltf.setDRACOLoader(loader.draco)
	return await loader.gltf.loadAsync(path.glb+file)
}
