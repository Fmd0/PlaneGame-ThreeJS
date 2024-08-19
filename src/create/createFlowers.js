import * as THREE from 'three';
import {Colors} from "../utils/constants";


const redPetalMaterial = new THREE.MeshPhongMaterial({
    color: Colors.red,
    // metalness: 0,
    // roughness: 1,
    flatShading: true,
})

const yellowPetalMaterial = new THREE.MeshPhongMaterial({
    color: Colors.yellow,
    // metalness: 0,
    // roughness: 1,
    flatShading: true,
})

const bluePetalMaterial = new THREE.MeshPhongMaterial({
    color: Colors.blue,
    // metalness: 0,
    // roughness: 1,
    flatShading: true,
})

const flowerStemMaterial = new THREE.MeshPhongMaterial({
    color: Colors.green,
    // metalness: 0,
    // roughness: 1,
    flatShading: true,
})

const flowerCoreMaterial = new THREE.MeshPhongMaterial({
    color: Colors.yellow,
    // metalness: 0,
    // roughness: 1,
    flatShading: true,
})

const petalMaterials = [redPetalMaterial, yellowPetalMaterial, bluePetalMaterial];

const coreWidth = 10;
const coreHeight = 10;
const coreDepth = 10;

const stemWidth = 5;
const stemHeight = 50;
const stemDepth = 5;

const petalWidth = 15;
const petalHeight = 20;
const petalDepth = 5;

const flowerCoreGeometry = new THREE.BoxGeometry(coreWidth, coreHeight, coreDepth);
const flowerStemGeometry = new THREE.BoxGeometry(stemWidth, stemHeight, stemDepth);

const petalGeometry = new THREE.BoxGeometry(petalWidth, petalHeight, petalDepth);
const petalGeometryAttributesPosition = petalGeometry.attributes.position;


[0, 11, 17].forEach(index => {
    petalGeometryAttributesPosition.setX(index, petalGeometryAttributesPosition.getX(index)+4);
});

[1, 9, 20].forEach(index => {
    petalGeometryAttributesPosition.setX(index, petalGeometryAttributesPosition.getX(index)+4);
});

[5, 10, 16].forEach(index => {
    petalGeometryAttributesPosition.setX(index, petalGeometryAttributesPosition.getX(index)-4);
});

[4, 8, 21].forEach(index => {
    petalGeometryAttributesPosition.setX(index, petalGeometryAttributesPosition.getX(index)-4);
});



const createFlower = () => {
    const flowerGroup = new THREE.Group();

    const flowerStemMesh = new THREE.Mesh(
        flowerStemGeometry,
        flowerStemMaterial
    )
    flowerStemMesh.castShadow = true;
    flowerStemMesh.receiveShadow = true;
    flowerGroup.add(flowerStemMesh);

    const flowerCoreMesh = new THREE.Mesh(
        flowerCoreGeometry,
        flowerCoreMaterial
    )
    flowerCoreMesh.castShadow = true;
    flowerCoreMesh.receiveShadow = true;
    flowerCoreMesh.position.set(0, stemHeight/2-coreHeight/2, 0);
    flowerGroup.add(flowerCoreMesh);

    const petalMaterial = petalMaterials[Math.floor(Math.random(petalMaterials.length))];
    const petalGroup = new THREE.Group();
    Array.from({length: 4}).forEach(index => {
        const petalMesh = new THREE.Mesh(
            petalGeometry,
            petalMaterial
        );
        petalMesh.castShadow = true;
        petalMesh.receiveShadow = true;
        // petalMesh.position.set(0, coreHeight/2+petalHeight/2, 0);
        petalMesh.rotation.z = Math.PI/2*index;
        petalGroup.add(petalMesh)
    })
    flowerGroup.add(petalGroup);

    return flowerGroup;
}

export {
    createFlower
}