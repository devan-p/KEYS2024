# Logbook


## Training Week


### 6/3/2024

Learned about science literacy, research posters, and scientific writing. Met my KEYS group and mentor. Spent a few hours with Dr. Hilgert reviewing command line scripting in the afternoon.


### 6/4/2024

Spent the morning learning how to create a research poster and about presentatin skills. Listened to a lunch lecture about reproducible research. Learned about and practiced remote computing in the afternoon using University of Arizona's HPC.


### 6/5/2024

Today I had KEYS training in the morning and late afternoon. I met with Dr. Swetnam to discuss project options, summer goals, and next week's plan. I also got introduced to cyverse data commons and made an account.


### 6/6/2024

Learned how to manipulate and visualize data in excel. Listened to Dr. Swetnam's lecture about AI in research. Participated in an introduction to R/R-studio. Learned about image analysis using imageJ. Read a research paper on science literacy for discussion tomorrow.


### 6/7/2024

Spent the morning discussing a research paper on science literacy. Joined my KEYS crew meeting. Completed my training week evaluation and debrief.  


## KEYS 


### 6/10/2024

Morning stand up call, discussed our plans for today and setup GPT-4o access. Updated my logs for training week. Researched mkdocs chatbot integration. Used GPT to generate code to integrate a chatbot into my mkdocs site. Struggled with getting the chat box to remain closed/open between different pages. Eventually, I figured it out and then ran into some issues with git version control and had to go to a previous commit. Eventually finished most of the UI for the chatbot. Researched more prompt engineering and finished my first poster draft, and introduction to my lab assignment.

GPT-4o
> System: You are a helpful assistant who tells specific instructions and details. You are extremely knowledgable about mkdocs, coding, websites, and ai chat bots. You know exactly how to integrate an AI chatbot into a mkdocs website. When asked any question, you must provide a full and complete solution. you are helping a user with this website: https://devan-p.github.io/KEYS2024/
> 
> Prompt: I need to add an ai chatbot into the website, https://devan-p.github.io/KEYS2024/. The website has this directory: https://github.com/devan-p/KEYS2024. First, tell me a process of how i will add an open ai chatbot to my website. Second, tell me what folders i need to create, and what files i need to make, and exactly what code goes in those files. Third, tell me exactly how I get the chatbot to be displayed to the user. Fourth, tell me exactly how i make sure the user can interact with the chatbot.
>
>> Output: Sure! Adding an AI chatbot to your MkDocs-based site involves several key steps, including setting up necessary files and configuring your MkDocs site to load and display the chatbot. Here's a comprehensive guide:
>>
>> Step 1: Set Up OpenAI API Access
>> First, ensure you have access to the OpenAI API and have your API key ready. You can sign up and get your API key from the OpenAI website.
>>
>> Step 2: Directory and File Setup
>> You'll add the chatbot integration files to your MkDocs website directory. Specifically, you'll need to create a directory for the chatbot functionality and add the necessary HTML, JavaScript, and CSS files.
>>
>> Folders and Files Needed:
>> 1. **Create `chatbot` directory**:
>>   - Inside your MkDocs directory, create a new directory named `chatbot`.
>>   
>> 2. **Create `index.html` file inside the `chatbot` directory**:
>>   ```html
>>   <!-- chatbot/index.html -->
>>   <div id="chatbot">
>>     <div id="chat-window">
>>       <div id="messages"></div>
>>       <input type="text" id="user-input" placeholder="Type a message..."></input>
>>       <button id="send-button">Send</button>
>>  ```







<!-- [Daily Logs] -- short (5-6 sentence) summary of your daily activities that includes: (1) what was the plan?, (2) what actually happend?, (3) what could you have done better?, (4) how you will approach this differently next time?  -->


