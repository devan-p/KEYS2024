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

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        appendMessage('Bot: ' + data.response);
    } catch (error) {
        console.error('Error communicating with server:', error);
        appendMessage('Bot: Error communicating with server.');
    }
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