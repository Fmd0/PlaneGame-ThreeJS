import * as THREE from "three";
import {Colors} from "../utils/constants";


const createSea = () => {
    const cylinderMesh = new THREE.Mesh(
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
    cylinderMesh.receiveShadow = true;
    return cylinderMesh;
}

export default createSea;