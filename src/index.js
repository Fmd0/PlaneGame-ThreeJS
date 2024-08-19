import * as THREE from 'three'
import {OrbitControls} from "three/addons";
import createSky from "./create/createSky";
import createLand from "./create/createLand";
import createPlane from "./create/createPlane";
import createLight from "./create/createLight";
import createForest from "./create/createForest";
import createFlowers from "./create/createFlowers";



export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
window.document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xf7d9aa, 0)
scene.fog = new THREE.Fog(0xf7d9aa, 200, 1000);
renderer.shadowMap.enabled = true;



const {directionalLight, hemisphereLight} = createLight();
scene.add(directionalLight);
scene.add(hemisphereLight);
const cylinderMesh = createLand();
scene.add(cylinderMesh)
const skyGroup = createSky();
scene.add(skyGroup)
const {planeGroup, bladeGroup} = createPlane();
scene.add(planeGroup)
const forest = createForest();
scene.add(forest);
const flowers = createFlowers();
scene.add(flowers);


const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableZoom = false;
orbitControls.enablePan = false;
orbitControls.enableRotate = false;
orbitControls.enableDamping = true;

// setInterval(() => {
//     console.log(camera.position);
//     console.log(orbitControls.target);
// }, 3000)

camera.position.set(0, 700, 400);
orbitControls.target.set(0, 680, 100);

const loop = () => {
    renderer.render(scene, camera);
    orbitControls.update();

    cylinderMesh.rotation.y -= 0.001;
    skyGroup.rotation.z += 0.001;
    forest.rotation.z += 0.001;
    flowers.rotation.z += 0.001;
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
        let height = (heightRatio-0.52)*window.innerHeight*0.5+670;
        height = height<670?670:height;
        height = height>850?850:height;

        const widthRatio = (event.clientX) / window.innerWidth;
        let width = (widthRatio-0.487)*window.innerWidth*0.5-20;
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
window.addEventListener('pointermove', handlePointerMove);

