import * as THREE from 'three';
export function addEventListeners(camera, renderer, controls) {
    // Ensure moveState is defined on controls
    controls.moveState = {
        forward: false,
        backward: false,
        left: false,
        right: false
    };

    // Load walking sound
    const audioLoader = new THREE.AudioLoader();
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const walkingSound = new THREE.Audio(listener);

    audioLoader.load('assets/walking.mp3', function(buffer) {
        walkingSound.setBuffer(buffer);
        walkingSound.setLoop(true);
        walkingSound.setVolume(0.5);
    });

    function playWalkingSound() {
        if (!walkingSound.isPlaying) {
            walkingSound.play();
        }
    }

    function stopWalkingSound() {
        if (walkingSound.isPlaying) {
            walkingSound.stop();
        }
    }

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w':
                controls.moveState.forward = true;
                playWalkingSound();
                break;
            case 's':
                controls.moveState.backward = true;
                playWalkingSound();
                break;
            case 'a':
                controls.moveState.left = true;
                playWalkingSound();
                break;
            case 'd':
                controls.moveState.right = true;
                playWalkingSound();
                break;
        }
    });

    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'w':
                controls.moveState.forward = false;
                break;
            case 's':
                controls.moveState.backward = false;
                break;
            case 'a':
                controls.moveState.left = false;
                break;
            case 'd':
                controls.moveState.right = false;
                break;
        }

        // Stop walking sound if no movement keys are pressed
        if (!controls.moveState.forward && !controls.moveState.backward && !controls.moveState.left && !controls.moveState.right) {
            stopWalkingSound();
        }
    });
}