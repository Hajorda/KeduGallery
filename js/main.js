import { initScene, initRenderer, initCamera } from './scene.js';
import { initControls } from './controls.js';
import { addObjects, animate, addHandImage } from './objects.js';
import { addEventListeners } from './events.js';
import { setupPlayButton, hideMenu, showMenu, startExperience } from './menu.js';
import { setupAudio, startAudio } from "./music.js";

// Initialize scene, renderer, and camera
const scene = initScene();
const renderer = initRenderer();
const camera = initCamera();

setupAudio(camera);
// Initialize controls
const controls = initControls(camera, renderer.domElement);

// Add objects to the scene
const { cube, sphere, sphereMaterial, auroraShaderMaterial } = addObjects(scene);

// Add the hand image to the scene
addHandImage(scene);

// Add event listeners
addEventListeners(camera, renderer, controls);

// Start animation loop
animate(renderer, scene, camera, controls, cube, sphere, sphereMaterial, auroraShaderMaterial);

// Setup play button
setupPlayButton(controls); // Pass controls to setupPlayButton