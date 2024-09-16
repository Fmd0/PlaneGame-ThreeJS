import * as THREE from "three";
import {Colors} from "../utils/constants";


function Land() {
    this.mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(600, 600, 800),
        new THREE.MeshPhongMaterial({
            color: Colors.lightgreen,
        })
    )
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
}

export default Land;