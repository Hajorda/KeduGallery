import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupPlayButton, hideMenu, showMenu, startExperience } from './menu.js';

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87ceeb); // Set background color to sky blue
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red color
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Create a sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // Blue color
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(5, 1, 0); // Position the sphere to the right of the cube
scene.add(sphere);

// Set the camera position
camera.position.set(0, 5, 10);

// Initialize PointerLockControls
const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

// Event listener to lock the pointer when the canvas is clicked
document.body.addEventListener('click', () => {
    controls.lock();
});

// Variables to store movement state
const moveSpeed = 0.1;
const moveState = { forward: false, backward: false, left: false, right: false };

// Load the skybox
const skyboxLoader = new GLTFLoader();
skyboxLoader.load('assets/uploads_files_4381587_DreamlikeLandscape.glb', (gltf) => {
    const skybox = gltf.scene;
    skybox.scale.set(1000, 1000, 1000); // Scale the skybox to be large enough to surround the scene
    scene.add(skybox);
}, undefined, (error) => {
    console.error(error);
});

// Event listeners for keydown and keyup
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            moveState.forward = true;
            break;
        case 's':
            moveState.backward = true;
            break;
        case 'a':
            moveState.left = true;
            break;
        case 'd':
            moveState.right = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            moveState.forward = false;
            break;
        case 's':
            moveState.backward = false;
            break;
        case 'a':
            moveState.left = false;
            break;
        case 'd':
            moveState.right = false;
            break;
    }
});

// Load the grass texture
const textureLoader = new THREE.TextureLoader();
const grassTexture = textureLoader.load('textures/grass.jpg', () => {
    renderer.render(scene, camera);
});
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(10, 10);

// Create the floor
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ map: grassTexture });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate the floor to be horizontal
floor.position.y = -1; // Position the floor below the cube
scene.add(floor);

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
loader.load('assets/cat.glb', (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0); // Adjust the position as needed
    scene.add(model);
}, undefined, (error) => {
    console.error(error);
});

// Load the painting texture
const paintingTexture = textureLoader.load('img/catLogo.png');

// Create the walls
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // White walls

// Front wall
const frontWallGeometry = new THREE.PlaneGeometry(20, 10);
const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
frontWall.position.set(0, 5, -10);
scene.add(frontWall);

// Back wall
const backWallGeometry = new THREE.PlaneGeometry(20, 10);
const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
backWall.position.set(0, 5, 10);
backWall.rotation.y = Math.PI;
scene.add(backWall);

// Left wall
const leftWallGeometry = new THREE.PlaneGeometry(20, 10);
const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
leftWall.position.set(-10, 5, 0);
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);

// Right wall
const rightWallGeometry = new THREE.PlaneGeometry(20, 10);
const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
rightWall.position.set(10, 5, 0);
rightWall.rotation.y = -Math.PI / 2;
scene.add(rightWall);

// Create paintings
const paintingMaterial = new THREE.MeshStandardMaterial({ map: paintingTexture });

// Front wall painting
const frontPaintingGeometry = new THREE.PlaneGeometry(5, 5);
const frontPainting = new THREE.Mesh(frontPaintingGeometry, paintingMaterial);
frontPainting.position.set(0, 5, -9.9); // Slightly in front of the wall
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

const animate = function () {
    requestAnimationFrame(animate);

    // Update camera position based on movement state
    if (moveState.forward) controls.moveForward(moveSpeed);
    if (moveState.backward) controls.moveForward(-moveSpeed);
    if (moveState.left) controls.moveRight(-moveSpeed);
    if (moveState.right) controls.moveRight(moveSpeed);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Animate the sphere (move up and down)
    sphere.position.y = 1 + Math.sin(Date.now() * 0.001) * 2;

    controls.update();
    renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add event listener to the toggle button
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-menu');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const menu = document.getElementById('menu');
            if (menu.style.display === 'none') {
                showMenu();
            } else {
                hideMenu();
            }
        });
    }
});