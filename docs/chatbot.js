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
        <div id="chatbot" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
            <button onclick="toggleChatbot()" style="background-color: #007bff; color: white; border: none; padding: 10px; border-radius: 5px;">Chat</button>
            <div id="chatbot-window" style="display: none; flex-direction: column; width: 300px; height: 400px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <div id="chatbot-header" style="background-color: #007bff; color: white; padding: 10px; border-top-left-radius: 5px; border-top-right-radius: 5px;">
                    <span>Chatbot</span>
                    <button onclick="closeChatbot()" style="float: right; background: none; border: none; color: white; font-size: 16px;">&times;</button>
                </div>
                <div id="chatbot-messages" style="flex: 1; padding: 10px; overflow-y: auto; border-bottom: 1px solid #ccc;"></div>
                <div style="padding: 10px;">
                    <input id="chatbot-input" type="text" style="width: 100%; padding: 10px; box-sizing: border-box;" placeholder="Type a message...">
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(chatbotContainer);

    // Add event listener for Enter key on the input field
    document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
