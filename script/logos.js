(function() {
    let filteredData = [];

    // Fetch the data and initialize the logo grid
    fetch('final_data.json')
        .then(response => response.json())
        .then(data => {
            filteredData = data; // Initialize filtered data
            loadLogos(); // Load logos initially
        })
        .catch(error => console.error('Error loading tools:', error));

    // Function to load logos into the logo section
    function loadLogos() {
        const logoGrid = document.getElementById('logoGrid');
        logoGrid.innerHTML = ''; // Clear previous logos
    
        const logosToDisplay = 30; // Total number of logos to display (10 logos per row * 3 rows)
        const displayedLogos = filteredData.slice(0, logosToDisplay); // Select only the first 30 logos
    
        displayedLogos.forEach(tool => {
            const logoLink = document.createElement('a');
            logoLink.href = tool["Tool Directory URL"];
            logoLink.target = "_blank"; // Opens in a new tab
    
            const logoImg = document.createElement('img');
            logoImg.src = tool["Logo URL"];
            logoImg.alt = tool["Tool Name"];
            logoImg.classList.add('logo-img'); // Add any styling class
    
            logoLink.appendChild(logoImg);
            logoGrid.appendChild(logoLink);
        });
    }    

    // Function to handle search and redirect to tool-grid.html with the query
    function handleSearch(event) {
        event.preventDefault(); // Prevent the form from submitting
        const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
        
        // Check if there is a search input
        if (searchInput) {
            // Redirect to tool-grid.html with the search query as a parameter
            window.location.href = `tool-grid.html?search=${encodeURIComponent(searchInput)}`;
        } else {
            // Optionally, handle the case where search input is empty
            alert('Please enter a search term.');
        }
    }

    // Attach the search function to the search form
    document.querySelector('.search-bar').addEventListener('submit', handleSearch);
})();
