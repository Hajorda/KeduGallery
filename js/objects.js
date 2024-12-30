import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createBlock } from "./builder";
import { add } from "three/src/nodes/TSL.js";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';


// Define the vertex and fragment shaders
const vertexShader = `
    varying vec2 vUv;
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vUv = uv;
    }
`;

const fragmentShader = `
    uniform float iTime;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    varying vec2 vUv;
    #define TAU 6.283185307179586476925286766559
    void main() {
        vec2 uv = vUv;
        float o = texture2D(iChannel1, uv * 0.25 + vec2(0.0, iTime * 0.025)).r;
        float d = (texture2D(iChannel0, uv * 0.25 - vec2(0.0, iTime * 0.02 + o * 0.02)).r * 2.0 - 1.0);
        float v = uv.y + d * 0.1;
        v = 1.0 - abs(v * 2.0 - 1.0);
        v = pow(v, 2.0 + sin((iTime * 0.2 + d * 0.25) * TAU) * 0.5);
        vec3 color = vec3(0.0);
        float x = (1.0 - uv.x * 0.75);
        float y = 1.0 - abs(uv.y * 2.0 - 1.0);
        color += vec3(x * 0.5, y, x) * v;
        vec2 seed = uv;
        vec2 r;
        r.x = fract(sin((seed.x * 12.9898) + (seed.y * 78.2330)) * 43758.5453);
        r.y = fract(sin((seed.x * 53.7842) + (seed.y * 47.5134)) * 43758.5453);
        float s = mix(r.x, (sin((iTime * 2.5 + 60.0) * r.y) * 0.5 + 0.5) * ((r.y * r.y) * (r.y * r.y)), 0.04); 
        color += pow(s, 70.0) * (1.0 - v);
        gl_FragColor.rgb = color;
        gl_FragColor.a = 1.0;
    }
`;

export function addObjects(scene) {
  // Create a cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red color
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Create a sphere with custom shaders
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sphereMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      time: { value: 0.0 },
    },
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(0, 40, 0); // Position the sphere to the right of the cube
  sphere.scale.set(2, 2, 2); // Scale the sphere to be larger
  scene.add(sphere);

  // Load the grass texture
  const textureLoader = new THREE.TextureLoader();
  const grassTexture = textureLoader.load("textures/grass.jpg");
  grassTexture.wrapS = THREE.RepeatWrapping;
  grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(10, 10);

  // Remove the existing floor creation code
  // const floorGeometry = new THREE.PlaneGeometry(500, 500);
  // const floorMaterial = new THREE.MeshStandardMaterial({ map: grassTexture });
  // const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  // floor.rotation.x = -Math.PI / 2; // Rotate the floor to be horizontal
  // floor.position.y = -1; // Position the floor below the cube
  // scene.add(floor);

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

  const planeGeometry = new THREE.PlaneGeometry(200, 100);
  const plane = new THREE.Mesh(planeGeometry, auroraShaderMaterial);
  plane.position.set(0, 50, -50); // Position the plane in the sky
  scene.add(plane);

  return { cube, sphere, sphereMaterial, auroraShaderMaterial };
}
// ...existing code...

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