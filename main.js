const chatbot = document.getElementById('chatbot');
const header = document.getElementById('header');
const minimizeBtn = document.getElementById('minimizeBtn');
const chatWindow = document.getElementById('chatWindow');
const inputArea = document.querySelector('.input-area');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
let isDragging = false;
let offsetX, offsetY;
let isMinimized = false;
// Dragging functionality
header.addEventListener('mousedown', (e) => {
    if (e.target === minimizeBtn) return; // Prevent dragging when clicking minimize
    isDragging = true;
    offsetX = e.clientX - chatbot.offsetLeft;
    offsetY = e.clientY - chatbot.offsetTop;
    document.body.style.cursor = 'move';
});
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        chatbot.style.left = (e.clientX - offsetX) + 'px';
        chatbot.style.top = (e.clientY - offsetY) + 'px';
    }
});
document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
});
// Minimize functionality
minimizeBtn.addEventListener('click', () => {
    isMinimized = !isMinimized;
    if (isMinimized) {
        chatbot.classList.add('minimized');
        chatWindow.style.display = 'none';
        inputArea.style.display = 'none';
        minimizeBtn.textContent = '+';
    } else {
        chatbot.classList.remove('minimized');
        chatWindow.style.display = 'block';
        inputArea.style.display = 'flex';
        minimizeBtn.textContent = '–';
    }
});
// Chat functionality
function addMessage(text, sender) {
    const message = document.createElement('div');
    message.classList.add('message', sender);
    message.textContent = text;
    chatWindow.appendChild(message);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
function getBotResponse(userMessage) {
    // Simple responses for demo
    const responses = {
        'hello': 'Hi there!',
        'hi': 'Hello there!',
        'how are you': 'I\'m just a bot, but I\'m doing great!',
        'bye': 'Goodbye!',
        'portfolio': 'This is the portfolio of Eric Gabriel P. Diola a BSIT 3rd year student of TCC.',
        'give me his number': ' 0926 842 3398.',
        'number': ' 0926 842 3398.',
        'what is his full name?': ' Eric Gabriel Penkian-Diola.',
        'name?': ' Eric Gabriel Penkian-Diola.',
        'name': ' Eric Gabriel Penkian-Diola.',
        'age': ' 21 years old. he was born on June 09, 2004',
        'his age': ' 21 years old. he was born on June 09, 2004',
        'how old is he?': ' 21 years old. he was born on June 09, 2004',
        'how old is he': ' 21 years old. he was born on June 09, 2004',
        'contact': ' You can Message him through his contact number 09268423398 or to his email ericgabrielpenkian@gmail.com',
        'email': ' ericgabrielpenkian@gmail.com',
        'address': ' Old Damulog, Damulog, Bukidnon.',
        'bye': ' Goodbye .',

    };
    const lowerMessage = userMessage.toLowerCase();
    return responses[lowerMessage] || 'Sorry, I didn\'t understand that. Try asking about the portfolio!';
}
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        const response = getBotResponse(message);
        setTimeout(() => addMessage(response, 'bot'), 500); // Simulate delay
        messageInput.value = '';
    }
});
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});