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


### 6/11/2024

Joined morning standup call. Updated Assignment 1 page with my KEYS introduction assignment. I spent most of the day working on the chatbot. I made the IU look better and worked on the actual chat functionality. I got the bot to recieve and send messages to the user. I tried getting the chatbot to appear on all the mkdocs pages of my website, however, I kept running into problems.


### 6/12/2024

This morning we had science literacy seminars. We learned about oncology and dentistry. After our lectures, we discussed the introduction portion of our posters (what to do and not to do). I spend the afternoon trying to figure out how to get my chatbot to appear on every page of the website instead of just the markdown pages I add html to. I talked with Dr. Swetnam about this problem and he shared some resources with me: [Chat bot in website](https://github.com/CyVerse-learning-materials/cyverse_mooc/tree/mkdocs-usa){target=_blank}, [CyVerse GPT API Website](https://github.com/cyverse/cyverse-gpt/tree/main){target=_blank}. I spent the rest of the afternoon reading aboout embedding .js into my website and Open AI's API. I also learned about Github's secret keys and how to add API keys without sharing them publicly.


### 6/13/2024

I met with Dr. Swetnam this morning and we discussed methods to embed the chatbot into a website. I added the chatbot to my website by creating a chatbot.css, chatbot.js, and chatbot.html file. This created some issues because the .css would not render on all of my webpages. I then added all my chatbot code into docs/overrides/main.html. I ran into more issues. If the user minimized the chatbot on one page it would not stay minimized as the user explored more pages on the website. I resolved this by creating functions that would stored the "chatbotState" in session storage to ensure the chatbot would remain open/closed depending on the user's needs. I also had an issue with chat history being cleared whenever the user switched pages within the website. I resolved this by storing chat history in session Storage. This led to another issue: the chat history would not appear unless the user refreshed the page. This was caused by the website preloading all its' pages when the user first entered the site, therefore the chatbot had no chat history whenever the user went to a new page. I attempted to resolve this by using different storage methods (local storage and session storage) which was recommended to me by GPT-4o. This did not work and created more problems - the chat history would not appear unless the webpage was refreshed and when it was refreshed the chat history would get duplicated or tripled. I tried working with Github Copilot and GPT-4o but neither created a working solution (many of their "solutions" worsened the problem because they attempted to create new ways to add the history into the chatbot without having to refresh the page which ultimately led to the chat history being quadrupled and exponentially increased). This often resulted in the page taking an extended time to load or not loading at all. I realized a better solution to this problem (chat history not appearing unless you manually refreshed the page) would be to update chat history whenever the url changed (this only occurs when the user went to a different page). [I prompted GPT-4o with this idea and my code.](promptengineering.md){target=_blank} It gave me a working main.html file which had the functionality I needed.


### 6/14/2024

I had my morning stand-up call. Afterwords I worked on making the chatbot's UI more visually appealing. Then, I added [documentation for all of the chatbot's code](github.mb){target=_blank}. Afterwards I completed my [2nd KEYS assignment](assignment2.md){target=_blank}. I got feedback from Dr. Swetnam and made changes to my "Need for study and problem statement" section. I finished drafting the introduction section of my research poster and brainstormed visuals to add to the poster. I submitted this assignment. I also added [documentation of all my chatbot code and how I implemented it](github.md){target=_blank}. I added some updates to [my project's task tracker](https://github.com/orgs/cyverse/projects/8/views/1){target=_blank}. I got the chatbot working with GPT-3.5-turbo locally. I ran into some errors while attempting to use Github secrets for API keys to run it on Github pages.


### 6/17/2024

Today I tried to get the chatbot to with with OpenAI's API publically. I could not accomplish this using github pages and github secrets to store my API key because github pages is a static site. I spent some time with Dr. Swetnam downloading University of Arizona's VPN and connecting to a CyVerse VM. After I got connected I played around with the CyVerse chatbot and tried to learn about how it functioned. I changed the API assistant key to a newer version for GPT-4o. This led to errors caused by a documentation change to v2. I spent some time changing code and attempting to resolve these errors, however, they still remained. I took a break and read documentation about OpenAI's API, and how to effectively use a custom assistant.



### 6/18/2024

Today I got my github pages chatbot to communicate with a custom GPT-4o assistant. I created an iframe on my github site which loaded the CyVerse QA chatbot. I spent some time modifying the UI to be user friendly. Then, I added code to ensure it remained open or closed depending on the user's preference between pages in my website. I spent more time customizing the GPT-4o assistant and learned about using cron jobs with github actions as a method to update the custom GPT-4o assistant's knowledge base. I still need to fix an error with my iframe setup: as the user switches pages within the website, the content of the iframe resets.


### 6/20/2024

We had science seminars this morning. I learned about the method section of our research posters, and how to make an elevator pitch. I spent some time planning how to approach creating a cron job and RAG system to train the GPT-4o assistant on data. I created a local python script to test the RAG functions to manage files attached to our custom assistant. Now, I need to determine where to deploy these scripts.


### 6/21/2024

This morning I met with Dr. Swetnam. He told me methods to ingest website data into OpenAI's Assistant. I started working on documentation for implementing the chatbot. The only step I have left is deleting files from OpenAI's Vector Store. OpenAI charges CyVerse for the files stored on their platform so in order to conserve storage, I need to delete files that are no longer in use when the files get updated. I created a flowchart of my materials and methods and wrote my materials and methods write up. I also made some adjustments to my final poster.


### 6/24/2024, 6/25/2024

I finalized all the code for my project. I tested everything locally: deleting stored repo, cloning repo, uploading data from repo to OpenAI, adding uploaded files to a Vector Store, attaching that vector store to an assistant, having this process run nightly via a cron job. After many small changes, I attached this file to Cyverse-GPT's VM. I initialized a cron job to run the python script nightly. Now, the chat-qa chatbot will be updated with the most recent changes on this website! I read over the code and added documentation for each segment of code. The implementation is now simple -- first, you need to start a new instance of chat-qa, create a new vector store, clone the python-updater file, and update its file paths and API Keys for it to function properly. I also completed my Speaker Question 3 assignment to prepare for tomorrow's science literacy seminars.


### 6/26/2024

Today I cloned CyVerse Learning Foss into my github page. I kept getting an error about its deployment. Eventually, I fixed it and then had an error where my github pages site would display the read me file instead of the webpage. I realized this was because of my github action settings. I fixed this and got the website hosted in my github pages website. I then added my chatbot code and made it fully functional across every page. I modified the chat-qa VM to work with cyverse-learning-foss's data. I changed the python file to continuously update the chatbot's files with a cloned version of the foss repo. I also modified the .css code in my chatbot which made the background transparent. I changed it to make my chatbot background solid white.


### 6/27/2024

This morning I met with Dr. Swetnam to discuss the CyVerse learning foss website. He requested various changes to my CyVerse Learning Foss Website. I changed the chatbox's appearance on my personal website and the learning page to ensure it scales properly on mobile devices. I added a chatbot page to the CyVerse learning foss page. I modified the chatbot's text to appear more similar to the website's text. I made some minor changes to the chatbot's UI including the red close button to be more visually appealing. I researched Lite LLM and briefly discussed it with Edwin Skidmore. He shared an OpenAI API KEY with me to connect my chatbot with Lite LLM. I implemented this key. I also made changes to the chatbot's responses. First, I changed the chatbot's instructions to ensure all materials are cited. I modified the chatbot code to process the chatbot's references to be understandable to the user. I also added some code to modify the references to make them easily found on the target website.


<!-- [Daily Logs] -- short (5-6 sentence) summary of your daily activities that includes: (1) what was the plan?, (2) what actually happend?, (3) what could you have done better?, (4) how you will approach this differently next time?  -->


