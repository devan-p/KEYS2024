# Chatbot Documentation v2

Welcome to the chatbot documentation. This guide will help you set up and use the chatbot efficiently.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Target Website Implementation](#implementation)
11. [License](#license)
12. [Contact Information](#contact-information)

## Introduction

The chatbot is an AI-based system designed to interact with users through natural language conversations. It can be customized and integrated with various platforms to enhance user engagement and provide valuable insights.

## Features

- Natural Language Processing (NLP)
- Context-aware responses
- Easy integration with multiple platforms
- Extensible and customizable

## Implementation

### File Structure:
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

### main.html
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

#### Explanation

This code snippet is a template written in Django's template language. It extends a base template and defines a content block with additional logic and includes. Here's a detailed explanation of each part of the snippet:

```html
{% extends "base.html" %}
```
- This line indicates that the current template extends a base template named `base.html`. It means that the current template will inherit the structure and blocks defined in `base.html`.

```html
{% block content %}
```
- This line starts a block named `content`. The content within this block will replace the corresponding block in the `base.html` template.

```html
{% if page.nb_url %}
    <a href="{{ page.nb_url }}" title="Download Notebook" class="md-content__button md-icon">
        {% include ".icons/material/download.svg" %}
    </a>
{% endif %}
```
- This section checks if the `page.nb_url` variable is defined.
  - If `page.nb_url` is defined, it creates a link (`<a>`) with the `href` attribute set to the value of `page.nb_url`.
  - The link has a title "Download Notebook" and CSS classes `md-content__button` and `md-icon`.
  - Within the link, it includes an SVG icon for the download button from the file `.icons/material/download.svg`.

```html
{{ super() }}
```
- This line calls the parent block's content, ensuring that any content defined in the `content` block of the `base.html` template is included here as well.

```html
{% include "iframechatbot.html" %}
```
- This line includes another template file named `iframechatbot.html` within the `content` block.

```html
{% endblock content %}
```
- This line marks the end of the `content` block.

#### Summary
- **Template Inheritance**: The template extends `base.html`.
- **Content Block**: A block named `content` is defined and populated.
- **Conditional Link**: If `page.nb_url` is set, a download link with an SVG icon is included.
- **Super Call**: The parent `content` block's content is included.
- **Additional Include**: Another template, `iframechatbot.html`, is included within the content block.



### iframechatbot.html
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

#### HTML Structure
- `<!DOCTYPE html>`: Defines the document type.
- `<html lang="en">`: The root element of the HTML document with the language set to English.
- `<head>`: Contains meta information and styles for the document.
  - `<meta charset="UTF-8">`: Sets the character encoding to UTF-8.
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Ensures the page is responsive on all devices.
  - `<title>Chatbot</title>`: Sets the title of the page.
  - `<style>`: Contains CSS styles for the chat icon and popup.

#### CSS Styles
- `.chat-icon`: Styles the chat icon with a fixed position, size, color, and other properties.
- `.chat-popup`: Styles the chat popup with a fixed position, size, shadow, and other properties.
- `.chat-popup iframe`: Styles the iframe inside the chat popup.
- `.chat-popup .close-btn`: Styles the close button inside the chat popup.

#### Body Content
- `<div class="chat-icon" id="chatIcon">💬</div>`: The chat icon element.
- `<div class="chat-popup" id="chatPopup">`: The chat popup element.
  - `<button class="close-btn" id="closeBtn">x</button>`: The close button inside the chat popup.
  - `<iframe src="https://chat-qa.cyverse.org/" class="custom-iframe"></iframe>`: The iframe for the chatbot.

#### JavaScript
- The script sets up event listeners for the chat icon and close button.
- Functions:
  - `setUpEventListeners()`: Sets up event listeners for the chat icon and close button.
  - `toggleChatPopup()`: Toggles the display of the chat popup based on the value stored in `localStorage`.
- Event Listeners:
  - `chatIcon` click: Shows the chat popup and stores the state in `localStorage`.
  - `closeBtn` click: Hides the chat popup and stores the state in `localStorage`.
- `DOMContentLoaded` event: Initializes the chat popup state on page load.
- `MutationObserver`: Observes changes in the DOM and reapplies event listeners if necessary.

#### Summary
This HTML document creates a chatbot interface with a chat icon and a popup chat window. The styling and JavaScript manage the visibility and interactions of these elements.


## VM

### Chatbot Server

The [chat service](https://github.com/cyverse/cyverse-gpt){target=_blank} is connected to Open AI's API is hosted on a VM.

### File Updater Script
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

#### Imports

```python
from dotenv import load_dotenv
load_dotenv()
import os
import asyncio
import openai
import git
import shutil
```
- **Imports**: Necessary modules are imported. `dotenv` is used for loading environment variables from a `.env` file.
- **`load_dotenv()`**: Loads environment variables from a `.env` file into the process's environment.

#### Cloning Git Repositories

```python
# Delete the Cloned Repo directories if they exist
keys_directory = os.path.expanduser("~/github/cloned_repo/CyVerse-learning-materials")
if os.path.exists(keys_directory):
    shutil.rmtree(keys_directory)

keys_directory = os.path.expanduser("~/github/cloned_repo/learning-materials-home")
if os.path.exists(keys_directory):
    shutil.rmtree(keys_directory)
```
- **Remove Existing Directories**: If the directories `~/github/cloned_repo/CyVerse-learning-materials` and `~/github/cloned_repo/learning-materials-home` exist, they are deleted.

```python
# Ensure the parent directory exists
clone_directory = os.path.expanduser("~/github/cloned_repo")
os.makedirs(clone_directory, exist_ok=True)

# Clone the repository for data
repo_url = "https://github.com/CyVerse-learning-materials/foss.git"
clone_directory_path = os.path.join(clone_directory, "CyVerse-learning-materials/foss")
git.Repo.clone_from(repo_url, clone_directory_path)
```
- **Ensure Parent Directory Exists**: Creates the parent directory `~/github/cloned_repo` if it doesn't exist.
- **Clone Repository**: Clones the repository from the provided URL into the specified directory.

```python
clone_directory = os.path.expanduser("~/github/cloned_repo")
os.makedirs(clone_directory, exist_ok=True)

# Clone the repository for data
repo_url = "https://github.com/CyVerse-learning-materials/learning-materials-home.git"
clone_directory_path = os.path.join(clone_directory, "learning-materials-home")
git.Repo.clone_from(repo_url, clone_directory_path)
```
- **Ensure Parent Directory Exists**: Creates the parent directory `~/github/cloned_repo` if it doesn't exist.
- **Clone Repository**: Clones the repository from the provided URL into the specified directory.

#### OpenAI API Setup and File Management

```python
openai_API_KEY = "OPENAI_API_KEY"
openai_client = openai.OpenAI(api_key=openai_API_KEY)
files_on_openai = openai_client.files.list()
assistant = openai_client.beta.assistants.retrieve("ASSISTANT_KEY")
```
- **API Key Setup**: Sets up the OpenAI client with the provided API key.
- **List Files**: Retrieves a list of files from the OpenAI account.
- **Retrieve Assistant**: Retrieves an assistant using the provided assistant ID.

#### Vector Store Management

```python
# vector_store = openai_client.beta.vector_stores.create(name="ChatBot Vector Store v1")
vector_store_id = "VECTORSTORE_ID"
vector_store = openai_client.beta.vector_stores.retrieve(vector_store_id)
```
- **Create Vector Store**: (Commented out) Code to create a new vector store.
- **Retrieve Vector Store**: Retrieves an existing vector store using the provided ID.

#### Manage Files in the Vector Store

```python
vector_store_files = openai_client.beta.vector_stores.files.list(vector_store_id=vector_store.id)

# DELETE ALL FILES FROM VECTOR STORE
for file in vector_store_files.data:
    file_id = file.id
    openai_client.files.delete(file_id=file_id)
```
- **List Files in Vector Store**: Retrieves all files within the vector store.
- **Delete Files**: Deletes all files from the vector store.

#### Add Files to Vector Store

```python
# Specify the directory path
directory = "~/github/cloned_repo/CyVerse-learning-materials/foss/docs"
directory = os.path.expanduser(directory)

# Get all files in the directory
file_paths = [os.path.join(directory, file) for file in os.listdir(directory) if file.endswith(".md")]

# Ensure none of the files are empty
file_paths = [path for path in file_paths if os.path.getsize(path) > 0]

# Upload files to the vector store
file_streams = [open(path, "rb") for path in file_paths]
file_batch = openai_client.beta.vector_stores.file_batches.upload_and_poll(
  vector_store_id=vector_store.id, files=file_streams
)
for file_stream in file_streams:
    file_stream.close()
```
- **Directory Path**: Specifies the directory containing the files to be uploaded.
- **Get Files**: Retrieves all Markdown files in the directory.
- **Ensure Non-Empty Files**: Filters out any empty files.
- **Upload Files**: Uploads the files to the vector store and closes the file streams.

#### Repeat for Another Directory

```python
directory = "~/github/cloned_repo/learning-materials-home/docs"
directory = os.path.expanduser(directory)

file_paths = [os.path.join(directory, file) for file in os.listdir(directory) if file.endswith(".md")]
file_paths = [path for path in file_paths if os.path.getsize(path) > 0]

file_streams = [open(path, "rb") for path in file_paths]
file_batch = openai_client.beta.vector_stores.file_batches.upload_and_poll(
  vector_store_id=vector_store.id, files=file_streams
)
for file_stream in file_streams:
    file_stream.close()
```
- **Directory Path**: Specifies another directory containing files to be uploaded.
- **Get Files**: Retrieves all Markdown files in the directory.
- **Ensure Non-Empty Files**: Filters out any empty files.
- **Upload Files**: Uploads the files to the vector store and closes the file streams.

#### Update Assistant

```python
assistant = openai_client.beta.assistants.update(
  assistant_id=assistant.id,
  tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}},
)
```
- **Update Assistant**: Updates the assistant to use the retrieved vector store for file search.

#### Setup Instructions

To use this script, ensure you have the following:
- **Python**: Installed and set up on your system.
- **Dependencies**: Install the required packages with `pip install openai python-dotenv -U -q`.
- **Environment Variables**: Ensure your `.env` file is correctly configured.
- **Correct File Directories**: Verify that all file paths are accurate.

## Open AI Assistant

Create an assistant, create a vector store, link them together. GPT model: GPT-4o. Chatbot Instructions:
> Instructions: You are a helpful research assistant. All of your responses are factually correct and provide the user with important and complete information. Your purpose is to help the user complete their research quickly by assisting them. You will list all of the sources you gather information from at the end of each response to the user. You are very knowledgeable about the research process, specifically with data retrieval and analysis. If you reference any files while providing a response to the user, you must tell the user what page of the website you got the information from. All of the files you are trained on are webpages on this website: https://foss.cyverse.org/. For every citation used, identify which webpage on https://foss.cyverse.org/ you got the information from (do not include .html), an example url of a cited page: 07_reproducibility_ii is cited as https://foss.cyverse.org/07_reproducibility_II/. After your response, provide the user with webpages for all citations. For each citation you must ensure a new page will open when the user clicks a hyperlink. All hyperlinks must open a new tab when clicked.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact Information

For any queries or issues, please contact:

- **Name**: Devan Patel
- **GitHub**: [devan-p](https://github.com/devan-p)