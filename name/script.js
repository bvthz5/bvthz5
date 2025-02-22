// Name & Passion Arrays
const names = [
    "Binil Vincent",
    "ബിനില്‍ വിന്‍സെന്റ്",
    "பினில் வின்சென்ட்",
    "ಬಿನಿಲ್ ವಿನ್ಸೆಂಟ್",
    "बिनिल विन्सेंट"
];

const passions = [
    "I specialize in Web Development.",
    "I have a keen interest in Cybersecurity & Ethical Hacking.",
    "I am dedicated to mastering DevOps practices."
];

let nameIndex = 0;
let passionIndex = 0;
const nameDisplay = document.getElementById("nameDisplay");
const passionStatement = document.getElementById("passionStatement");

// Function to Change Name
function changeName() {
    nameDisplay.classList.add("curtain");
    setTimeout(() => {
        nameDisplay.textContent = names[nameIndex];
        nameIndex = (nameIndex + 1) % names.length;
    }, 1000);
}

// Loop Name Change Every 10 Seconds
setInterval(changeName, 10000);

// Typewriter Effect
function typeWriterEffect(text, element, speed = 100) {
    let i = 0;
    element.textContent = "";
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => eraseText(element, speed), 2000);
        }
    }
    type();
}

// Erase Text Effect
function eraseText(element, speed = 50) {
    let text = element.textContent;
    function erase() {
        if (text.length > 0) {
            text = text.slice(0, -1);
            element.textContent = text;
            setTimeout(erase, speed);
        } else {
            passionIndex = (passionIndex + 1) % passions.length;
            setTimeout(() => typeWriterEffect(passions[passionIndex], element, 100), 500);
        }
    }
    erase();
}

// Start Animations
typeWriterEffect(passions[passionIndex], passionStatement, 100);
