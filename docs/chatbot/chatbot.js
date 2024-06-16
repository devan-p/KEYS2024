// docs/chatbot/chatbot.js

document.addEventListener('DOMContentLoaded', function() {
    initializeChatbot();

    document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    // Listen to URL changes
    window.addEventListener('popstate', function() {
        loadChatHistory();
        loadChatbotState();
    });

    // Listen to storage events to sync chat history across tabs/pages
    window.addEventListener('storage', function(event) {
        if (event.key === 'chatbotMessages' || event.key === 'chatbotState') {
            loadChatHistory();
            loadChatbotState();
        }
    });

    // Listen for URL changes manually
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            loadChatHistory();
            loadChatbotState();
        }
    }).observe(document, {subtree: true, childList: true});
});

function initializeChatbot() {
    loadChatHistory();
    loadChatbotState();

    const messagesContainer = document.getElementById('chatbot-messages');
    const observer = new MutationObserver(saveChatHistory);
    observer.observe(messagesContainer, { childList: true, subtree: true });
}

function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    const isOpen = chatbotWindow.style.display === 'flex';
    chatbotWindow.style.display = isOpen ? 'none' : 'flex';
    sessionStorage.setItem('chatbotState', isOpen ? 'closed' : 'open');
}

function closeChatbot() {
    document.getElementById('chatbot-window').style.display = 'none';
    sessionStorage.setItem('chatbotState', 'closed');
}

function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value;
    if (message.trim() !== '') {
        input.value = '';
        appendMessage(message, 'user');
        // Simulate bot response (replace with actual bot logic if available)
        appendMessage('Message received', 'bot');
        saveChatHistory();
    }
}

function appendMessage(message, sender) {
    const messages = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender.charAt(0).toUpperCase() + sender.slice(1)}: ${message}`;
    messageElement.className = sender;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
}

function saveChatHistory() {
    const messages = document.getElementById('chatbot-messages').innerHTML;
    sessionStorage.setItem('chatbotMessages', messages);
}

function loadChatHistory() {
    const messages = sessionStorage.getItem('chatbotMessages');
    if (messages) {
        document.getElementById('chatbot-messages').innerHTML = messages;
    }
}

function loadChatbotState() {
    const chatbotState = sessionStorage.getItem('chatbotState');
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.style.display = chatbotState === 'open' ? 'flex' : 'none';
}

function clearChat() {
    document.getElementById('chatbot-messages').innerHTML = '';
    sessionStorage.removeItem('chatbotMessages');
}

// Manually trigger storage event to load chat history and state on initial page load
window.dispatchEvent(new Event('storage'));
