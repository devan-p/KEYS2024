# Chatbot Documentation

## Code Documentation

### JavaScript

```js
document.addEventListener('DOMContentLoaded', function() {
    initializeChatbot();
```
> When the webpage is loaded, the initializeChatbot() is called.

```js
document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});
```
> Retrieves chatbot-input element. While the user is in the chatbot-input element, the enter key will not create a new line. Instead, the enter key will run the function sendMessage().

```js
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
```
> Checks for url changes. When the active url changes (occurs when the user goes to a different page within the website), the chatbot's history and state is updated. This ensures that the current chatbot history will be displayed regardless of the page you're on. This also ensures the chatbot remains minimized or open depending on the user's preference on any page.

```js
window.addEventListener('storage', function(event) {
    if (event.key === 'chatbotMessages' || event.key === 'chatbotState') {
        loadChatHistory();
        loadChatbotState();
    }
});
```
> When the chatbot receives or sends a message or when the user minimizes or opens the chatbot, the session storage is updated. This method updates the current chatbot history and state whenever a change is made to session storage.

```js
function initializeChatbot() {
    loadChatHistory();
    loadChatbotState();

    const messagesContainer = document.getElementById('chatbot-messages');
    const observer = new MutationObserver(saveChatHistory);
    observer.observe(messagesContainer, { childList: true, subtree: true });
}
```
> This function loads the current chatbot history and state. It monitors changes to the chatbot messages container. When there is a change this function calls saveChatHistory

```js
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    const isOpen = chatbotWindow.style.display === 'flex';
    chatbotWindow.style.display = isOpen ? 'none' : 'flex';
    sessionStorage.setItem('chatbotState', isOpen ? 'closed' : 'open');
}
```
> This function changess the chatbot window to either be displayed or hidden. Whenever a change is made to the chatbot window's state, it is stored in session storage

```js
function closeChatbot() {
    document.getElementById('chatbot-window').style.display = 'none';
    sessionStorage.setItem('chatbotState', 'closed');
}
```
> This function hides the chatbot window and updates the chatbot window's state in session storage.

```js
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
```
> This function takes a user's input to the chatbot, sends the input to appendMessage, sends a template bot response to appendMessage, and then saves chat history.

```js
function appendMessage(message, sender) {
    const messages = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender.charAt(0).toUpperCase() + sender.slice(1)}: ${message}`;
    messageElement.className = sender;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
}
```
> This function accepts messages and their sender. It formats the inputs to display properly in the chatbot.

```js
function saveChatHistory() {
    const messages = document.getElementById('chatbot-messages').innerHTML;
    sessionStorage.setItem('chatbotMessages', messages);
}
```
> This function saves the current chatbot history to session storage. This is used to maintain the same chatbot history on different pages of the same webpage.


```js
function loadChatHistory() {
    const messages = sessionStorage.getItem('chatbotMessages');
    if (messages) {
        document.getElementById('chatbot-messages').innerHTML = messages;
    }
}
```
> This function loads the stored chat history from session storage. If the chat history is not null (empty), the chatbot's display will be populated with its' chat history.

```js
function loadChatbotState() {
    const chatbotState = sessionStorage.getItem('chatbotState');
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.style.display = chatbotState === 'open' ? 'flex' : 'none';
}
```
> This function retrieves the saved chatbot state from session storage. Then, it gets the chatbot window element. It sets the chatbot window element to be displayed or hidden depending on the chatbot state it retrieved from session storage.

```js
function clearChat() {
    document.getElementById('chatbot-messages').innerHTML = '';
    sessionStorage.removeItem('chatbotMessages');
}
```
> This function clears the chatbot's displayed messages. Then, it deletes all the chatbot message history from session storage.

```js
window.dispatchEvent(new Event('storage'));
```
> This line checks for changes to session storage. Whenever there is a change, all pages on the website will reflect what is in storage. This ensures continuity between pages.  



### HTML

```html
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
        <div id="chatbot-buttons">
            <button onclick="sendMessage()">Send</button>
            <div id="divider"></div>
            <button id="clear-button" onclick="clearChat()">Clear Chat</button>
        </div>
    </div>
</div>
```
> This HTML code intializes the necessary components of the chatbot. It creates the chatbot icon which toggles the chatbot's visibility. It creates the chatbot window which collects the user input, displays chat history, and has buttons for sending a message and clearing chat history. Each interactive element is associated with a JavaScript function to handle user interactions.  


### CSS

```css
<style>
    #chatbot-icon {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: #4051B5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        color: white;
    }

    #chatbot-window {
        display: none;
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 300px;
        height: 400px;
        background-color: grey;
        border: 1px solid #4051B5;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
    }

    #chatbot-header {
        background-color: #4051B5;
        color: white;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px; /* Set the height of the header */
    }

    #chatbot-messages {
        flex: 1;
        padding: 10px;
        overflow-y: auto;
        border-top: 1px solid #4051B5;
    }

    #chatbot-input {
        border: none;
        border-top: 1px solid black;
        padding: 10px;
        width: calc(100% - 60px);
    }

    #chatbot-buttons {
        display: flex;
        justify-content: space-between;
        padding: 0; /* Remove padding to make buttons full width */
    }

    #chatbot-buttons button {
        border: none;
        background-color: #4051B5;
        color: white;
        cursor: pointer;
        flex: 1;
        height: 50px; /* Match the height of the header */
    }

    #chatbot-buttons #divider {
        width: 2px;
        background-color: black;
    }

    #clear-button {
        background-color: red;
    }
</style>
```
> This provides a user-friendly visualization of the chatbot.  



## Chatbot Implementation  



### File Structure

> File Structure:  

```
.
├── .github/
│   └── workflows/
│       └── publish-docs.yml
├── .gitignore
├── docs/
│   ├── acknowledgments.md
│   ├── assignment1.md
│   ├── assignment2.md
│   ├── assignment3.md
│   ├── assignment4.md
│   ├── assignment5.md
│   ├── assignment6.md
│   ├── github.md
│   ├── index.md
│   ├── keysassignments.md
│   ├── logbook.md
│   ├── overrides/
│   │   ├── chatbot.html
│   │   └── main.html
│   ├── poster.md
│   ├── promptengineering.md
│   └── references.md
├── mkdocs.yml
├── enviornment.yml
├── LICENSE
├── README.md
└── requirements.txt  
```    

### Necessary Files & Code:  

#### mkdocs.yml:  

```yml
theme:
  custom_dir: 'docs/overrides'
```
> The rest of mkdocs.yml is not shown.  

#### main.html:  

```html
{% extends "base.html" %}

{% block content %}
{% if page.nb_url %}
    <a href="{{ page.nb_url }}" title="Download Notebook" class="md-content__button md-icon">
        {% include ".icons/material/download.svg" %}
    </a>
{% endif %}

{{ super() }}
{% include "chatbot.html" %}
{% endblock content %}
```
> All of main.html is shown.  

#### chatbot.html:

```html
chatbot.html:
<style>
    #chatbot-icon {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: #4051B5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        color: white;
    }

    #chatbot-window {
        display: none;
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 300px;
        height: 400px;
        background-color: grey;
        border: 1px solid #4051B5;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
    }

    #chatbot-header {
        background-color: #4051B5;
        color: white;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px; /* Set the height of the header */
    }

    #chatbot-messages {
        flex: 1;
        padding: 10px;
        overflow-y: auto;
        border-top: 1px solid #4051B5;
    }

    #chatbot-input {
        border: none;
        border-top: 1px solid black;
        padding: 10px;
        width: calc(100% - 60px);
    }

    #chatbot-buttons {
        display: flex;
        justify-content: space-between;
        padding: 0; /* Remove padding to make buttons full width */
    }

    #chatbot-buttons button {
        border: none;
        background-color: #4051B5;
        color: white;
        cursor: pointer;
        flex: 1;
        height: 50px; /* Match the height of the header */
    }

    #chatbot-buttons #divider {
        width: 2px;
        background-color: black;
    }

    #clear-button {
        background-color: red;
    }
</style>

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
        <div id="chatbot-buttons">
            <button onclick="sendMessage()">Send</button>
            <div id="divider"></div>
            <button id="clear-button" onclick="clearChat()">Clear Chat</button>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        initializeChatbot();

        document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
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
</script>
```
> All of chatbot.html is shown.  