import * as THREE from 'three';
import { setupAudio, startAudio,stopAudio } from "./music.js";
let godMode = false;
let keyBuffer = '';
let isPaused = false;

export function addEventListeners(camera, renderer, controls) {
    controls.moveState = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        up: false,
        down: false
    };

    const audioLoader = new THREE.AudioLoader();
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const walkingSound = new THREE.Audio(listener);
    
    document.getElementById('start_audio').addEventListener('click', startAudio);
    // stop music button
    document.getElementById('stop_audio').addEventListener('click', () => {
        stopAudio();
        console.log('Music stopped');
    }
    );


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
        if (godMode) {
            switch (event.key) {
                case ' ':
                    controls.moveState.up = true;
                    break;
                case 'Shift':
                    controls.moveState.down = true;
                    break;
            }
        }

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
        if (godMode) {
            switch (event.key) {
                case ' ':
                    controls.moveState.up = false;
                    break;
                case 'Shift':
                    controls.moveState.down = false;
                    break;
            }
        }

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

        if (!controls.moveState.forward && !controls.moveState.backward && !controls.moveState.left && !controls.moveState.right) {
            stopWalkingSound();
        }
    });

    window.addEventListener('keypress', (event) => {
        keyBuffer += event.key;
        if (keyBuffer.length > 7) {
            keyBuffer = keyBuffer.slice(-7);
        }

        if (keyBuffer.includes('godmode')) {
            godMode = !godMode;
            const godModeMessage = document.getElementById('godmode-message');
            if (godMode) {
                godModeMessage.textContent = 'God Mode Activated';
                godModeMessage.style.display = 'block';
                setTimeout(() => {
                    godModeMessage.style.display = 'none';
                }, 2000); // Hide the message after 2 seconds
            } else {
                godModeMessage.textContent = 'God Mode Disabled';
                godModeMessage.style.display = 'block';
                setTimeout(() => {
                    godModeMessage.style.display = 'none';
                }, 2000); // Hide the message after 2 seconds
            }
            console.log(`God mode ${godMode ? 'enabled' : 'disabled'}`);
        }
    });
}

// Add toggle info button functionality
const toggleInfoButton = document.getElementById('toggle-info');
const infoPanel = document.getElementById('info-panel');
toggleInfoButton.addEventListener('click', () => {
  infoPanel.classList.toggle('collapsed');
  toggleInfoButton.textContent = infoPanel.classList.contains('collapsed') ? 'Show' : 'Hide';
});