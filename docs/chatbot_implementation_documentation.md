# Chatbot Implementation for Markdown Webpage

## OpenAI modifications
### Create a new assistant

Navigate to [OpenAI's assistant page](https://platform.openai.com/assistants/){target=_blank}. Click the green button in the top right corner that says "create". Click on the new assistant in the list of assistants. Select model: GPT-4o. Create a name. Toggle file search to be on. Set the chatbot's instructions to be the following (replace all brackets with your information):
> You are a helpful research assistant. All of your responses are factually correct and provide the user with important and complete information. Your purpose is to help the user complete their research quickly by assisting them. You will list all of the sources you gather information from at the end of each response to the user. You are very knowledgeable about the research process, specifically with data retrieval and analysis. If you reference any files while providing a response to the user, you must tell the user what page of the website you got the information from. All of the files you are trained on are webpages on this website: [INSERT WEBSITE URL HERE]. For every citation used, identify which webpage on [INSERT WEBSITE URL HERE] you got the information from  (do not include .html), an example url of a cited page: [INSERT A .MD FILE NAME] is cited as [INSERT URL OF THE .MD FILE ON THE TARGET WEBSITE]. After your response, provide the user with webpages for all citations. For each citation you must ensure a new page will open when the user clicks a hyperlink. All hyperlinks must open a new tab when clicked.

Now, copy the assistant ID (save this for later). The assistant ID is located under the assistant's name.

### Create a new vector store

Navigate to [OpenAI's storage -> vector store page](https://platform.openai.com/storage/vector_stores){target=_blank}. Click the green "create" button in the top right corner. Now click on the new vector store as it appears in your list of vector stores. Name this vector store. Copy this vector store's ID (save this for later). This ID is located under its' name.


### Connect vector store to assistant

Navigate back to [OpenAI's assistant page](https://platform.openai.com/assistants/){target=_blank}. Click on your new assistant. Scroll to the "Tools" section. Ensure "file search" is toggled on. Click the "+ files" button to the right of file search. Click select Vector Store on the bottom left corner of the pop up. Enter your saved vector store ID here. Now, click the green select button to ensure the assistant and vector store are connected.

## VM setup (chatbot server)

Follow [these instructions](https://github.com/cyverse/cyverse-gpt){target=_blank} by Dr. Swetnam

Create a "python" folder within "src" /home/ubuntu/github/cyverse-gpt/src/python (IMPORTANT: file path may not be exactly accurate, "cyverse-gpt" might be different). Within your python folder, create a file called "chatbot_update.py". Add the following code to this new file. Replace the following: "OpenAi_API_KEY" "Assistant_APIKEY" "Vector_Store_ID" from chatbot_update.py with their real values. Create a folder called "cloned_repo" within "github" (("~/github/cloned_repo/). This is going to be the directory of your target website. This is used to download your github repo containing your website to train the chatbot on. Replace "https://github.com/CyVerse-learning-materials/foss.git" with your https repo URL [instructions](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository){target=_blank}. Replace "CyVerse-learning-materials/foss" with your repository name/path. Replace "~/github/cloned_repo/CyVerse-learning-materials/foss/docs" with the desired file path within the cloned repo (path of files to train chatbot on).

### chatbot_update.py:
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



## Target website modifications (mkdocs site)

### Overrides folder

On your mkdocs website's code, navigate to your overrides directory (/docs/overrides). Create a file called "iframechatbot.html". Ensure you have a main.html file created. Update both files with the following code (IMPORTANT: you will need to change the URL from "https://chat-qa.cyverse.org/" to your chatbot URL in the iframechatbot.html file):

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
{% include "iframechatbot.html" %}  

{% endblock content %}
```

#### iframechatbot.html:
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

### mkdocs.yml changes:

Ensure your mkdocs.yml file has the following:

```yml
theme:
  custom_dir: 'docs/overrides'
```