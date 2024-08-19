import * as THREE from "three";
import {Colors} from "../utils/constants";


const createLand = () => {
    const cylinderMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(600, 600, 800),
        new THREE.MeshPhongMaterial({
            color: Colors.lightgreen,
        })
    )
    cylinderMesh.rotation.x = -Math.PI / 2;
    cylinderMesh.receiveShadow = true;
    return cylinderMesh;
}

export default createLand;