import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createBlock } from "./builder";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { vertexShader, fragmentShader } from '../shaders/sphereShader.js'; // Import shaders
import {vertexShader1, fragmentShader1} from '../shaders/shader.js'

export function addObjects(scene) {
  // Create a cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red color
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(-10, 3, -5); // Position the cube at the origin
  scene.add(cube);

  // Create a sphere with custom shaders
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sphereMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader1,
    fragmentShader: fragmentShader1,
    uniforms: {
      time: { value: 0.0 },
    },
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(0, 40, 0); // Position the sphere to the right of the cube
  sphere.scale.set(2, 2, 2); // Scale the sphere to be larger
  scene.add(sphere);

  // Create another sphere with shaders from shaders.js
  const sphereGeometry2 = new THREE.SphereGeometry(1, 32, 32);
  const sphereMaterial2 = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      time: { value: 0.0 },
    },
  });
  const sphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
  sphere2.position.set(-10, 10, 10); // Position the sphere to the right of the cube
  sphere2.scale.set(2, 2, 2); // Scale the sphere to be larger
  scene.add(sphere2);

  // Load the grass texture
  const textureLoader = new THREE.TextureLoader();
  const grassTexture = textureLoader.load("textures/grass.jpg");
  grassTexture.wrapS = THREE.RepeatWrapping;
  grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(10, 10);

  // Create the floor using blocks
  const blockSize = 3;
  const floorSize = 50; // 50x50 blocks
  const texturePath = "./textures/grass.jpg";

  for (let x = -floorSize / 2; x < floorSize / 2; x++) {
    for (let z = -floorSize / 2; z < floorSize / 2; z++) {
      const block = createBlock(blockSize, blockSize, blockSize, texturePath, {
        x: x * blockSize,
        y: -blockSize / 2,
        z: z * blockSize,
      });
      block.receiveShadow = true; // Ensure the floor receives shadows  
      scene.add(block);
    }
  }

  // Wall texture
  const wallTexturePath = "./textures/wood_plank.jpeg";

  // Create walls using blocks
  const wallHeight = 10; // 10 blocks high
  const wallWidth = 20; // 20 blocks wide

  // Front wall
  for (let x = -wallWidth / 2; x < wallWidth / 2; x++) {
    for (let y = 0; y < wallHeight; y++) {
      const block = createBlock(
        blockSize,
        blockSize,
        blockSize,
        wallTexturePath,
        { x: x * blockSize, y: y * blockSize, z: -31 }
      );
      scene.add(block);
    }
  }

  // Back wall
  for (let x = -wallWidth / 2; x < wallWidth / 2; x++) {
    for (let y = 0; y < wallHeight; y++) {
      const block = createBlock(
        blockSize,
        blockSize,
        blockSize,
        wallTexturePath,
        { x: x * blockSize, y: y * blockSize, z: 28 }
      );
      scene.add(block);
    }
  }

  // Left wall
  for (let z = -wallWidth / 2; z < wallWidth / 2; z++) {
    for (let y = 0; y < wallHeight; y++) {
      const block = createBlock(
        blockSize,
        blockSize,
        blockSize,
        wallTexturePath,
        { x: -31, y: y * blockSize, z: z * blockSize }
      );
      scene.add(block);
    }
  }

  // Right wall
  for (let z = -wallWidth / 2; z < wallWidth / 2; z++) {
    for (let y = 0; y < wallHeight; y++) {
      const block = createBlock(
        blockSize,
        blockSize,
        blockSize,
        wallTexturePath,
        { x: 30, y: y * blockSize, z: z * blockSize }
      );
      scene.add(block);
    }
  }

// Add a directional light to simulate sunlight
const sunlight = new THREE.DirectionalLight(0xffffff, 1);
sunlight.position.set(5, 10, 7.5);
sunlight.castShadow = true; // Enable shadows
scene.add(sunlight);

// Add ambient light to illuminate the scene
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Add spotlights to the walls
const spotLight1 = new THREE.SpotLight(0xfffff);
spotLight1.position.set(0, 5, -3);
spotLight1.target.position.set(0, 3, -8);
spotLight1.angle = Math.PI / 6;
spotLight1.penumbra = 0.5;
spotLight1.castShadow = true;
scene.add(spotLight1);
scene.add(spotLight1.target);

const spotLight = new THREE.SpotLight(0xff0000); // Red color
spotLight.position.set(0, 10, 0); // Position the spotlight above the center
spotLight.target.position.set(0, 0, 0); // Target the center of the scene
spotLight.angle = Math.PI / 4; // Wider angle for more coverage
spotLight.penumbra = 0.5;
spotLight.intensity = 5; // Increase intensity
spotLight.castShadow = true;
scene.add(spotLight);
scene.add(spotLight.target);

const spotLight2 = new THREE.SpotLight(0xffffff);
spotLight2.position.set(0, 5, 3);
spotLight2.target.position.set(0, 3, 8);
spotLight2.angle = Math.PI / 6;
spotLight2.penumbra = 0.5;
spotLight2.castShadow = true;
scene.add(spotLight2);
scene.add(spotLight2.target);

const spotLight3 = new THREE.SpotLight(0xffffff);
spotLight3.position.set(-3, 5, 0);
spotLight3.target.position.set(-8, 3, 0);
spotLight3.angle = Math.PI / 6;
spotLight3.penumbra = 0.5;
spotLight3.castShadow = true;
scene.add(spotLight3);
scene.add(spotLight3.target);

const spotLight4 = new THREE.SpotLight(0xffffff);
spotLight4.position.set(3, 5, 0);
spotLight4.target.position.set(8, 3, 0);
spotLight4.angle = Math.PI / 6;
spotLight4.penumbra = 0.5;
spotLight4.castShadow = true;
scene.add(spotLight4);
scene.add(spotLight4.target);

// Add a spotlight helper to visualize the spotlight
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
scene.add(spotLightHelper1);
const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
scene.add(spotLightHelper2);
const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3);
scene.add(spotLightHelper3);
const spotLightHelper4 = new THREE.SpotLightHelper(spotLight4);
scene.add(spotLightHelper4);

// // Ensure the renderer has shadows enabled
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: softer shadows



  // Load the 3D model
  const loader = new GLTFLoader();
  loader.load(
    "assets/cat.glb",
    (gltf) => {
      const model = gltf.scene;
      model.position.set(10, 0, 0); // Adjust the position as needed
      scene.add(model);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  // Load the painting texture
  const paintingTexture = textureLoader.load("img/catLogo.png");

  // Create paintings
  const paintingMaterial = new THREE.MeshStandardMaterial({
    map: paintingTexture,
  });

  // Front wall painting
  const frontPaintingGeometry = new THREE.PlaneGeometry(5, 5);
  const frontPainting = new THREE.Mesh(frontPaintingGeometry, paintingMaterial);
  frontPainting.position.set(0, 5, -29.9); // Slightly in front of the wall
  scene.add(frontPainting);

  // Back wall painting
  const backPaintingGeometry = new THREE.PlaneGeometry(5, 5);
  const backPainting = new THREE.Mesh(backPaintingGeometry, paintingMaterial);
  backPainting.position.set(0, 5, 9.9); // Slightly in front of the wall
  backPainting.rotation.y = Math.PI;
  scene.add(backPainting);

  // Left wall painting
  const leftPaintingGeometry = new THREE.PlaneGeometry(5, 5);
  const leftPainting = new THREE.Mesh(leftPaintingGeometry, paintingMaterial);
  leftPainting.position.set(-9.9, 5, 0); // Slightly in front of the wall
  leftPainting.rotation.y = Math.PI / 2;
  scene.add(leftPainting);

  // Right wall painting
  const rightPaintingGeometry = new THREE.PlaneGeometry(5, 5);
  const rightPainting = new THREE.Mesh(rightPaintingGeometry, paintingMaterial);
  rightPainting.position.set(9.9, 5, 0); // Slightly in front of the wall
  rightPainting.rotation.y = -Math.PI / 2;
  scene.add(rightPainting);

  const signLoader = new GLTFLoader();
  const gltfPath = "assets/minecraft_sign.glb";

  const signX = 0;
  const signY = 0;
  const signZ = 0;

  signLoader.load(
    gltfPath,
    function (gltf) {
      const sign = gltf.scene;
      sign.position.set(signX,signY,signZ); // Adjust the position as needed
      sign.scale.set(8, 8, 8); // Adjust the scale as needed
      scene.add(sign);
  
      // Load font and create text
      const fontLoader = new FontLoader();
      fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textGeometry = new TextGeometry('Hello World', {
          font: font,
          size: 0.03,
          height: 0.03,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(signX+0.13, signY+0.5, signZ +0.25 ); // Adjust the position as needed
        sign.add(textMesh);
      }, undefined, function (error) {
        console.error("An error happened while loading the font", error);
      });
  
      animate();
    },
    undefined,
    function (error) {
      console.error("An error happened while loading the sign", error);
    }
  );

  const villagerLoader = new GLTFLoader();
  villagerLoader.load(
    "assets/villager_plains_1.glb",
    (gltf) => {
      const villager = gltf.scene;
      villager.position.set(-10, 4, -10); // Adjust the position as needed
      villager.scale.set(0.01, 0.01, 0.01); // Adjust the scale as needed
      scene.add(villager);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  const catLoader = new GLTFLoader();
  catLoader.load(
    "assets/minecraft_cat.glb",
    (gltf) => {
      const cat = gltf.scene;
      cat.position.set(5, 3, 10); // Adjust the position as needed
      cat.scale.set(6, 6, 6); // Adjust the scale as needed
      scene.add(cat);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  //assets/minecraft_chest.glb
  const chestLoader = new GLTFLoader();
  chestLoader.load(
    "assets/minecraft_chest.glb",
    (gltf) => {
      const chest = gltf.scene;
      chest.position.set(-10, 1.4, 10); // Adjust the position as needed
      chest.scale.set(0.015, 0.015, 0.015); // Adjust the scale as needed
      scene.add(chest);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  //assets/minecraft_tree.glb
  const treeLoader = new GLTFLoader();
  treeLoader.load(
    "assets/minecraft_tree.glb",
    (gltf) => {
      const tree = gltf.scene;
      tree.position.set(10, 2, 10); // Adjust the position as needed
      tree.scale.set(10, 10, 10); // Adjust the scale as needed
      scene.add(tree);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  // Add Aurora Borealis shader
  const auroraShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      iTime: { value: 0 },
      iChannel0: {
        value: textureLoader.load("https://i.imgur.com/cUHldcm.png"),
      },
      iChannel1: {
        value: textureLoader.load("https://i.imgur.com/JNF8Bqf.jpg"),
      },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    wireframe: false,
  });

  return { cube, sphere, sphereMaterial, auroraShaderMaterial };
}

export function animate(
  renderer,
  scene,
  camera,
  controls,
  cube,
  sphere,
  sphereMaterial,
  auroraShaderMaterial
) {
  requestAnimationFrame(() =>
    animate(
      renderer,
      scene,
      camera,
      controls,
      cube,
      sphere,
      sphereMaterial,
      auroraShaderMaterial
    )
  );

  // Update camera position based on movement state
  const moveSpeed = 0.2;
  if (controls && controls.moveState) {
    if (controls.moveState.forward) controls.moveForward(moveSpeed);
    if (controls.moveState.backward) controls.moveForward(-moveSpeed);
    if (controls.moveState.left) controls.moveRight(-moveSpeed);
    if (controls.moveState.right) controls.moveRight(moveSpeed);
  }

  // Update shader uniforms
  if (sphereMaterial && sphereMaterial.uniforms) {
    sphereMaterial.uniforms.time.value += 0.05;
  }
  if (auroraShaderMaterial && auroraShaderMaterial.uniforms) {
    auroraShaderMaterial.uniforms.iTime.value += 0.01;
  }

  // Rotate the cube
  if (cube) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  // Animate the sphere (move up and down)
  if (sphere) {
    sphere.position.y = 1 + Math.sin(Date.now() * 0.001) * 2;
  }

  // Ensure controls is defined before calling update
  if (controls) {
    controls.update();
  }

  // Ensure renderer is defined before calling render
  if (renderer) {
    renderer.render(scene, camera);
  }
}