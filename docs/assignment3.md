## Assignment 3: Materials and Methods 

To implement the AI chatbot on the target website, I’ve written javascript, css, and html code to display a chatbot on every webpage.  The chatbot is running on a VM at CyVerse, but it is embedded into the target website with an iFrame. To update the GPT-4o based chatbot with relevant data, I am using a Cron Job which executes a python script that updates the chatbot’s knowledge base. This interacts with OpenAI’s API and modifies a vector store. I used a Cron Job to control this script because the Cron Job allows it to run daily at midnight.

