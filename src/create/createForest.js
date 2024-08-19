import * as THREE from 'three';
import {Colors} from "../utils/constants";

const treeLeaveMaterial = new THREE.MeshPhongMaterial({
    color: Colors.green,
    // metalness: 0,
    // roughness: 1,
    flatShading: true
})

const treeTrunkMaterial = new THREE.MeshPhongMaterial({
    color: Colors.brown,
    // metalness: 0,
    // roughness: 1,
    flatShading: true
})

const treeLeaveGeometry = new THREE.CylinderGeometry(1, 12*3, 12*3, 4);

const treeTrunkGeometry = new THREE.BoxGeometry(10, 20, 10);

const createTree = () => {
    const treeGroup = new THREE.Group();

    const stickMesh = new THREE.Mesh(
        treeTrunkGeometry,
        treeTrunkMaterial
    )
    stickMesh.castShadow = true;
    stickMesh.receiveShadow = true;
    treeGroup.add(stickMesh);

    const treeLeaveMeshOne = new THREE.Mesh(
        treeLeaveGeometry,
        treeLeaveMaterial
    )
    treeLeaveMeshOne.castShadow = true;
    treeLeaveMeshOne.receiveShadow = true;
    treeLeaveMeshOne.position.y = 20;
    treeGroup.add(treeLeaveMeshOne);

    const treeLeaveMeshTwo = new THREE.Mesh(
        treeLeaveGeometry,
        treeLeaveMaterial
    )
    treeLeaveMeshTwo.castShadow = true;
    treeLeaveMeshTwo.receiveShadow = true;
    treeLeaveMeshTwo.position.y = 40;
    treeLeaveMeshTwo.scale.set(0.75, 0.75, 0.75);
    treeGroup.add(treeLeaveMeshTwo);

    const treeLeaveMeshThree = new THREE.Mesh(
        treeLeaveGeometry,
        treeLeaveMaterial
    )
    treeLeaveMeshThree.castShadow = true;
    treeLeaveMeshThree.receiveShadow = true;
    treeLeaveMeshThree.position.y = 55;
    treeLeaveMeshThree.scale.set(0.5, 0.5, 0.5);
    treeGroup.add(treeLeaveMeshThree);

    return treeGroup;
}

export {
    createTree,
}