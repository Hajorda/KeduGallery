// skybox.js
import * as THREE from 'three';

export function createSkybox() {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('./textures/skybox.png');

    const uvMapping = [
      { // Right
          u: [2 / 3, 1],
          v: [1 / 3, 2 / 3]
      },
      { // Left
          u: [0, 1 / 3],
          v: [1 / 3, 2 / 3]
      },
      { // Bottom
        u: [1 / 4, 2 / 4],
        v: [3 / 4, 1]
    },
      { // Top
        u: [1 / 4, 2 / 4],
        v: [0, 1 / 4]
    },
      { // Front
          u: [1 / 3, 2 / 3],
          v: [1 / 3, 2 / 3]
      },
      { // Back
          u: [2 / 3, 1],
          v: [1 / 3, 2 / 3]
      }
  ];
  
  

    const materials = [];
    
    uvMapping.forEach(({u, v}) => {
        const material = new THREE.MeshBasicMaterial({
            map: texture.clone(),
            side: THREE.BackSide
        });
        
        material.map.offset.set(u[0], v[0]);
        material.map.repeat.set(u[1] - u[0], v[1] - v[0]);
        material.map.wrapS = material.map.wrapT = THREE.ClampToEdgeWrapping;
        materials.push(material);
    });

    const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
    const skybox = new THREE.Mesh(skyboxGeometry, materials);
    
    return skybox;
}