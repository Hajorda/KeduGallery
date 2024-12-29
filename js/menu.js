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
  
  // Lock the pointer (controls are activated) and hide the menu when the experience starts
  export const startExperience = (controls) => {
    controls.lock(); // Lock the pointer (controls are activated)
    hideMenu();
  };
  
  export const setupPlayButton = (controls) => {
    const playButton = document.getElementById('play_button'); // Get the reference
    playButton.addEventListener('click', () => startExperience(controls)); // Add the click event listener to the play button to start the experience
  };
  
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