import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export function initControls(camera, domElement) {
    const controls = new PointerLockControls(camera, domElement);
    controls.moveState = { forward: false, backward: false, left: false, right: false }; // Ensure moveState is defined

    // Add event listener to lock the pointer when the canvas is clicked
    domElement.addEventListener('click', () => {
        controls.lock();
    });

    return controls;
}