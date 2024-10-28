// Get the token images and the drop area
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
const dropArea = document.getElementById('div2');

// Enable dragging on all tokens
tokens.forEach(token => {
    token.setAttribute('draggable', true);
    
    // Event listener for dragging the token
    token.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
    });
});

// Counter for the number of tokens
let tokenCount = 0;

// Event listener for dragging over the drop area
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
});

// Event listener for dropping a token in the drop area
dropArea.addEventListener('drop', (event) => {
    event.preventDefault();

    // Get the dragged token ID
    const tokenId = event.dataTransfer.getData('text/plain');
    const tokenImage = document.getElementById(tokenId);

    // Clone the token image
    const clone = tokenImage.cloneNode(true);

    // Remove existing token if present
    const existingToken = dropArea.querySelector('img');
    if (existingToken) {
        dropArea.removeChild(existingToken);
    }

    // Append the cloned image to the drop area
    dropArea.appendChild(clone);
    
    // Increment token count based on the dragged token
    switch (tokenId) {
        case '1$':
            tokenCount += 1; // 1$
            break;
        case '5$':
            tokenCount += 5; // 5$
            break;
        case '10$':
            tokenCount += 10; // 10$
            break;
        case '20$':
            tokenCount += 20; // 20$
            break;
        case '50$':
            tokenCount += 50; // 50$
            break;
        case '100$':
            tokenCount += 100; // 100$
            break;
        case '500$':
            tokenCount += 500; // 500$
            break;
        case '1000$':
            tokenCount += 1000; // 1000$
            break;
    }

    // Update the token count display
    updateTokenCount();
});

// Function to update the token count display
function updateTokenCount() {
    let countDisplay = dropArea.querySelector('.token-count');
    
    if (!countDisplay) {
        countDisplay = document.createElement('div');
        countDisplay.classList.add('token-count');
        countDisplay.style.position = 'absolute';
        countDisplay.style.top = '0';
        countDisplay.style.right = '0';
        countDisplay.style.color = 'white';
        countDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        countDisplay.style.padding = '5px';
        dropArea.appendChild(countDisplay);
    }
    
    countDisplay.textContent = `$${tokenCount}`;
}
