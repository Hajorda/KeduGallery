import { initScene, initRenderer, initCamera } from './scene.js';
import { initControls } from './controls.js';
import { addObjects } from './objects.js';
import { animate } from './animations.js';
import { addEventListeners } from './events.js';
import { setupPlayButton, hideMenu, showMenu, startExperience } from './menu.js';

// Initialize scene, renderer, and camera
const scene = initScene();
const renderer = initRenderer();
const camera = initCamera();

// Initialize controls
const controls = initControls(camera, renderer.domElement);

// Add objects to the scene
addObjects(scene);

// Add event listeners
addEventListeners(camera, renderer, controls);

// Start animation loop
animate(scene, camera, renderer, controls);

// Setup play button
setupPlayButton(controls); // Pass controls to setupPlayButton