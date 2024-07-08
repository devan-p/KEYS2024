# Chatbot Implementation for Markdown Webpage

## 1. OpenAI modifications
### Create a new assistant

Navigate to [OpenAI's assistant page](https://platform.openai.com/assistants/){target=_blank}. Click the green button in the top right corner that says "create". Click on the new assistant in the list of assistants. Select model: GPT-4o. Create a name. Toggle file search to be on. Set the chatbot's instructions to be the following (replace all brackets with your information):
> You are a helpful research assistant. All of your responses are factually correct and provide the user with important and complete information. Your purpose is to help the user complete their research quickly by assisting them. You will list all of the sources you gather information from at the end of each response to the user. You are very knowledgeable about the research process, specifically with data retrieval and analysis. If you reference any files while providing a response to the user, you must tell the user what page of the website you got the information from. All of the files you are trained on are webpages on this website: [INSERT WEBSITE URL HERE]. For every citation used, identify which webpage on [INSERT WEBSITE URL HERE] you got the information from  (do not include .html), an example url of a cited page: [INSERT A .MD FILE NAME] is cited as [INSERT URL OF THE .MD FILE ON THE TARGET WEBSITE]. After your response, provide the user with webpages for all citations. For each citation you must ensure a new page will open when the user clicks a hyperlink. All hyperlinks must open a new tab when clicked.

Now, copy the assistant ID (save this for later). The assistant ID is located under the assistant's name.

### Create a new vector store

Navigate to [OpenAI's storage -> vector store page](https://platform.openai.com/storage/vector_stores){target=_blank}. Click the green "create" button in the top right corner. Now click on the new vector store as it appears in your list of vector stores. Name this vector store. Copy this vector store's ID (save this for later). This ID is located under its' name.


### Connect vector store to assistant

Navigate back to [OpenAI's assistant page](https://platform.openai.com/assistants/){target=_blank}. Click on your new assistant. Scroll to the "Tools" section. Ensure "file search" is toggled on. Click the "+ files" button to the right of file search. Click select Vector Store on the bottom left corner of the pop up. Enter your saved vector store ID here. Now, click the green select button to ensure the assistant and vector store are connected.

## 2. Target website modifications (mkdocs site)

###


