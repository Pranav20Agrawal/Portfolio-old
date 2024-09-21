const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null;
const API_KEY = "PASTE-YOUR-API-KEY";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        })
    };

    if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi") || userMessage.toLowerCase().includes("hey")) {
        messageElement.textContent = "Hi there! How can I assist you?";
    } else if (userMessage.toLowerCase().includes("how are you") || userMessage.toLowerCase().includes("whats up")) {
        messageElement.textContent = "I'm just a computer program, but thanks for asking! How can I help you today?";
    } else if (userMessage.toLowerCase().includes("what is your name") || userMessage.toLowerCase().includes("whats up")) {
        messageElement.textContent = "I don't have a name, but you can call me ChatBot. How can I assist you?";
    } else if (userMessage.toLowerCase().includes("how does this work") || userMessage.toLowerCase().includes("what do you do")) {
        messageElement.textContent = "This chatbot is powered by OpenAI's GPT-3.5 Turbo model. Ask me anything!";
    } else if (userMessage.toLowerCase().includes("tell me a joke")) {
        messageElement.textContent = "Why don't scientists trust atoms? Because they make up everything!";
    } else if (userMessage.toLowerCase().includes("what is the meaning of life")) {
        messageElement.textContent = "The meaning of life is a complex philosophical question. What do you think it is?";
    } else if (userMessage.toLowerCase().includes("favorite color") || userMessage.toLowerCase().includes("your favourite color")) {
        messageElement.textContent = "I don't have a favorite color, but I can help you with any questions you have!";
    } else if (userMessage.toLowerCase().includes("how old are you")) {
        messageElement.textContent = "I'm just a program, so I don't have an age. How can I assist you?";
    } else if (userMessage.toLowerCase().includes("where are you from")) {
        messageElement.textContent = "I'm a virtual assistant, so I don't have a physical location. What can I do for you?";
    } else if (userMessage.toLowerCase().includes("goodbye") || userMessage.toLowerCase().includes("bye")) {
        messageElement.textContent = "Goodbye! If you have more questions, feel free to ask.";
    } else if (userMessage.toLowerCase().includes("thank you") || userMessage.toLowerCase().includes("thanks")) {
        messageElement.textContent = "You're welcome! If you need further assistance, let me know.";
    } else if (userMessage.toLowerCase().includes("who created you")) {
        messageElement.textContent = "I was created using OpenAI's GPT-3.5 Turbo model. How can I assist you?";
    } else if (userMessage.toLowerCase().includes("what's the capital of France")) {
        messageElement.textContent = "The capital of France is Paris.";
    } else if (userMessage.toLowerCase().includes("what's the capital of India") || userMessage.toLowerCase().includes("capital of India")) {
        messageElement.textContent = "The capital of Inda is New Delhi.";
    } else if (userMessage.toLowerCase().includes("recommend a music genre")) {
        messageElement.textContent = "I recommend trying out jazz. It's a versatile and soothing genre.";
    } else if (userMessage.toLowerCase().includes("how does photosynthesis work")) {
        messageElement.textContent = "Photosynthesis is the process by which plants convert light energy into chemical energy. It involves the absorption of sunlight, carbon dioxide, and water to produce glucose and oxygen.";
    } else if (userMessage.toLowerCase().includes("tell me a fun fact")) {
        messageElement.textContent = "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!";
    } else if (userMessage.toLowerCase().includes("how to make a good cup of coffee")) {
        messageElement.textContent = "To make a good cup of coffee, start with freshly ground beans, use clean and filtered water, and maintain the right water-to-coffee ratio. Experiment with different brewing methods to find your perfect cup!";
    } else if (userMessage.toLowerCase().includes("explain the concept of black holes")) {
        messageElement.textContent = "Black holes are regions in space where gravity is so strong that nothing, not even light, can escape. They are formed from the remnants of massive stars that have exhausted their nuclear fuel.";
    } else if (userMessage.toLowerCase().includes("recommend a productivity technique")) {
        messageElement.textContent = "Consider trying the Pomodoro Technique. It involves working in focused intervals (typically 25 minutes), followed by a short break. Repeat this cycle to enhance productivity.";
    } else if (userMessage.toLowerCase().includes("who is the president of the United States")) {
        messageElement.textContent = "As of my last knowledge update in January 2022, the President of the United States is Joe Biden. Please check for the most recent information.";
    } else if (userMessage.toLowerCase().includes("explain the concept of blockchain")) {
        messageElement.textContent = "Blockchain is a decentralized and distributed ledger technology that records transactions across multiple computers in a secure and transparent manner. It is the underlying technology for cryptocurrencies like Bitcoin.";
    } else if (userMessage.toLowerCase().includes("what's the largest mammal on Earth")) {
        messageElement.textContent = "The blue whale holds the title for the largest mammal on Earth. Adult blue whales can reach lengths of over 100 feet and weigh as much as 200 tons!";
    } else {
        messageElement.textContent = "I don't know how to respond to this information. If you have any further queries, please visit OpenAI's ChatGPT: https://chat.openai.com/";
    }
    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            messageElement.textContent = data.choices[0].message.content.trim();
        })
        .finally(() => {
            chatbox.scrollTo(0, chatbox.scrollHeight);
        });
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

function emaildata(){
    var existingdata = localstorage.getItem('formData');
    var formData = (existingdata != null) ? JSON.parse(existingdata) : [];
    const dataarray = formdata.map(item => Object.value(item));
    const csv = dataarray.map(row => row.join(',')).join(`\n`);
    const datauri = `data:text/csv;charset=utf-8,` + encodeURIComponent(csv);
    window.open(datauri);
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const clockElement = document.getElementById('clock');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Strive not to be a success, but rather to be of value. - Albert Einstein",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "The purpose of our lives is to be happy. - Dalai Lama",
    "Do not wait to strike till the iron is hot, but make it hot by striking. - William Butler Yeats",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
    "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. - Roy T. Bennett",
    "It's not whether you get knocked down, it's whether you get up. - Vince Lombardi",
    "If you want to achieve greatness stop asking for permission. - Anonymous",
    "Don't be afraid to give up the good to go for the great. - John D. Rockefeller",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Success is stumbling from failure to failure with no loss of enthusiasm. - Winston S. Churchill",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
    "Your attitude, not your aptitude, will determine your altitude. - Zig Ziglar"
];

let currentQuoteIndex = 0;

function displayQuote() {
    const quoteTextElement = document.getElementById('quote-text');
    quoteTextElement.textContent = quotes[currentQuoteIndex];
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
}
displayQuote();
setInterval(displayQuote, 3000);

document.getElementById("downloadButton").addEventListener("click", function () {
    var fileUrl = "/Resume_Pranav_Agrawal.pdf";
    var anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = "my_resume.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setTimeout(function () {
        document.body.removeChild(anchor);
    }, 500);
});