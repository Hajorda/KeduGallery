export function animate(
    renderer,
    scene,
    camera,
    controls,
    cube,
    sphere,
    sphereMaterial,
    auroraShaderMaterial
  ) {
    requestAnimationFrame(() =>
      animate(
        renderer,
        scene,
        camera,
        controls,
        cube,
        sphere,
        sphereMaterial,
        auroraShaderMaterial
      )
    );
  
    // Update camera position based on movement state
    const moveSpeed = 0.2;
    if (controls && controls.moveState) {
      if (controls.moveState.forward) controls.moveForward(moveSpeed);
      if (controls.moveState.backward) controls.moveForward(-moveSpeed);
      if (controls.moveState.left) controls.moveRight(-moveSpeed);
      if (controls.moveState.right) controls.moveRight(moveSpeed);
    }
  
    // Update shader uniforms
    if (sphereMaterial && sphereMaterial.uniforms) {
      sphereMaterial.uniforms.time.value += 0.05;
    }
    if (auroraShaderMaterial && auroraShaderMaterial.uniforms) {
      auroraShaderMaterial.uniforms.iTime.value += 0.01;
    }
  
    // Rotate the cube
    if (cube) {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }
  
    // Animate the sphere (move up and down)
    if (sphere) {
      sphere.position.y = 1 + Math.sin(Date.now() * 0.001) * 2;
    }
  
    // Ensure controls is defined before calling update
    if (controls) {
      controls.update();
    }
  
    renderer.render(scene, camera);
  }