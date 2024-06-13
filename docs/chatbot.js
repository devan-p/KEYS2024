// Function to toggle the visibility of the chatbot window
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.style.display = chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '' ? 'flex' : 'none';
}

// Function to close the chatbot window
function closeChatbot() {
    document.getElementById('chatbot-window').style.display = 'none';
}

// Function to send a message
async function sendMessage() {
    const inputField = document.getElementById('chatbot-input');
    const message = inputField.value;

    if (message.trim() === '') return;

    appendMessage('You: ' + message);
    inputField.value = '';

    // Simulate a bot response
    setTimeout(() => {
        appendMessage('Bot: This is a simulated response.');
    }, 1000);
}

// Function to append a message to the chat window
function appendMessage(message) {
    const chatbox = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Inject chatbot HTML and add event listeners once the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create and append the chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.innerHTML = `
        s
        <div id="chatbot-container">
    <div id="chatbot-icon" onclick="toggleChatbot()">
        <span>Chat!</span>
    </div>
    <div id="chatbot-window">
        <div id="chatbot-header">
            <span>Have any questions?</span>
            <button onclick="closeChatbot()">X</button>
        </div>
        <div id="chatbot-messages"></div>
        <input type="text" id="chatbot-input" placeholder="Type your message..." />
        <button onclick="sendMessage()">Send</button>
    </div>
</div>

<!-- Include the CSS file -->
<link rel="stylesheet" type="text/css" href="chatbot.css">

<!-- Include the JavaScript file -->
<script src="chatbot.js"></script>
    `;
    document.body.appendChild(chatbotContainer);

    // Add event listener for Enter key on the input field
    document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
