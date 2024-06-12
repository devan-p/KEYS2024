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

// Add event listener for Enter key
document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
