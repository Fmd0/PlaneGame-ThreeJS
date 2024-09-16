import * as THREE from "three";
import {Colors} from "../utils/constants";


const Plane = () => {
    const planeGroup = new THREE.Group();

    const coreWidth = 60;
    const coreDepth = 50;
    const preWidth = 20;

    const tailWidth = 15;
    const tailHeight = 20;
    const tailDepth = 5;

    const wingWidth = 40;
    const wingHeight = 4;
    const wingDepth = 150;

    const buttonWidth = 8;
    const buttonHeight = 10;
    const buttonDepth = 10;

    const bladeWidth = 3;
    const bladeHeight = 100;
    const bladeDepth = 18;

    const redMaterial = new THREE.MeshPhongMaterial({
        color: Colors.red,
        flatShading: true,
    })
    const whiteMaterial = new THREE.MeshPhongMaterial({
        color: Colors.white,
        flatShading: true,
    })
    const brownMaterial = new THREE.MeshPhongMaterial({
        color: Colors.brown,
        flatShading: true,
    })

    const coreGeometry = new THREE.BoxGeometry(coreWidth, coreDepth, coreDepth);
    const coreGeometryAttributesPosition = coreGeometry.attributes.position;

    [4, 8, 21].forEach(index => {
        coreGeometryAttributesPosition.setY(index, coreGeometryAttributesPosition.getY(index)-10);
        coreGeometryAttributesPosition.setZ(index, coreGeometryAttributesPosition.getZ(index)+15);
    });

    [5, 10, 16].forEach(index => {
        coreGeometryAttributesPosition.setY(index, coreGeometryAttributesPosition.getY(index)-10);
        coreGeometryAttributesPosition.setZ(index, coreGeometryAttributesPosition.getZ(index)-15);
    });

    [6, 14, 23].forEach(index => {
        coreGeometryAttributesPosition.setY(index, coreGeometryAttributesPosition.getY(index)+25);
        coreGeometryAttributesPosition.setZ(index, coreGeometryAttributesPosition.getZ(index)+15);
    });

    [7, 12, 18].forEach(index => {
        coreGeometryAttributesPosition.setY(index, coreGeometryAttributesPosition.getY(index)+25);
        coreGeometryAttributesPosition.setZ(index, coreGeometryAttributesPosition.getZ(index)-15);
    });


    const coreMesh = new THREE.Mesh(
        coreGeometry,
        redMaterial
    )
    coreMesh.castShadow = true;
    coreMesh.receiveShadow = true;
    planeGroup.add(coreMesh);

    const preMesh = new THREE.Mesh(
        new THREE.BoxGeometry(preWidth, coreDepth, coreDepth),
        whiteMaterial
    )
    preMesh.position.set(coreWidth/2+preWidth/2, 0, 0);
    preMesh.castShadow = true;
    preMesh.receiveShadow = true;
    planeGroup.add(preMesh)


    const tailMesh = new THREE.Mesh(
        new THREE.BoxGeometry(tailWidth, tailHeight, tailDepth),
        redMaterial
    )
    tailMesh.position.set(-coreWidth/2-tailWidth/4, coreDepth/2-tailHeight/3, 0);
    tailMesh.castShadow = true;
    tailMesh.receiveShadow = true;
    planeGroup.add(tailMesh)

    const wingMeshOne = new THREE.Mesh(
        new THREE.BoxGeometry(wingWidth, wingHeight, wingDepth),
        redMaterial
    );
    wingMeshOne.position.set(coreWidth/2-wingWidth/4, 12, 0);
    wingMeshOne.castShadow = true;
    wingMeshOne.receiveShadow = true;
    planeGroup.add(wingMeshOne);

    const wingMeshTwo = new THREE.Mesh(
        new THREE.BoxGeometry(wingWidth, wingHeight, wingDepth),
        redMaterial
    )
    wingMeshTwo.position.set(coreWidth/2-wingWidth/4, -3, 0);

    wingMeshTwo.castShadow = true;
    wingMeshTwo.receiveShadow = true;
    planeGroup.add(wingMeshTwo);

    const buttonMesh = new THREE.Mesh(
        new THREE.BoxGeometry(buttonWidth, buttonHeight, buttonDepth),
        brownMaterial
    )
    buttonMesh.position.set(coreWidth/2+preWidth+buttonWidth/2, 0, 0);
    buttonMesh.castShadow = true;
    buttonMesh.receiveShadow = true;
    planeGroup.add(buttonMesh)

    const bladeOne = new THREE.Mesh(
        new THREE.BoxGeometry(bladeWidth, bladeHeight, bladeDepth),
        brownMaterial
    )
    const bladeTwo = new THREE.Mesh(
        new THREE.BoxGeometry(bladeWidth, bladeHeight, bladeDepth),
        brownMaterial
    )
    bladeTwo.rotation.x = -Math.PI * 0.5;
    const bladeGroup = new THREE.Group();
    bladeGroup.add(bladeOne);
    bladeGroup.add(bladeTwo);
    bladeGroup.position.set(coreWidth/2+preWidth+buttonWidth+bladeWidth/2, 0, 0);
    bladeGroup.castShadow = true;
    bladeGroup.receiveShadow = true;
    planeGroup.add(bladeGroup)

    const scale = 0.6;
    planeGroup.scale.set(scale, scale, scale);
    planeGroup.position.set(-20, 670, 0);

    return {
        planeGroup,
        bladeGroup
    }
}

export default Plane;