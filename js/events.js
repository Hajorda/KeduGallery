export function addEventListeners(camera, renderer, controls) {
    // Ensure moveState is defined on controls
    controls.moveState = {
        forward: false,
        backward: false,
        left: false,
        right: false
    };

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w':
                controls.moveState.forward = true;
                break;
            case 's':
                controls.moveState.backward = true;
                break;
            case 'a':
                controls.moveState.left = true;
                break;
            case 'd':
                controls.moveState.right = true;
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
    });
}