## Assignment 3: Materials and Methods 

To implement the AI chatbot on the target website, I’ve written javascript, css, and html code to display a chatbot on every webpage.  The chatbot is running on a VM at CyVerse, but it is embedded into the target website with an iFrame. To update the GPT-4o based chatbot with relevant data, I am using a Cron Job which executes a python script that updates the chatbot’s knowledge base. This interacts with OpenAI’s API and modifies a vector store. I used a Cron Job to control this script because the Cron Job allows it to run daily at midnight.

<div class="mermaid">
flowchart TD
    A[Front-End Website embeds chatbot in website via iFrame: .html, .js, .css]
    B[Chatbot Server send/receive dialogue to/from user: .html, .js, .css]
    C[Custom AI Assistant API: relevant files in vector store, GPT-4o]
    D[Cron Job & Python Script daily process: download and process files to train, update vector store, delete old files]

    A --> B
    B --> C
    D --> C
</div>

<script type="module">
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true });
</script>