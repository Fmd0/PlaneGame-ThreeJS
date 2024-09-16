import * as THREE from 'three'
import {OrbitControls} from "three/addons";
import Light from "./create/Light";
import Forest from "./create/Forest";
import createFlowers from "./create/createFlowers";
import Land from "./create/Land";
import Sky from "./create/Sky";



export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
window.document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xc0c0c0, 1)
// scene.fog = new THREE.Fog(0xf7d9aa, 200, 1000);
scene.fog = new THREE.Fog(0xc0c0c0, 200, 1000);
renderer.shadowMap.enabled = true;



const light = new Light();
scene.add(light.directionalLight);
scene.add(light.hemisphereLight);
const land = new Land();
scene.add(land.mesh)
const sky = new Sky();
scene.add(sky.mesh)
const forest = new Forest();
scene.add(forest.mesh);
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

camera.position.set(0, 770, 400);
orbitControls.target.set(0, 750, 0);

const loop = () => {
    renderer.render(scene, camera);
    orbitControls.update();

    land.mesh.rotation.y -= 0.001;
    sky.mesh.rotation.z += 0.001;
    forest.mesh.rotation.z += 0.001;
    flowers.rotation.z += 0.001;
    // bladeGroup.rotation.x += 0.2;

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
        // planeGroup.position.x = width;
        // planeGroup.position.y = height;
    }
})();

const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleResize);
// window.addEventListener('pointermove', handlePointerMove);

