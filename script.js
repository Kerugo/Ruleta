// Get the token images and the drop areas
const tokens = [
    document.getElementById('1$'),
    document.getElementById('5$'),
    document.getElementById('10$'),
    document.getElementById('20$'),
    document.getElementById('50$'),
    document.getElementById('100$'),
    document.getElementById('500$'),
    document.getElementById('1000$'),
];

// Select all divs with the class 'droptk', including those in betting options and additional betting
const dropAreas = document.querySelectorAll('.droptk');

// Object to hold token counts for each drop area
const tokenCounts = {};

// Initialize token count for each drop area
dropAreas.forEach((dropArea, index) => {
    tokenCounts[index] = 0; // Assign an initial count of 0 for each area
});

// Enable dragging on all tokens
tokens.forEach(token => {
    token.setAttribute('draggable', true);
    
    // Event listener for dragging the token
    token.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
    });
});

// Add event listeners to all droptk elements
dropAreas.forEach((dropArea, index) => {
    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault(); // Allow dropping
    });

    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();

        // Get the dragged token ID
        const tokenId = event.dataTransfer.getData('text/plain');
        const tokenImage = document.getElementById(tokenId);

        // Clone the token image
        const clone = tokenImage.cloneNode(true);

        // Remove all child nodes (including text and images) from the drop area
        while (dropArea.firstChild) {
            dropArea.removeChild(dropArea.firstChild);
        }

        // Append the cloned image to the drop area
        dropArea.appendChild(clone);
        
        // Increment token count based on the dragged token
        let tokenValue = 0;
        switch (tokenId) {
            case '1$':
                tokenValue = 1; // 1$
                break;
            case '5$':
                tokenValue = 5; // 5$
                break;
            case '10$':
                tokenValue = 10; // 10$
                break;
            case '20$':
                tokenValue = 20; // 20$
                break;
            case '50$':
                tokenValue = 50; // 50$
                break;
            case '100$':
                tokenValue = 100; // 100$
                break;
            case '500$':
                tokenValue = 500; // 500$
                break;
            case '1000$':
                tokenValue = 1000; // 1000$
                break;
        }

        // Update the count for the specific drop area
        tokenCounts[index] += tokenValue;

        // Update the token count display in the specific drop area
        updateTokenCount(dropArea, tokenCounts[index]);
    });
});

// Function to update the token count display in the specific drop area
function updateTokenCount(dropArea, count) {
    let countDisplay = dropArea.querySelector('.token-count');
    
    // Create a new count display if it doesn't exist
    if (!countDisplay) {
        countDisplay = document.createElement('div');
        countDisplay.classList.add('token-count');
        countDisplay.style.position = 'absolute';
        countDisplay.style.top = '0';
        countDisplay.style.right = '0';
        countDisplay.style.color = 'white';
        countDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        dropArea.appendChild(countDisplay);
    }
    
    countDisplay.textContent = `$${count}`;
}
