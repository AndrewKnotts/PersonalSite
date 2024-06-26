//hamgburger menu

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");

}

// profile pic effect

document.addEventListener('DOMContentLoaded', (event) => {
    const imageContainer = document.getElementById('profile_pic_container');
    const image = document.getElementById('profile_image');
    
    // Define the image sources
    const initialImageSrc = './assets/AnimatedGraphics/Profile_sprite_default2.gif'
    const hoverImageSrc = './assets/AnimatedGraphics/Profile_sprite_hover.png';
    const clickImageSrc = './assets/AnimatedGraphics/Profile_sprite_click.png';
    
    // Change image on hover
    imageContainer.addEventListener('mouseover', () => {
        image.src = hoverImageSrc;
    });

    // Revert image when not hovering
    imageContainer.addEventListener('mouseout', () => {
        image.src = initialImageSrc;
    });

   // Change image on click
    imageContainer.addEventListener('click', () => {
        image.src = clickImageSrc;
        
        // Revert image after 1 second
        setTimeout(() => {
            image.src = initialImageSrc;
        }, 1000);
    });
});

// computer effect

document.addEventListener('DOMContentLoaded', (event) => {
    const imageContainer = document.getElementById('about_pic_container');
    const image = document.getElementById('about_image');
    
    // Define the image and GIF sources
    const initialImageSrc = './assets/AnimatedGraphics/computerguy_default.gif';
    const offImageSrc = './assets/AnimatedGraphics/computerguy_off.png';
    const shutdownGifSrc = './assets/AnimatedGraphics/computerguy_shutdown.gif';
    const startupGifSrc = './assets/AnimatedGraphics/computerguy_turnon.gif';
    
    // State to keep track of the current image
    let isOn = true;

    // Function to change image with delay after GIF plays
    function changeImageWithDelay(gifSrc, finalImageSrc, duration) {
        image.src = gifSrc;
        setTimeout(() => {
            image.src = finalImageSrc;
        }, duration);
    }
    
    // Change image on click
    imageContainer.addEventListener('click', () => {
        if (isOn) {
            // If the image is on, play shutdown GIF and then show off image
            changeImageWithDelay(shutdownGifSrc, offImageSrc, 700); // Adjust the duration of the GIF
        } else {
            // If the image is off, play startup GIF and then show initial image
            changeImageWithDelay(startupGifSrc, initialImageSrc, 500); // Adjust the duration of the GIF
        }
        isOn = !isOn; // Toggle the state
    });
});


//running character
const container = document.querySelector('.container');
const character = document.getElementById('character');
let animationFrame;

// Function to update character position and animation based on mouse position
container.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX - container.offsetLeft;
    moveCharacter(mouseX);
});

// Function to stop the character animation when mouse leaves the container
container.addEventListener('mouseleave', () => {
    stopCharacter();
});

// Function to move the character towards the target position
function moveCharacter(targetX) {
    const characterX = character.offsetLeft + character.offsetWidth*2;
    const distance = targetX - characterX;
    const step = distance / Math.abs(distance) * 1; // Adjust speed here

    function stepMove() {
        const newX = character.offsetLeft + step * 1;
        const newCharacterX = newX + character.offsetWidth*2;

        if ((step > 0 && newCharacterX >= targetX) || (step < 0 && newCharacterX <= targetX)) {
            character.style.left = `${targetX - character.offsetWidth*2}px`;
            stopCharacter();
        } else {
            character.style.left = `${newX}px`;
            animationFrame = requestAnimationFrame(stepMove);
        }
    }

    // Change the character's direction based on the target position
    if (distance > 0) {
        character.style.backgroundImage = 'url("./assets/media/peckii_right.gif")'; // Running right GIF
    } else {
        character.style.backgroundImage = 'url("./assets/media/peckii_left.gif")'; // Running left GIF
    }

    cancelAnimationFrame(animationFrame); // Cancel any ongoing animation frame
    animationFrame = requestAnimationFrame(stepMove);
}

// Function to stop the character and reset the animation to idle
function stopCharacter() {
    character.style.backgroundImage = 'url("./assets/media/peckii_still.gif")'; // Idle animation GIF
    cancelAnimationFrame(animationFrame);
}


