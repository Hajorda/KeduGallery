import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createBlock } from "./builder";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { vertexShader, fragmentShader } from "../shaders/sphereShader.js";
import { vertexShader1, fragmentShader1 } from "../shaders/shader.js";

export function addObjects(scene) {
  const textureLoader = new THREE.TextureLoader();

  // Create wooden boxes
  const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
  const woodTexture = textureLoader.load("textures/wood_plank.jpeg");
  const woodMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });

  // Create boxes at positions
  const boxPositions = [-40, -30, -20, -10, 0, 10, 20, 30].map((x) => ({
    x: x,
    y: 1.5,
    z: -25,
  }));

  const boxes = boxPositions.map((pos) => {
    const box = new THREE.Mesh(boxGeometry, woodMaterial);
    box.position.set(pos.x, pos.y, pos.z);
    box.castShadow = true;
    box.receiveShadow = true;
    scene.add(box);
    return box;
  });

  // Create cubes with specific textures
  const geometry = new THREE.BoxGeometry(3, 3, 3);
  const topTexture = textureLoader.load("textures/grassblock_top.png");
  const sideTexture = textureLoader.load("textures/grassblock_side.png");
  const bottomTexture = textureLoader.load("textures/grassblock_bottom.png");

  const materials = [
    new THREE.MeshStandardMaterial({ map: sideTexture }), // right
    new THREE.MeshStandardMaterial({ map: sideTexture }), // left
    new THREE.MeshStandardMaterial({ map: topTexture }), // top
    new THREE.MeshStandardMaterial({ map: bottomTexture }), // bottom
    new THREE.MeshStandardMaterial({ map: sideTexture }), // front
    new THREE.MeshStandardMaterial({ map: sideTexture }), // back
  ];

  const cube = new THREE.Mesh(geometry, materials);
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.position.set(-20, 5, -25);
  scene.add(cube);

  // Create sphere with custom shaders (using vertexShader1 and fragmentShader1)
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const jellyTexture = new THREE.TextureLoader().load("assets/textures/jelly.json");
  const sphereMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader1,
    fragmentShader: fragmentShader1,
    uniforms: {
      time: { value: 0.0 },
      texture: { value: jellyTexture },
    },
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(-10, 5, -25);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  scene.add(sphere);

  // Create a second sphere with another shader (using vertexShader and fragmentShader)
  const sphereGeometry2 = new THREE.SphereGeometry(1, 32, 32);
  const sphereMaterial2 = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      time: { value: 0.0 },
    },
  });
  const sphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
  sphere2.position.set(-30, 5, -25); // Position the second sphere
  sphere2.castShadow = true;
  sphere2.receiveShadow = true;
  scene.add(sphere2);

  // Load models
  const loader = new GLTFLoader();
  loader.load("assets/minecraft_cat.glb", (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 3, -25);
    model.scale.set(3, 3, 3);
    model.rotateY(Math.PI);
    model.castShadow = true;
    model.receiveShadow = true;
    scene.add(model);
  });

  const villagerLoader = new GLTFLoader();
  villagerLoader.load("assets/villager_plains_1.glb", (gltf) => {
    const villager = gltf.scene;
    villager.position.set(11, 7, -25);
    villager.scale.set(0.01, 0.01, 0.01);
    villager.castShadow = true;
    villager.receiveShadow = true;
    scene.add(villager);
  });

  const chestLoader = new GLTFLoader();
  chestLoader.load("assets/minecraft_chest.glb", (gltf) => {
    const chest = gltf.scene;
    chest.position.set(20, 5, -25);
    chest.scale.set(0.015, 0.015, 0.015);
    chest.rotateY(-Math.PI/2);
    chest.castShadow = true;
    chest.receiveShadow = true;
    scene.add(chest);
  });

  const treeLoader = new GLTFLoader();
  treeLoader.load("assets/minecraft_tree.glb", (gltf) => {
    const tree = gltf.scene;
    tree.position.set(30, -1, -27);
    tree.scale.set(10, 10, 10);
    tree.castShadow = true;
    tree.receiveShadow = true;
    scene.add(tree);
  });
//add zombie
const zombieLoader = new GLTFLoader();
zombieLoader.load("assets/minecraft_zombie.glb", (gltf) => {
  const zombie = gltf.scene;
  zombie.position.set(-40, 3, -25);  // Make sure this position is visible in your scene
  zombie.scale.set(2, 2, 2);
  zombie.rotateY(Math.PI)       // Adjust scale if needed
  zombie.castShadow = true;
  zombie.receiveShadow = true;

  // Directly add the zombie model to the scene
  scene.add(zombie);
});

  // Add signs
  const signLoader = new GLTFLoader();
  boxPositions.forEach((pos, index) => {
    signLoader.load("assets/minecraft_sign.glb", (gltf) => {
      const sign = gltf.scene;
      sign.position.set(pos.x + 2, pos.y - 1, pos.z + 5);
      sign.scale.set(6, 6, 6);
      sign.rotation.y = Math.PI;
      sign.castShadow = true;
      sign.receiveShadow = true;
      scene.add(sign);

      const fontLoader = new FontLoader();
      fontLoader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
        const labels = ["Cube", "Sphere", "Cat", "Villager", "Chest"];
        const textGeometry = new TextGeometry(labels[index], {
          font: font,
          size: 0.03,
          height: 0.01,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(0, 0.5, 0.25);
        sign.add(textMesh);
      });
    });
  });

  // Add lights
  const sunlight = new THREE.DirectionalLight(0xffffff, 1);
  sunlight.position.set(5, 10, 7.5);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.width = 2048;
  scene.add(sunlight);

  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  // Add floor
  const blockSize = 3;
  const floorSize = 50;
  const texturePath = "./textures/grass.jpg";

  for (let x = -floorSize / 2; x < floorSize / 2; x++) {
    for (let z = -floorSize / 2; z < floorSize / 2; z++) {
      const block = createBlock(blockSize, blockSize, blockSize, texturePath, {
        x: x * blockSize,
        y: -blockSize / 2,
        z: z * blockSize,
      });
      block.receiveShadow = true;
      scene.add(block);
    }
  }

  // Return objects for animation
  return { cube, sphere, sphere2, sphereMaterial, sphereMaterial2 };
}

export function animate(renderer, scene, camera, controls, cube, sphere, sphere2, sphereMaterial, sphereMaterial2) {
  requestAnimationFrame(() => animate(renderer, scene, camera, controls, cube, sphere, sphere2, sphereMaterial, sphereMaterial2));

  if (controls && controls.moveState) {
    const moveSpeed = 0.2;
    if (controls.moveState.forward) controls.moveForward(moveSpeed);
    if (controls.moveState.backward) controls.moveForward(-moveSpeed);
    if (controls.moveState.left) controls.moveRight(-moveSpeed);
    if (controls.moveState.right) controls.moveRight(moveSpeed);
  }

  if (sphereMaterial && sphereMaterial.uniforms) {
    sphereMaterial.uniforms.time.value += 0.05;
  }

  if (sphereMaterial2 && sphereMaterial2.uniforms) {
    sphereMaterial2.uniforms.time.value += 0.05;
  }

  if (cube) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  if (controls) {
    controls.update();
  }

  renderer.render(scene, camera);
}
