function getToolIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// function formatJsonToBullets(jsonData) {
//     const formattedData = {};

//     // Iterate over each key in the JSON data
//     for (let key in jsonData) {
//         // Split the content into individual bullet points using period followed by space (". ") as the delimiter
//         const bulletPoints = jsonData[key].split(". ").map(point => point.trim()).filter(point => point !== "");

//         // Format each bullet point with bold titles and add them to the formatted data
//         formattedData[key] = bulletPoints.map((point, index) => {
//             // Separate the first sentence (title) from the rest of the text
//             const [title, ...rest] = point.split(": ");
//             let formattedPoint = `<strong>${title}:</strong> ${rest.join(": ")}`;

//             // Add a period at the end and a line break, except for the last point
//             if (index < bulletPoints.length - 1) {
//                 formattedPoint += '.<br>';
//             } else {
//                 formattedPoint += '.';
//             }

//             return formattedPoint;
//         }).join("");
//     }

//     return formattedData;
// }

function formatJsonToBullets(jsonData) {
    const formattedData = {};

    // Iterate over each key in the JSON data
    for (let key in jsonData) {
        // Split the content into bullet points by detecting both ". " and "\n" as delimiters
        const bulletPoints = jsonData[key].split(/(?:\.\s|\n)/).map(point => point.trim()).filter(point => point !== "");

        // Format each bullet point
        formattedData[key] = bulletPoints.map((point, index) => {
            const [title, ...rest] = point.split(": ");
            let formattedPoint = `<strong>${title}:</strong> ${rest.join(": ").trim()}`;

            if (index < bulletPoints.length - 1) {
                formattedPoint += '.<br>';
            } else {
                formattedPoint += '.';
            }

            return formattedPoint;
        }).join("");
    }

    return formattedData;
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
                
                // Handle API Status Button
                const apiButton = document.getElementById('api-button');
                if (tool['API'] && tool['API'] !== "Not Available") {
                    apiButton.href = tool['API'];
                    apiButton.innerText = "API Available";
                    apiButton.classList.remove('disabled');
                } else {
                    apiButton.href = "#";
                    apiButton.innerText = "API Not Available";
                    apiButton.classList.add('disabled');
                }

                // Handle Pricing Information
                const pricingType = document.getElementById('pricing-type');
                const pricingLink = document.getElementById('pricing-link');

                if (tool['Price'] && tool['Price'] !== "Not Available") {
                    pricingType.innerText = tool['Price'];
                } else {
                    pricingType.innerText = "Not Available";
                }

                if (tool['Pricing Link'] && tool['Pricing Link'] !== "Not Available") {
                    pricingLink.href = tool['Pricing Link'];
                    pricingLink.innerText = "View Pricing Details";
                    pricingLink.classList.remove('disabled');
                } else {
                    pricingLink.href = "#";
                    pricingLink.innerText = "Pricing Not Available";
                    pricingLink.classList.add('disabled');
                }

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

                // Use the formatJsonToBullets function to format the content
                const formattedData = formatJsonToBullets({
                    'Various aspects of the tool': tool['Various aspects of the tool'],
                    'Value to users': tool['Value to users']
                });


                document.getElementById('tool-need').innerText = tool['Why it is needed?'];
                document.getElementById('tool-features').innerHTML = formattedData['Various aspects of the tool']
                    .split('<br>').map((item, index) => `<span>${item.trim()}</span>`).join('<br>');
                document.getElementById('tool-users').innerHTML = formattedData['Value to users']
                    .split('<br>').map((item, index) => `<span>${item.trim()}</span>`).join('<br>');
                
                // document.getElementById('tool-features').innerText = tool['Various aspects of the tool'];
                // document.getElementById('tool-users').innerText = tool['Value to users'];
                // document.getElementById('tool-features').innerHTML = formattedData['Various aspects of the tool'];
                // document.getElementById('tool-users').innerHTML = formattedData['Value to users'];
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
