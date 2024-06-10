// Add this JavaScript to handle chatbot interaction
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.style.display = chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '' ? 'flex' : 'none';
}

function closeChatbot() {
    document.getElementById('chatbot-window').style.display = 'none';
}

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

        const data = await response.json();
        appendMessage('Bot: ' + data.response);
    } catch (error) {
        appendMessage('Bot: Error communicating with server.');
    }
}

function appendMessage(message) {
    const chatbox = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}