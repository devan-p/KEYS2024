# KEYS Assignments 

[Assignment 1](assignment1.md)

[Assignment 2](assignment1.md)

[Assignment 3](assignment1.md)

[Assignment 4](assignment1.md)

[Assignment 5](assignment1.md)

[Assignment 6](assignment1.md)

[Poster](poster.md)


<!-- Include the chatbot HTML -->
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