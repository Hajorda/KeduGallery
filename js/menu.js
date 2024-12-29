export const hideMenu = () => {
    const menu = document.getElementById('menu');
    menu.style.display = 'none'; // Hide the menu
    const cats = document.querySelectorAll('.cat');
    cats.forEach(cat => cat.style.display = 'none'); // Hide the cats
  };
  
  export const showMenu = () => {
    const menu = document.getElementById('menu');
    menu.style.display = 'block'; // Show the menu
    const cats = document.querySelectorAll('.cat');
    cats.forEach(cat => cat.style.display = 'block'); // Show the cats
  };
  
// menu.js
export function setupPlayButton(controls) {
    const playButton = document.getElementById('play-button');
    if (playButton) {
        playButton.addEventListener('click', () => {
            startExperience(controls);
        });
    }
}

export function startExperience(controls) {
    // Ensure controls is defined
    if (!controls) {
        console.error('Controls are not defined');
        return;
    }

    // Your existing code to start the experience
}
  
  document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play_button');
    if (playButton) {
      playButton.addEventListener('click', () => {
        const menu = document.getElementById('menu');
        const cats = document.querySelectorAll('.cat');
        if (menu.style.display === 'none') {
          menu.style.display = 'block';
          cats.forEach(cat => cat.style.display = 'block');
        } else {
          menu.style.display = 'none';
          cats.forEach(cat => cat.style.display = 'none');
        }
      });
    }
  });