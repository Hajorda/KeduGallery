import * as THREE from 'three';

export function createBlock(width, height, depth, texturePath, position) {
    // Create the geometry for the block
    const geometry = new THREE.BoxGeometry(width, height, depth);

    // Load the texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath);

    // Ensure the texture is applied to all sides
    const materials = [
        new THREE.MeshStandardMaterial({ map: texture }),
        new THREE.MeshStandardMaterial({ map: texture }),
        new THREE.MeshStandardMaterial({ map: texture }),
        new THREE.MeshStandardMaterial({ map: texture }),
        new THREE.MeshStandardMaterial({ map: texture }),
        new THREE.MeshStandardMaterial({ map: texture })
    ];

    // Create the mesh for the block
    const block = new THREE.Mesh(geometry, materials);

    // Set the position of the block
    block.position.set(position.x, position.y, position.z);

    // Return the block mesh
    return block;
}