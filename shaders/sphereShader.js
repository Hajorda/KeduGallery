// shaders/sphereShader.js
export const vertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;
uniform float time;

void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    // Add a wavy effect
    vec3 newPosition = position + normal * sin(time + position.y * 5.0) * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

export const fragmentShader = `
varying vec3 vNormal;
varying vec3 vPosition;
uniform float time;

void main() {
    // Calculate intensity based on normal direction
    float intensity = dot(vNormal, vec3(0.0, 0.0, 1.0));

    // Add color variation based on position and time
    vec3 color = vec3(0.5 + 0.5 * sin(vPosition.x * 10.0 + time),
                      0.5 + 0.5 * sin(vPosition.y * 10.0 + time),
                      0.5 + 0.5 * sin(vPosition.z * 10.0 + time));

    gl_FragColor = vec4(color * intensity, 1.0);
}
`;