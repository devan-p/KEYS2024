[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip) [![license](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://opensource.org/licenses/GPL-3.0) 

# Introduction

<this is an invisible comment -- add your orcid id after https://orcid.org/ below>

Author: [Devan Patel]() [![](https://orcid.org/sites/default/files/images/orcid_16x16.png)](https://orcid.org/)

Advisor: [Tyson Lee Swetnam](https://tyson-swetnam.github.io/) [![](https://orcid.org/sites/default/files/images/orcid_16x16.png)](http://orcid.org/0000-0002-6639-7181)

## About

Devan Patel is a rising senior at Basis Scottsdale. During the summer of 2024, he is interning at the University of Arizona through BIO5 Institute's [KEYS program](https://keys.arizona.edu/).

This website follows the [FAIR](https://www.go-fair.org/fair-principles/) and [CARE](https://www.gida-global.org/care) data principles and hopes to help further open science. 

### Main Project

TBD

### Results

TBD

### Daily Logs

[link to daily logs](logbook.md)

<style>
/* Add this CSS to style the chatbot icon and window */
#chatbot-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: #007bff;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

#chatbot-window {
    display: none;
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 300px;
    height: 400px;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
}

#chatbot-header {
    background-color: #007bff;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#chatbot-messages {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    border-top: 1px solid #ddd;
}

#chatbot-input {
    border: none;
    border-top: 1px solid #ddd;
    padding: 10px;
    width: calc(100% - 60px);
}

#chatbot-window button {
    border: none;
    background-color: #007bff;
    color: white;
    padding: 10px;
    cursor: pointer;
}
</style>

<div id="chatbot-icon" onclick="toggleChatbot()">
    <i class="fa fa-comments"></i>
</div>
<div id="chatbot-window">
    <div id="chatbot-header">
        <span>Chat with us!</span>
        <button onclick="closeChatbot()">X</button>
    </div>
    <div id="chatbot-messages"></div>
    <input type="text" id="chatbot-input" placeholder="Type your message..." />
    <button onclick="sendMessage()">Send</button>
</div>

<script src="javascripts/chatbot.js"></script>
