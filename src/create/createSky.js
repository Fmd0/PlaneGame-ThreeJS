import * as THREE from "three";


const createCloud = (rotation) => {

    const cloudGroup = new THREE.Group();
    const cloudHeight = Math.random()*400+800;
    const cloudDepth = -250-Math.random()*200;

    Array.from({length: 5}).forEach((_, index) => {
        const cloudSize = Math.random()*60;
        const cloudMesh = new THREE.Mesh(
            new THREE.BoxGeometry(cloudSize, cloudSize, cloudSize),
            new THREE.MeshPhongMaterial({
                color: 'white',
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


const createSky = () => {
    const skyGroup = new THREE.Group();
    const rotationArray = [];

    let randomRotation = 0;
    for (let i = 0; i < Math.PI*2-Math.PI/10; i+=randomRotation) {
        randomRotation = Math.PI/10 + Math.random()*Math.PI/12;
        rotationArray.push(i);
    }

    rotationArray.forEach(rotation => {
        skyGroup.add(createCloud(rotation))
    })

    return skyGroup;
}

export default createSky;