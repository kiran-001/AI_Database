function getToolIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function loadToolDetails() {
    const toolId = getToolIdFromUrl();
    fetch('final_data.json')
        .then(response => response.json())
        .then(tools => {
            const tool = tools.find(t => t.id === toolId);
            if (tool) {
                document.getElementById('tool-title').innerText = tool['Tool Name'];
                document.getElementById('tool-url').href = tool['Tool Directory URL'];
                document.getElementById('tool-overview').innerText = tool["What it is?"];
                
                const youtubeLink = tool['Youtube link'];
                const toolVideoElement = document.getElementById('tool-video');
                const fallbackImageElement = document.getElementById('fallback-image');
                const notAvailableElement = document.getElementById('not-available');

                if (youtubeLink && youtubeLink.trim() !== "" && youtubeLink !== "Not Available") {
                    // Extract the video ID from the short URL
                    const videoId = youtubeLink.split('/').pop(); // Get the part after the last '/'
                    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
                    
                    toolVideoElement.src = youtubeEmbedUrl;
                    toolVideoElement.style.display = 'block';
                } else {
                    fallbackImageElement.src = tool['Tile URL'];
                    fallbackImageElement.style.display = 'block';
                    // notAvailableElement.style.display = 'block';
                }
                document.getElementById('tool-need').innerText = tool['Why it is needed?'];
                document.getElementById('tool-features').innerText = tool['Various aspects of the tool'];
                document.getElementById('tool-users').innerText = tool['Value to users'];
                // document.getElementById('tool-image').src = tool['Logo URL'];
                // document.getElementById('tool-image').alt = tool['Tool Name'];
                // document.getElementById('tool-description').innerText = tool.Description;
                // console.log("Tool URL set to: " + tool['Tool Directory URL']);
            } else {
                document.getElementById('tool-details').innerText = 'Tool not found!';
                console.error('Tool not found for ID:', toolId);
            }
        })
        .catch(error => console.error('Error loading tool details:', error));
}

if (window.location.pathname.endsWith('tool.html')) {
    window.onload = loadToolDetails;
}
