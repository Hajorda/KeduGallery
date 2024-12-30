# KeduGallery

This project is a school project for the CMPE360 Graphics class. It is an interactive 3D art gallery built using Three.js. The gallery allows users to explore various artworks and learn about their history and significance. The project includes features such as movement controls, audio playback, and special modes like "God Mode".

 
![image](https://github.com/user-attachments/assets/6f0d1b7b-71ab-484b-acbc-6c0912ba7563)


**Demo:** https://hajorda.github.io/KeduGallery/

## Project Structure

```
.gitattributes
.gitignore
.vscode/
	settings.json
assets/
	cat.glb
	fonts/
		alt.json
		minecraft_font.json
	Jelly.json
	minecraft_cat.glb
	minecraft_chest.glb
	minecraft_sign.glb
	minecraft_tree.glb
	oiiaioooooiai_cat.glb
	sign.gltf
	textures/
	villager_plains_1.glb
css/
	style.css
img/
index.html
js/
	animations.js
	builder.js
	controls.js
	events.js
	main.js
	menu.js
	music.js
	objects.js
	scene.js
package.json
README.md
shaders/
	shader.js
	sphereShader.js
textures/
```

## Classes and Important Methods

### 

scene.js



- **

initScene

**: Initializes and returns a new Three.js scene.
- **

initRenderer

**: Initializes and returns a new Three.js WebGL renderer.
- **

initCamera

**: Initializes and returns a new Three.js perspective camera.

### 

controls.js



- **

initControls

**: Initializes and returns PointerLockControls for the camera, allowing the user to move around the scene using the keyboard and mouse.

### 

objects.js



- **

addObjects

**: Adds various objects to the scene, including cubes, spheres, walls, and 3D models. It also sets up lighting and shadows.
- **

animate

**: The main animation loop that updates the scene and renders it. It handles movement controls, shader updates, and object animations.

### 

events.js



- **

addEventListeners

**: Adds event listeners for window resize, keyboard input, and mouse input. It handles movement controls, audio playback, and toggling "God Mode".

### 

menu.js



- **

hideMenu

**: Hides the main menu and associated elements.
- **

showMenu

**: Shows the main menu and associated elements.
- **

setupPlayButton

**: Sets up the play button to start the experience when clicked.
- **

startExperience

**: Starts the interactive experience.

### 

music.js



- **

setupAudio

**: Sets up the audio for the scene, including loading and playing background music.
- **

startAudio

**: Starts playing the background music.
- **

stopAudio

**: Stops playing the background music.

### 

builder.js



- **

createBlock

**: Creates and returns a block (cube) with the specified dimensions, texture, and position.

### 

sphereShader.js



- **

vertexShader

**: Vertex shader for the custom sphere material.
- **

fragmentShader

**: Fragment shader for the custom sphere material.

### 

shader.js



- **

vertexShader1

**: Vertex shader for the Aurora Borealis effect.
- **

fragmentShader1

**: Fragment shader for the Aurora Borealis effect.

### 

main.js



- Initializes the scene, renderer, camera, controls, objects, and event listeners.
- Starts the animation loop.

## How to Run

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Start the development server using `npm run dev`.
4. Open the browser and navigate to `http://localhost:3000` to view the project.

## Controls

- **W/A/S/D**: Move around
- **Mouse**: Look around
- **Space**: Move up (in God Mode)
- **Shift**: Move down (in God Mode)
- **G**: Start music
- **H**: Stop music
- **G**: Toggle "God Mode" (type "godmode" to activate)

## Special Features

- **God Mode**: Allows the user to move up and down using the space and shift keys. Activated by typing "godmode".
- **Audio Playback**: Background music can be started and stopped using the G and H keys.
- **Interactive Menu**: The main menu can be shown and hidden, and the experience can be started by clicking the play button.


![image](https://github.com/user-attachments/assets/bc83b03c-48ad-4308-922a-d9384ab5cc08)

## Credits

- Made by Hajorda
- Special thanks to Tolga Hoca

This project demonstrates the use of Three.js for creating interactive 3D graphics and includes various features such as custom shaders, 3D models, and user interaction.
