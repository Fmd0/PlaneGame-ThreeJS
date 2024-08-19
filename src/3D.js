import * as THREE from 'three'
import {OrbitControls} from "three/addons";
import createSky from "./create/createSky";
import createSea from "./create/createSea";
import {Colors} from "./utils/constants";
import createPlane from "./create/createPlane";
import {createTree} from "./create/createForest";
import {createFlower} from "./create/createFlowers";



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
window.document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xf7d9aa, 0)
scene.fog = new THREE.Fog(0xf7d9aa, 400, 950);
renderer.shadowMap.enabled = true;


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
createLight();
const cylinderMesh = createSea();
scene.add(cylinderMesh)
const skyGroup = createSky();
scene.add(skyGroup)

const {planeGroup, bladeGroup} = createPlane();
scene.add(planeGroup)


const petalMesh = createFlower();
petalMesh.position.set(0, 700, 0)
scene.add(petalMesh)

const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.enableZoom = false;
// orbitControls.enablePan = false;
// orbitControls.enableRotate = false;
orbitControls.enableDamping = true;

// setInterval(() => {
//     console.log(camera.position);
//     console.log(orbitControls.target);
// }, 3000)

camera.position.set(0, 720, 400);
orbitControls.target.set(0, 710, 300);

const loop = () => {
    renderer.render(scene, camera);
    orbitControls.update();

    cylinderMesh.rotation.y -= 0.001;
    skyGroup.rotation.z += 0.001;
    bladeGroup.rotation.x += 0.2;

    window.requestAnimationFrame(loop);
}
loop()

const handlePointerMove = (() => {
    let isThrottle = false;
    return (event) => {
        if(isThrottle) return;
        isThrottle = true;
        setTimeout(() => {
            isThrottle = false;
        }, 30);
        const heightRatio = (window.innerHeight - event.clientY) / window.innerHeight;
        let height = (heightRatio-0.52)*window.innerHeight*0.75+650;
        height = height<640?640:height;
        height = height>850?850:height;

        const widthRatio = (event.clientX) / window.innerWidth;
        let width = (widthRatio-0.487)*window.innerWidth*0.75-20;
        width = width<-350?-350:width;
        width = width>350?350:width;
        planeGroup.position.x = width;
        planeGroup.position.y = height;
    }
})();

const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleResize);
// window.addEventListener('pointermove', handlePointerMove);

export {
    scene,
    camera,
}