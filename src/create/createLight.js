import * as THREE from "three";
import {scene} from "../3D";


const createLight = () => {
    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, 1);
    scene.add(hemisphereLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(400, 800, 800);

    directionalLight.castShadow = true;
    const length = 1000;
    directionalLight.shadow.camera.left = -length;
    directionalLight.shadow.camera.right = length;
    directionalLight.shadow.camera.top = length;
    directionalLight.shadow.camera.bottom = -length;
    directionalLight.shadow.camera.far = 1200;
    directionalLight.shadow.camera.near = 400;

    directionalLight.shadow.mapSize.width = 1024*4;
    directionalLight.shadow.mapSize.height = 1024*4;


    // const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    // scene.add(cameraHelper);

    scene.add(directionalLight);
}

export default createLight;