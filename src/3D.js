import * as THREE from 'three'
import {OrbitControls} from "three/addons";

const Colors = { red:0xf25346, white:0xd8d0d1, brown:0x59332e, pink:0xF5986E, brownDark:0x23190f, blue:0x68c3c0, };


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
window.document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
camera.position.set(0, 0, 100);
renderer.setClearColor(0xf7d9aa, 0)
scene.fog = new THREE.Fog(0xf7d9aa, 400, 950);

const createLight = () => {
    // const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, 1);
    // scene.add(hemisphereLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
    directionalLight.position.set(1000, 1000, 500);
    scene.add(directionalLight);
}

let cylinderMesh
const createSea = () => {
    cylinderMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(600, 600, 800),
        new THREE.MeshStandardMaterial({
            color: Colors.blue,
            metalness: 0,
            roughness: 1,
            transparent:true,
            opacity:.6,
            flatShading: true,
        })
    )
    cylinderMesh.rotation.x = -Math.PI / 2;
    scene.add(cylinderMesh)
}

const createCloud = (rotation) => {

    const cloudGroup = new THREE.Group();
    const cloudHeight = Math.random()*400+800;
    const cloudDepth = -200-Math.random()*200;

    Array.from({length: 5}).forEach((_, index) => {
        const cloudSize = Math.random()*60;
        const cloudMesh = new THREE.Mesh(
            new THREE.BoxGeometry(cloudSize, cloudSize, cloudSize),
            new THREE.MeshStandardMaterial({
                color: 'white',
                metalness: 0,
                roughness: 1,
            })
        )
        cloudMesh.position.set(index*40, cloudHeight, cloudDepth);
        cloudMesh.rotation.set(
            Math.random()*Math.PI*2,
            Math.random()*Math.PI*2,
            Math.random()*Math.PI*2,
        )
        cloudGroup.add(cloudMesh)
    })
    cloudGroup.rotation.z = rotation;
    return cloudGroup;
}

let skyGroup;
const createSky = () => {
    skyGroup = new THREE.Group();
    const rotationArray = [];

    let randomRotation = 0;
    for (let i = 0; i < Math.PI*2-Math.PI/10; i+=randomRotation) {
        randomRotation = Math.PI/10 + Math.random()*Math.PI/12;
        rotationArray.push(i);
    }

    rotationArray.forEach(rotation => {
        skyGroup.add(createCloud(rotation))
    })
    scene.add(skyGroup)
}

let planeGroup;
const createPlane = () => {
    planeGroup = new THREE.Group();

    const coreWidth = 60;
    const coreDepth = 50;
    const preWidth = 20;

    const tailWidth = 15;
    const tailHeight = 20;
    const tailDepth = 5;

    const wingWidth = 40;
    const wingHeight = 8;
    const wingDepth = 150;

    const buttonWidth = 20;
    const buttonHeight = 10;
    const buttonDepth = 10;

    const bladeWidth = 1;
    const bladeHeight = 100;
    const bladeDepth = 20;

    const coreMesh = new THREE.Mesh(
        new THREE.BoxGeometry(coreWidth, coreDepth, coreDepth),
        new THREE.MeshStandardMaterial({
            color: Colors.red,
            metalness: 0,
            roughness: 1,
            flatShading: true,
        })
    )
    planeGroup.add(coreMesh)

    const preMesh = new THREE.Mesh(
        new THREE.BoxGeometry(preWidth, coreDepth, coreDepth),
        new THREE.MeshStandardMaterial({
            color: Colors.white,
            metalness: 0,
            roughness: 1,
            flatShading: true,
        })
    )
    preMesh.position.set(coreWidth/2+preWidth/2, 0, 0)
    planeGroup.add(preMesh)


    const scale = 0.8;
    planeGroup.scale.set(scale, scale, scale);
    planeGroup.position.set(0, 630, -50);
    scene.add(planeGroup)
}

createLight();
createSea();
createSky();
createPlane();

// const axisHelper = new THREE.AxesHelper(1000);
// scene.add(axisHelper);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

camera.position.set(0, 680, 400);
orbitControls.target.set(0, 680, 400);

const loop = () => {
    renderer.render(scene, camera);
    orbitControls.update();

    cylinderMesh.rotation.y -= 0.001;
    skyGroup.rotation.z += 0.001;

    window.requestAnimationFrame(loop);
}
loop()