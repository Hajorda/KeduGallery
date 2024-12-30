import { initScene, initRenderer, initCamera } from './scene.js';
import { initControls } from './controls.js';
import { addObjects, animate } from './objects.js';
import { addEventListeners } from './events.js';
import { setupPlayButton, hideMenu, showMenu, startExperience } from './menu.js';
import { setupAudio, startAudio } from "./music.js";
import * as THREE from 'three';

// Initialize scene, renderer, and camera
const scene = initScene();
const renderer = initRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: softer shadows
const camera = initCamera();

// Setup audio
setupAudio(camera);

// Initialize controls
const controls = initControls(camera, renderer.domElement);

// Add objects to the scene - now including sphere2 and its material
const { cube, sphere, sphere2, sphereMaterial, sphereMaterial2 } = addObjects(scene);

// Add event listeners
addEventListeners(camera, renderer, controls);

// Start animation loop - now passing sphere2 and its material
animate(
    renderer,
    scene,
    camera,
    controls,
    cube,
    sphere,
    sphere2,
    sphereMaterial,
    sphereMaterial2
);

// Setup play button
setupPlayButton(controls); // Pass controls to setupPlayButton