import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function addObjects(scene) {
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

    // Load the skybox
    const skyboxLoader = new GLTFLoader();
    skyboxLoader.load('assets/uploads_files_4381587_DreamlikeLandscape.glb', (gltf) => {
        const skybox = gltf.scene;
        skybox.scale.set(1000, 1000, 1000); // Scale the skybox to be large enough to surround the scene
        scene.add(skybox);
    }, undefined, (error) => {
        console.error(error);
    });

    // Load the grass texture
    const textureLoader = new THREE.TextureLoader();
    const grassTexture = textureLoader.load('textures/grass.jpg');
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
}