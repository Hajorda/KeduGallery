import * as THREE from 'three';

export function initScene() {
    const scene = new THREE.Scene();
    return scene;
}

export function initRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x87ceeb); // Set background color to sky blue
    document.body.appendChild(renderer.domElement);
    return renderer;
}

export function initCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    return camera;
}