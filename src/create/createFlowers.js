import * as THREE from 'three';
import {Colors} from "../utils/constants";


const redPetalMaterial = new THREE.MeshPhongMaterial({
    color: Colors.red,
    flatShading: true,
})

const yellowPetalMaterial = new THREE.MeshPhongMaterial({
    color: Colors.yellow,
    flatShading: true,
})

const bluePetalMaterial = new THREE.MeshPhongMaterial({
    color: Colors.blue,
    flatShading: true,
})

const flowerStemMaterial = new THREE.MeshPhongMaterial({
    color: Colors.green,
    flatShading: true,
})

const flowerCoreMaterial = new THREE.MeshPhongMaterial({
    color: Colors.yellow,
    flatShading: true,
})

const petalMaterials = [redPetalMaterial, yellowPetalMaterial, bluePetalMaterial];

const coreWidth = 10;
const coreHeight = 10;
const coreDepth = 10;

const stemWidth = 5;
const stemHeight = 50;
const stemDepth = 5;

const petalWidth = 10;
const petalHeight = 14;
const petalDepth = 3;
const petalTranslate = 3;

const flowerCoreGeometry = new THREE.BoxGeometry(coreWidth, coreHeight, coreDepth);
const flowerStemGeometry = new THREE.BoxGeometry(stemWidth, stemHeight, stemDepth);

const petalGeometry = new THREE.BoxGeometry(petalWidth, petalHeight, petalDepth);
const petalGeometryAttributesPosition = petalGeometry.attributes.position;


[0, 11, 17].forEach(index => {
    petalGeometryAttributesPosition.setX(index, petalGeometryAttributesPosition.getX(index)+petalTranslate);
});

[1, 9, 20].forEach(index => {
    petalGeometryAttributesPosition.setX(index, petalGeometryAttributesPosition.getX(index)+petalTranslate);
});

[5, 10, 16].forEach(index => {
    petalGeometryAttributesPosition.setX(index, petalGeometryAttributesPosition.getX(index)-petalTranslate);
});

[4, 8, 21].forEach(index => {
    petalGeometryAttributesPosition.setX(index, petalGeometryAttributesPosition.getX(index)-petalTranslate);
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

    const petalMaterial = petalMaterials[Math.floor(Math.random()*petalMaterials.length)];
    const petalGroup = new THREE.Group();
    Array.from({length: 4}).forEach((_, index) => {
        const petalMesh = new THREE.Mesh(
            petalGeometry,
            petalMaterial
        );
        petalMesh.castShadow = true;
        petalMesh.receiveShadow = true;
        petalMesh.rotation.z = -Math.PI/2*index;
        switch (index) {
            case 0: petalMesh.position.set(0, coreHeight/2+petalHeight/2, 0); break;
            case 1: petalMesh.position.set(coreHeight/2+petalHeight/2, 0, 0); break;
            case 2: petalMesh.position.set(0, -coreHeight/2-petalHeight/2, 0); break;
            case 3: petalMesh.position.set(-coreHeight/2-petalHeight/2, 0, 0); break;
        }
        petalGroup.add(petalMesh)
    })
    petalGroup.position.set(0, stemHeight/2-coreHeight/2, stemDepth);
    flowerGroup.add(petalGroup);

    return flowerGroup;
}

function Flowers() {

    const flowerXAmount = 50;
    const flowerYAmount = 4;
    const dividedAngle = 2*Math.PI / flowerXAmount;
    this.mesh = new THREE.Group();


    for (let i = 0; i < flowerXAmount; i++) {
        for (let j = 0; j < flowerYAmount; j++) {
            const flowerMesh = createFlower();
            const randomAngle = dividedAngle*i + Math.random()*dividedAngle;
            flowerMesh.position.set(
                620*Math.sin(randomAngle),
                620*Math.cos(randomAngle),
                (Math.random()-0.6)*500
            )
            const randomScale = Math.random()*0.2+0.2;
            flowerMesh.scale.set(randomScale, randomScale, randomScale);
            flowerMesh.position.x -= Math.sin(randomAngle)*(1-randomScale)*20*1.2;
            flowerMesh.position.y -= Math.cos(randomAngle)*(1-randomScale)*20*1.2;

            flowerMesh.rotation.z = -randomAngle;
            this.mesh.add(flowerMesh);
        }
    }
}

export default Flowers;