// First, let's modify the vertex shader for sphere2 to create a wobble effect
const vertexShader = `
precision highp float;
uniform float time;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vNormal = normal;
    vUv = uv;
    
    // Create a wobble effect
    vec3 newPosition = position;
    float wobble = sin(time * 2.0 + position.y * 4.0) * 0.2;
    newPosition += normal * wobble;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

// Update the fragment shader to create a color-changing effect
const fragmentShader = `
precision highp float;
uniform float time;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    // Create dynamic color based on time and position
    vec3 color = vec3(0.5 + 0.5 * sin(time),
                      0.5 + 0.5 * sin(time * 1.5),
                      0.5 + 0.5 * sin(time * 2.0));
                      
    // Add some shading based on normals
    float light = dot(vNormal, normalize(vec3(1.0, 1.0, 1.0)));
    color *= 0.5 + 0.5 * light;
    
    gl_FragColor = vec4(color, 1.0);
}
`;

// In your addObjects function, update the sphereMaterial2 creation:
const sphereMaterial2 = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        time: { value: 0.0 }
    }
});

// In your animate function, update the animation loop:
export function animate(renderer, scene, camera, controls, cube, sphere, sphere2, sphereMaterial, sphereMaterial2) {
    requestAnimationFrame(() => animate(renderer, scene, camera, controls, cube, sphere, sphere2, sphereMaterial, sphereMaterial2));

    if (controls && controls.moveState) {
        const moveSpeed = 0.2;
        if (controls.moveState.forward) controls.moveForward(moveSpeed);
        if (controls.moveState.backward) controls.moveForward(-moveSpeed);
        if (controls.moveState.left) controls.moveRight(-moveSpeed);
        if (controls.moveState.right) controls.moveRight(moveSpeed);
    }

    // Update first sphere
    if (sphereMaterial && sphereMaterial.uniforms) {
        sphereMaterial.uniforms.time.value += 0.05;
    }

    // Update second sphere - added rotation and time uniform update
    if (sphereMaterial2 && sphereMaterial2.uniforms) {
        sphereMaterial2.uniforms.time.value += 0.01; // Slower time update for smoother animation
    }
    if (sphere2) {
        sphere2.rotation.y += 0.01; // Add rotation to the second sphere
    }

    if (cube) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }

    if (controls) {
        controls.update();
    }

    renderer.render(scene, camera);
}