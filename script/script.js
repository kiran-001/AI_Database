const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}


// when we click on hamburger icon its close 

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

// // Variables for loading tool tiles in chunks
// let toolsData = [];
// let filteredData = [];
// let currentIndex = 0;
// const itemsPerPage = 12;

// fetch('final_data.json')
//     .then(response => response.json())
//     .then(data => {
//         toolsData = data; // Store data in the global variable
//         filteredData = toolsData; // Initialize filtered data
//         populateFilters(); // Populate filter options based on data
//         loadMoreTools();  // Initial load of tools
//     })
//     .catch(error => console.error('Error loading tools:', error));

// function loadMoreTools() {
//     const toolsContainer = document.querySelector('.tools-tiles');
//     const endIndex = currentIndex + itemsPerPage;

//     filteredData.slice(currentIndex, endIndex).forEach(tool => {
//         const toolTile = document.createElement('div');
//         toolTile.classList.add('tool-tile');
// // <a href="${tool["Tool Directory URL"]}">${tool["Tool Name"]}</a>
//         toolTile.innerHTML = `
//             <img src="${tool["Tile URL"]}" alt="${tool["Tool Name"]}">
//             <h3 class="tool-title">
//                 <a href="tool.html?id=${tool.id}">${tool["Tool Name"]}</a>
//                 <a href="${tool["Tool Directory URL"]}" target=_blank class="link-icon">🔗</a>
//             </h3>
//             <p class="tool-desc">${tool["What it is?"]}</p>
//             <div class="tool-tags">
//                 ${tool.Tags.split(' ').map(tag => `<button class="tag-button">${tag.replace(/#/g, '')}</button>`).join('')}
//             </div>
//         `;

//         toolsContainer.appendChild(toolTile);
//     });

//     currentIndex += itemsPerPage;

//     // Hide "Load More" button if all items are loaded
//     if (currentIndex >= filteredData.length) {
//         document.getElementById('loadMoreBtn').style.display = 'none';
//     }
// }

// // Populate filters based on available data
// function populateFilters() {
//     const categoryFilter = document.getElementById('category-filter');
//     const tagFilter = document.getElementById('tag-filter');
    
//     const categories = new Set(toolsData.map(tool => tool.Category));
//     const tags = new Set(toolsData.flatMap(tool => tool.Tags.split(' ').map(tag => tag.replace(/#/g, ''))));

//     categories.forEach(category => {
//         const option = document.createElement('option');
//         option.value = category;
//         option.textContent = category;
//         categoryFilter.appendChild(option);
//     });

//     tags.forEach(tag => {
//         const option = document.createElement('option');
//         option.value = tag;
//         option.textContent = tag;
//         tagFilter.appendChild(option);
//     });
// }

// // Filter tools based on selected criteria
// function applyFilters() {
//     const priceFilter = document.getElementById('price-filter').value;
//     const categoryFilter = document.getElementById('category-filter').value;
//     const tagFilter = document.getElementById('tag-filter').value;

//     filteredData = toolsData.filter(tool => {
//         const matchesPrice = priceFilter === 'all' || tool.Price === priceFilter;
//         const matchesCategory = categoryFilter === 'all' || tool.Category === categoryFilter;
//         const matchesTag = tagFilter === 'all' || tool.Tags.includes(`#${tagFilter}`);

//         return matchesPrice && matchesCategory && matchesTag;
//     });

//     currentIndex = 0;
//     document.querySelector('.tools-tiles').innerHTML = '';
//     document.getElementById('loadMoreBtn').style.display = 'block';
//     loadMoreTools();
// }

// // Event listener for "Load More" button
// document.getElementById('loadMoreBtn').addEventListener('click', loadMoreTools);

// // Event listeners for filter change
// document.getElementById('price-filter').addEventListener('change', applyFilters);
// document.getElementById('category-filter').addEventListener('change', applyFilters);
// document.getElementById('tag-filter').addEventListener('change', applyFilters);


// Variables for loading tool tiles in chunks
let toolsData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 12;
let totalPages = 0;

fetch('final_data.json')
    .then(response => response.json())
    .then(data => {
        toolsData = data; // Store data in the global variable
        filteredData = toolsData; // Initialize filtered data
        populateFilters(); // Populate filter options based on data
        // Check for category query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        const categoryParam = urlParams.get('category');
        if (categoryParam) {
            document.getElementById('category-filter').value = categoryParam;
        }

        // If there's a search query, apply it
        if (searchQuery) {
            document.querySelector('.search input[type="text"]').value = searchQuery;
            applySearchFilter(searchQuery);
        } else {
            applyFilters(); // Apply filters, including any pre-set category
        }

        // applyFilters(); // Apply filters, including any pre-set category
        calculateTotalPages(); // Calculate the total number of pages
        loadTools();  // Initial load of tools
    })
    .catch(error => console.error('Error loading tools:', error));

    function applySearchFilter(query) {
    filteredData = toolsData.filter(tool => 
        tool["Tool Name"].toLowerCase().includes(query) ||
        tool.Tags.toLowerCase().includes(query) ||
        tool["What it is?"].toLowerCase().includes(query)
    );

    currentPage = 1; // Reset to the first page after applying the search filter
    calculateTotalPages(); // Recalculate the total number of pages
    loadTools(); // Load the filtered tools
}

function calculateTotalPages() {
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
}

// function loadTools() {
//     const toolsContainer = document.querySelector('.tools-tiles');
//     toolsContainer.innerHTML = ''; // Clear previous tools

//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;

//     filteredData.slice(startIndex, endIndex).forEach(tool => {
//         const toolTile = document.createElement('div');
//         toolTile.classList.add('tool-tile');
//         toolTile.innerHTML = `
//             <img src="${tool["Tile URL"]}" alt="${tool["Tool Name"]}">
//             <h3 class="tool-title">
//                 <a href="tool.html?id=${tool.id}">${tool["Tool Name"]}</a>
//                 <a href="${tool["Tool Directory URL"]}" target=_blank class="link-icon">
//                     <img src="Assets/icons/external-link.svg" alt="Link Icon" width="30" height="30" class="custom-icon">
//                 </a>
//             </h3>
//             <p class="tool-desc">${tool["What it is?"]}</p>
//             <div class="tool-tags">
//                 ${tool.Tags.split(' ').map(tag => `<button class="tag-button">${tag.replace(/#/g, '')}</button>`).join('')}
//             </div>
//         `;

//         toolsContainer.appendChild(toolTile);
//     });

//     updatePaginationControls();
// }

// Scroll to the top of the tools section

function loadTools() {
    const toolsContainer = document.querySelector('.tools-tiles');
    toolsContainer.innerHTML = ''; // Clear previous tools

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    filteredData.slice(startIndex, endIndex).forEach(tool => {
        const toolTile = document.createElement('div');
        toolTile.classList.add('tool-tile');
        toolTile.innerHTML = `
            <img src="${tool["Tile URL"]}" alt="${tool["Tool Name"]}">
            <h3 class="tool-title">
                <a href="tool.html?id=${tool.id}">${tool["Tool Name"]}</a>
                <a href="${tool["Tool Directory URL"]}" target=_blank class="link-icon">
                    <img src="Assets/icons/external-link.svg" alt="Link Icon" width="30" height="30" class="custom-icon">
                </a>
            </h3>
            <p class="tool-desc">${tool["What it is?"]}</p>
            <div class="tool-tags">
                ${tool.Tags.split(' ').map(tag => `
                    <button class="tag-button">${tag.replace(/#/g, '')}</button>
                `).join('')}
            </div>
        `;

        toolsContainer.appendChild(toolTile);

        // Add event listeners for tag buttons
        const tagButtons = toolTile.querySelectorAll('.tag-button');
        tagButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tag = button.textContent.trim().toLowerCase();
                document.querySelector('.search input[type="text"]').value = tag;
                applyFilters();
            });
        });
    });

    updatePaginationControls();
}


function scrollToToolsSection() {
    document.querySelector('.filter-section').scrollIntoView({ behavior: 'smooth' });
}

// Event listeners for Previous and Next buttons
document.getElementById('prevPageBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;    // Go to the previous page
        loadTools();       // Load tools for the new page
        scrollToToolsSection();  // Scroll to the top of the tools section
    }
});

document.getElementById('nextPageBtn').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;    // Go to the next page
        loadTools();       // Load tools for the new page
        scrollToToolsSection();  // Scroll to the top of the tools section
    }
});

// Create page number buttons dynamically and add event listeners
function updatePaginationControls() {
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const pageNumbers = document.getElementById('pageNumbers');
    pageNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageNumberBtn = document.createElement('button');
        pageNumberBtn.textContent = i;
        pageNumberBtn.classList.add('pagination-btn');
        if (i === currentPage) {
            pageNumberBtn.classList.add('active');
        }
        pageNumberBtn.addEventListener('click', () => {
            currentPage = i;   // Go to the selected page number
            loadTools();       // Load tools for the new page
            scrollToToolsSection();  // Scroll to the top of the tools section
        });
        pageNumbers.appendChild(pageNumberBtn);
    }

    // Enable/Disable Previous Button
    prevBtn.disabled = currentPage === 1;

    // Enable/Disable Next Button
    nextBtn.disabled = currentPage === totalPages;
}


// Event listeners for Previous and Next buttons
document.getElementById('prevPageBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadTools();
    }
});

document.getElementById('nextPageBtn').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        loadTools();
    }
});

// Populate filters based on available data
function populateFilters() {
    const categoryFilter = document.getElementById('category-filter');
    // const tagFilter = document.getElementById('tag-filter');
    const apiFilter = document.getElementById('api-filter');

    const categories = new Set(toolsData.map(tool => tool.Category));
    // const tags = new Set(toolsData.flatMap(tool => tool.Tags.split(' ').map(tag => tag.replace(/#/g, ''))));

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // tags.forEach(tag => {
    //     const option = document.createElement('option');
    //     option.value = tag;
    //     option.textContent = tag;
    //     tagFilter.appendChild(option);
    // });
}

// Apply filters based on selected criteria and search query
// function applyFilters() {
//     const priceFilter = document.getElementById('price-filter').value;
//     const categoryFilter = document.getElementById('category-filter').value;
//     const tagFilter = document.getElementById('tag-filter').value;
//     const searchQuery = document.querySelector('.search input[type="text"]').value.toLowerCase();

//     filteredData = toolsData.filter(tool => {
//         const matchesPrice = priceFilter === 'all' || tool.Price === priceFilter;
//         const matchesCategory = categoryFilter === 'all' || tool.Category === categoryFilter;
//         const matchesTag = tagFilter === 'all' || tool.Tags.includes(`#${tagFilter}`);
//         const matchesSearch = searchQuery === '' || 
//             tool["Tool Name"].toLowerCase().includes(searchQuery) || 
//             tool["What it is?"].toLowerCase().includes(searchQuery) || 
//             tool.Category.toLowerCase().includes(searchQuery) || 
//             tool.Tags.toLowerCase().includes(searchQuery);

//         return matchesPrice && matchesCategory && matchesTag && matchesSearch;
//     });

//     currentPage = 1; // Reset to first page after applying filters
//     calculateTotalPages();
//     loadTools();
// }

function applyFilters() {
    const priceFilter = document.getElementById('price-filter').value;
    const categoryFilter = document.getElementById('category-filter').value;
    const apiFilter = document.getElementById('api-filter').value;
    const searchQuery = document.querySelector('.search input[type="text"]').value.toLowerCase();

    filteredData = toolsData.filter(tool => {
        const matchesPrice = priceFilter === 'all' || tool.Price === priceFilter;
        const matchesCategory = categoryFilter === 'all' || tool.Category === categoryFilter;
        const matchesAPI = apiFilter === 'all' || (apiFilter === 'yes' && tool.API !== "Not Available");
        const matchesSearch = searchQuery === '' || 
            tool["Tool Name"].toLowerCase().includes(searchQuery) || 
            tool["What it is?"].toLowerCase().includes(searchQuery) || 
            tool.Category.toLowerCase().includes(searchQuery) || 
            tool.Tags.toLowerCase().includes(searchQuery); // Now includes tag search

        return matchesPrice && matchesCategory && matchesAPI && matchesSearch;
    });

    currentPage = 1; // Reset to first page after applying filters
    calculateTotalPages();
    loadTools();
}

document.getElementById('resetFiltersBtn').addEventListener('click', () => {
    // Reset all filters to their default values
    document.getElementById('price-filter').value = 'all';
    document.getElementById('category-filter').value = 'all';
    document.getElementById('api-filter').value = 'all';
    document.querySelector('.search input[type="text"]').value = '';

    // Apply filters and reload tools
    applyFilters();
});


// Event listener for "Go" button
document.querySelector('.search button[type="submit"]').addEventListener('click', applyFilters);

// Event listener for "Enter" key in the search input
document.querySelector('.search input[type="text"]').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission if inside a form
        applyFilters(); // Call applyFilters when Enter is pressed
    }
});

// Event listeners for filter change
document.getElementById('price-filter').addEventListener('change', applyFilters);
document.getElementById('category-filter').addEventListener('change', applyFilters);
// document.getElementById('tag-filter').addEventListener('change', applyFilters);
document.getElementById('api-filter').addEventListener('change', applyFilters);

// Function to handle search and redirect to tool-grid.html with the search query
function handleSearch(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    const searchInput = document.querySelector('.search input[type="text"]').value.trim().toLowerCase();

    // Check if the user entered a search query
    if (searchInput) {
        // Redirect to tool-grid.html with the search query as a URL parameter
        window.location.href = `tool-grid.html?search=${encodeURIComponent(searchInput)}`;
    } else {
        alert('Please enter a search term.'); // Optional: handle empty search queries
    }
}

// Attach the search function to the search form's submit event
document.querySelector('.search-bar').addEventListener('submit', handleSearch);

