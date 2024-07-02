# Chatbot Documentation Cyverse FOSS

> This is a fully functional implementation of the chatbot. This chatbot appeared as an icon which could be toggled on/off. When it was toggled on, a chatbot pop-up would appear in the bottom right corner of the page. This chatbot was able to get input text from the user, process it, and output text back to the user. The chatbot cited an uploaded vector store to cite information. This is connected to [Cyverse's FOSS Learning Workshop on my github pages](https://devan-p.github.io/Cyverse-learning-materials-foss/){target=_blank}. The chatbot is trained on the website's files. In all the chatbot's responces, it provides citations and hyperlinks to the webpages which it got information from.

## Code Documentation

### Implementation Code on Target Website

#### File Structure

```
Cyverse-learning-materials-foss/
├── .DS_Store
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── workflows/
├── docs/
│   ├── 00_basics.md
│   ├── 01_intro_open_sci.md
│   ├── 02_project_management.md
│   ├── 03_managing_data.md
│   ├── 04_documentation_communication.md
│   ├── 05_version_control.md
│   ├── 06_reproducibility_i.md
│   ├── 07_reproducibility_ii.md
│   ├── 08_reproducibility_III.md
│   ├── 09_reproducibility_IV.md
│   ├── 10_hpc.md
│   ├── 11_sql_duckdb.md
│   ├── assets/
│   ├── code_of_conduct.md
│   ├── documentation/
│   ├── final_project/
│   ├── glossary.md
│   ├── iframechatbot.md
│   ├── index.md
│   └── overrides/
│       ├── main.html├
│       └── iframechatbot.html
```


#### main.html

```html
{% extends "base.html" %}

{% block content %}
{% if page.nb_url %}
    <a href="{{ page.nb_url }}" title="Download Notebook" class="md-content__button md-icon">
        {% include ".icons/material/download.svg" %}
    </a>
{% endif %}

{{ super() }}
{% include "iframechatbot.html" %}  

{% endblock content %} 
```
> All of main.html is shown.  

#### iframechatbot.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot</title>
    <style>
        /* Add your CSS here */
        .chat-icon {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: #0085C3;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 24px;
            cursor: pointer;
            z-index: 1000;
        }

        .chat-popup {
            display: none;
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 350px;
            height: 500px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            background-color: #FFFFFF; /* Add this line */
        }

        .chat-popup iframe {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 5%;
        }

        .chat-popup .close-btn {
            position: absolute;
            top: 1px;
            right: 1px;
            background-color: red;
            color: white;
            border: none;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 1001;
        }
    </style>
</head>
<body>

<div class="chat-icon" id="chatIcon">💬</div>
<div class="chat-popup" id="chatPopup">
    <button class="close-btn" id="closeBtn">x</button>
    <iframe src="https://chat-qa.cyverse.org/" class="custom-iframe"></iframe>
</div>

<script>
    // Function to set up event listeners
    function setUpEventListeners() {
        const chatIcon = document.getElementById("chatIcon");
        const chatPopup = document.getElementById("chatPopup");
        const closeBtn = document.getElementById("closeBtn");

        if (!chatIcon || !chatPopup || !closeBtn) {
            return;
        }

        // Function to toggle the chat popup
        function toggleChatPopup() {
            const isChatOpen = localStorage.getItem('isChatOpen') === 'true';
            if (isChatOpen) {
                chatPopup.style.display = 'block';
            } else {
                chatPopup.style.display = 'none';
            }
        }

        // Event listener for chat icon click
        chatIcon.addEventListener("click", function() {
            chatPopup.style.display = 'block';
            localStorage.setItem('isChatOpen', 'true');
        });

        // Event listener for close button click
        closeBtn.addEventListener("click", function() {
            chatPopup.style.display = 'none';
            localStorage.setItem('isChatOpen', 'false');
        });

        // Initialize chat popup state on page load
        toggleChatPopup();
    }

    document.addEventListener("DOMContentLoaded", setUpEventListeners);

    // Use MutationObserver to detect changes in the DOM and reapply event listeners
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                setUpEventListeners();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
</script>

</body>
</html>
```

> All of iframechatbot.html is shown. This script includes .css .js and .html to manage the chatbot's functionality. The HTML document defines a basic structure with a chat icon and a chat popup window. The chat icon (div with class chat-icon) is always visible and located at the bottom-right corner of the page. The chat popup (div with class chat-popup) contains a close button (button with class close-btn) and an iframe that loads a chat application from a specified URL. The chat icon is styled as a fixed circular button with a blue background and a white chat emoji. The chat popup is styled to be initially hidden, fixed in position, and has a white background with a shadow for a lifted appearance. The iframe within the chat popup takes up the entire popup area. The close button is styled as a small, red circular button positioned at the top-right corner of the chat popup. The JavaScript code manages the visibility of the chat popup and the state of the chat. Event listeners are set up for the chat icon and close button to toggle the visibility of the chat popup. The state of the chat popup (open or closed) is stored in localStorage to maintain the state across page reloads. The MutationObserver monitors the DOM for changes and reapplies event listeners if necessary.



### Chatbot Updater Script
```python
from dotenv import load_dotenv
load_dotenv()
import os
import asyncio
import openai
import git
import shutil



# Delete the Cloned Repo directory if it exists
keys_directory = os.path.expanduser("~/github/cloned_repo/CyVerse-learning-materials")
if os.path.exists(keys_directory):
    shutil.rmtree(keys_directory)

# CLONE A REPO IN A FILE PATH
# Ensure the parent directory exists
clone_directory = os.path.expanduser("~/github/cloned_repo")
os.makedirs(clone_directory, exist_ok=True)
# Clone the repository for data
repo_url = "https://github.com/CyVerse-learning-materials/foss.git"
clone_directory_path = os.path.join(clone_directory, "CyVerse-learning-materials/foss")
git.Repo.clone_from(repo_url, clone_directory_path)

openai_API_KEY = "OpenAi_API_KEY"
openai_client = openai.OpenAI(api_key=openai_API_KEY)
files_on_openai = openai_client.files.list()
assistant = openai_client.beta.assistants.retrieve("Assistant_APIKEY")

# CREATE VECTOR STORE
# vector_store = openai_client.beta.vector_stores.create(name="ChatBot Vector Store v1")

# Retrieve vector store
vector_store_id = "Vector_Store_ID"
vector_store = openai_client.beta.vector_stores.retrieve(vector_store_id)

# RETRIEVE ALL FILE DATA WITHIN RETRIEVED VECTOR STORE
vector_store_files = openai_client.beta.vector_stores.files.list(vector_store_id=vector_store.id)

# DELETE ALL FILES FROM VECTOR STORE
for file in vector_store_files.data:
    file_id = file.id
    # print(f"Deleting file with id: {file_id}")
    # openai_client.beta.vector_stores.files.delete(vector_store_id=vector_store.id, file_id=file_id)
    openai_client.files.delete(file_id=file_id)
    # print(f"Deleted file with id: {file_id}")

# ADD FILES TO VECTOR STORE
# Specify the directory path
directory = "~/github/cloned_repo/CyVerse-learning-materials/foss/docs"
directory = os.path.expanduser(directory)
# Get all files in the directory
file_paths = [os.path.join(directory, file) for file in os.listdir(directory) if file.endswith(".md")]
# Ensure none of the files are empty
file_paths = [path for path in file_paths if os.path.getsize(path) > 0]
# this is the file path of the file to be uploaded
file_streams = [open(path, "rb") for path in file_paths]
# this is the file to be uploaded
file_batch = openai_client.beta.vector_stores.file_batches.upload_and_poll(
  vector_store_id=vector_store.id, files=file_streams
)
for file_stream in file_streams:
    file_stream.close()

# UPDATE ASSISTANT TO USE THE RETRIEVED VECTOR STORE
assistant = openai_client.beta.assistants.update(
  assistant_id=assistant.id,
  tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}},
)

# FILE SETUP 

# pip install openai
# pip install openai python-dotenv -U -q
# make sure python is setup
# make sure all file directories are correct
```

> This python script is hosted on a VM and is ran regularly via a Cron Job. This script performs several tasks involving cloning a Git repository, managing OpenAI API interactions, and updating a vector store. Initially, it loads environment variables and sets up necessary imports. It then deletes any existing cloned repository directory before cloning a specified Git repository into a defined file path. The script initializes the OpenAI client using an API key and retrieves the assistant and vector store information. It proceeds to list and delete all files in the specified vector store, ensuring it is empty. Next, it identifies markdown files in the cloned repository, uploads them to the vector store, and updates the OpenAI assistant to use this vector store. The final steps include ensuring the correct setup of required Python packages and validating the file directories.


### Chatbot VM

The [chat service](https://github.com/cyverse/cyverse-gpt){target=_blank} is connected to Open AI's API is hosted on a VM.
