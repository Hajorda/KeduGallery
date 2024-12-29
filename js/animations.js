export function animate(scene, camera, renderer, controls) {
    const cube = scene.children.find(child => child.geometry && child.geometry.type === 'BoxGeometry');
    const sphere = scene.children.find(child => child.geometry && child.geometry.type === 'SphereGeometry');

    const moveSpeed = 0.1;

    const animate = function () {
        requestAnimationFrame(animate);

        // Update camera position based on movement state
        if (controls.moveState.forward) controls.moveForward(moveSpeed);
        if (controls.moveState.backward) controls.moveForward(-moveSpeed);
        if (controls.moveState.left) controls.moveRight(-moveSpeed);
        if (controls.moveState.right) controls.moveRight(moveSpeed);

        // Update shader uniforms
    sphereMaterial.uniforms.time.value += 0.05;
    auroraShaderMaterial.uniforms.iTime.value += 0.01;

        // Rotate the cube
        if (cube) {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        }

        // Animate the sphere (move up and down)
        if (sphere) {
            sphere.position.y = 1 + Math.sin(Date.now() * 0.001) * 2;
        }

        controls.update();
        renderer.render(scene, camera);
    };

    animate();
}