// document.addEventListener('DOMContentLoaded', () => {
//     let currentSlide = 0;
//     const slideInterval = 5000; // 5 seconds interval for auto-slide
//     let intervalId;

//     function populateSlider() {
//         const sliderContainer = document.querySelector('.slider-container');
//         const featuredTools = toolsData.slice(0, 5); // Showcasing the first 5 tools

//         featuredTools.forEach(tool => {
//             const toolLink = document.createElement('a');
//             toolLink.href = `tool.html?id=${tool.id}`;
//             toolLink.classList.add('slider-item');

//             const toolImage = document.createElement('img');
//             toolImage.src = tool["Tile URL"];
//             toolImage.alt = tool["Tool Name"];
//             toolImage.classList.add('slider-image');

//             toolLink.appendChild(toolImage);
//             sliderContainer.appendChild(toolLink);
//         });

//         // Clone the first slide and append it at the end for a smooth loop
//         const firstSlideClone = sliderContainer.children[0].cloneNode(true);
//         sliderContainer.appendChild(firstSlideClone);
//     }

//     function showSlide(index) {
//         const slides = document.querySelectorAll('.slider-container .slider-item');
//         if (index >= slides.length) {
//             currentSlide = 0;
//             document.querySelector('.slider-container').style.transition = 'none'; // Disable transition
//             document.querySelector('.slider-container').style.transform = `translateX(0)`;
//             setTimeout(() => {
//                 document.querySelector('.slider-container').style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
//             }, 20);
//             return;
//         }
//         currentSlide = index;
//         const offset = -currentSlide * 100;
//         document.querySelector('.slider-container').style.transform = `translateX(${offset}%)`;
//     }

//     function nextSlide() {
//         showSlide(currentSlide + 1);
//     }

//     function prevSlide() {
//         if (currentSlide === 0) {
//             currentSlide = document.querySelectorAll('.slider-container .slider-item').length - 2; // Jump to the last real slide
//             document.querySelector('.slider-container').style.transition = 'none'; // Disable transition
//             const offset = -currentSlide * 100;
//             document.querySelector('.slider-container').style.transform = `translateX(${offset}%)`;
//             setTimeout(() => {
//                 document.querySelector('.slider-container').style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
//                 nextSlide(); // Move to the cloned slide
//             }, 20);
//             return;
//         }
//         showSlide(currentSlide + 1);
//     }

//     function startSlider() {
//         intervalId = setInterval(nextSlide, slideInterval);
//     }

//     function stopSlider() {
//         clearInterval(intervalId);
//     }

//     // Populate the slider when the page loads
//     fetch('final_data.json')
//         .then(response => response.json())
//         .then(data => {
//             toolsData = data; // Store data in the global variable
//             populateSlider();
//             showSlide(0); // Show the first slide initially
//             startSlider(); // Start the automatic sliding
//         })
//         .catch(error => console.error('Error loading tools:', error));

//     // Manual navigation
//     document.getElementById('nextSlide').addEventListener('click', nextSlide);
//     document.getElementById('prevSlide').addEventListener('click', prevSlide);

//     // Pause the slider when hovering over it
//     const sliderContainer = document.querySelector('.slider');
//     sliderContainer.addEventListener('mouseenter', stopSlider);
//     sliderContainer.addEventListener('mouseleave', startSlider);
// });


// document.addEventListener('DOMContentLoaded', () => {
//     let currentSlide = 0; // Start with the first image
//     const slideInterval = 5000; // 5 seconds interval for auto-slide
//     let intervalId;

//     function populateSlider() {
//         const sliderContainer = document.querySelector('.slider-container');
//         const featuredTools = toolsData.slice(0, 5); // Assuming you want to showcase the first 5 tools

//         // Add the slides
//         featuredTools.forEach((tool, index) => {
//             const toolLink = createToolLink(tool, index);
//             sliderContainer.appendChild(toolLink);
//         });
//     }

//     function createToolLink(tool, index) {
//         const toolLink = document.createElement('a');
//         toolLink.href = `tool.html?id=${tool.id}`;
//         toolLink.classList.add('slider-item');

//         if (index === currentSlide) {
//             toolLink.classList.add('center'); // Mark the initial center image
//         }

//         const toolImage = document.createElement('img');
//         toolImage.src = tool["Tile URL"];
//         toolImage.alt = tool["Tool Name"];
//         toolImage.classList.add('slider-image');

//         toolLink.appendChild(toolImage);
//         return toolLink;
//     }

//     function updateClasses() {
//         const slides = document.querySelectorAll('.slider-container .slider-item');
//         slides.forEach(slide => {
//             slide.classList.remove('center');
//         });

//         const previousSlideIndex = (currentSlide - 1 + slides.length) % slides.length;
//         const nextSlideIndex = (currentSlide + 1) % slides.length;

//         slides[previousSlideIndex].style.transform = "translateX(-100%) scale(0.9)"; // Left side
//         slides[currentSlide].classList.add('center'); // Center image
//         slides[currentSlide].style.transform = "translateX(0%) scale(1)"; // Centered
//         slides[nextSlideIndex].style.transform = "translateX(100%) scale(0.9)"; // Right side
//     }

//     function showSlide(index) {
//         const slides = document.querySelectorAll('.slider-container .slider-item');
//         currentSlide = (index + slides.length) % slides.length; // Wrap around
//         updateClasses();
//     }

//     function nextSlide() {
//         showSlide(currentSlide + 1);
//     }

//     function prevSlide() {
//         showSlide(currentSlide - 1);
//     }

//     function startSlider() {
//         intervalId = setInterval(nextSlide, slideInterval);
//     }

//     function stopSlider() {
//         clearInterval(intervalId);
//     }

//     // Populate the slider when the page loads
//     fetch('final_data.json')
//         .then(response => response.json())
//         .then(data => {
//             toolsData = data; // Store data in the global variable
//             populateSlider();
//             updateClasses(); // Show the initial slide setup
//             startSlider(); // Start the automatic sliding
//         })
//         .catch(error => console.error('Error loading tools:', error));

//     // Manual navigation
//     document.getElementById('nextSlide').addEventListener('click', nextSlide);
//     document.getElementById('prevSlide').addEventListener('click', prevSlide);

//     // Pause the slider when hovering over it
//     const sliderContainer = document.querySelector('.slider');
//     sliderContainer.addEventListener('mouseenter', stopSlider);
//     sliderContainer.addEventListener('mouseleave', startSlider);
// });


