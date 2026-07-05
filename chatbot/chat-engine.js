/**
 * BV Bot — Chat Engine
 * 
 * Handles user input processing, fuzzy keyword matching,
 * intent detection, and response rendering with typing animation.
 */

(function () {
    'use strict';

    // DOM Elements
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const typingIndicator = document.getElementById('typing-indicator');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    // ============================================
    // Theme Toggle
    // ============================================
    let currentTheme = localStorage.getItem('bvbot-theme') || 'dark';
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('bvbot-theme', currentTheme);
    });

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }

    // ============================================
    // Suggestion Chips
    // ============================================
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query');
            if (query) {
                userInput.value = query;
                handleSend();
            }
        });
    });

    // ============================================
    // Input Handling
    // ============================================
    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    function handleSend() {
        const text = userInput.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'user');
        userInput.value = '';
        userInput.focus();

        // Show typing indicator
        showTyping();

        // Simulate thinking delay (300–900ms for realism)
        const delay = 400 + Math.random() * 500;
        setTimeout(() => {
            hideTyping();
            const response = processQuery(text);
            addMessage(response.text, 'bot', response.tag);
        }, delay);
    }

    // ============================================
    // Message Rendering
    // ============================================
    function addMessage(text, sender, tag) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = sender === 'bot' ? '🤖' : '👤';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';

        if (sender === 'bot') {
            // Parse simple markdown-ish formatting
            bubbleDiv.innerHTML = formatResponse(text);
        } else {
            bubbleDiv.textContent = text;
        }

        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = formatTime();

        contentDiv.appendChild(bubbleDiv);
        contentDiv.appendChild(timeSpan);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function formatResponse(text) {
        // Convert newlines to <br>, but preserve HTML tags
        return text
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('<br>');
    }

    function formatTime() {
        const now = new Date();
        let hours = now.getHours();
        const mins = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${mins} ${ampm}`;
    }

    function scrollToBottom() {
        requestAnimationFrame(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    }

    function showTyping() {
        typingIndicator.classList.add('visible');
        scrollToBottom();
    }

    function hideTyping() {
        typingIndicator.classList.remove('visible');
    }

    // ============================================
    // Query Processing — Fuzzy Intent Matching
    // ============================================
    function processQuery(query) {
        const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, '');
        const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 1);

        let bestMatch = null;
        let bestScore = 0;

        for (const intent of INTENTS) {
            let score = 0;

            for (const keyword of intent.keywords) {
                const kwLower = keyword.toLowerCase();
                const kwWords = kwLower.split(/\s+/);

                // Exact phrase match (highest priority)
                if (normalizedQuery.includes(kwLower)) {
                    score += kwWords.length * 3;
                    continue;
                }

                // Individual word match
                for (const kwWord of kwWords) {
                    for (const qWord of queryWords) {
                        if (qWord === kwWord) {
                            score += 2;
                        } else if (qWord.includes(kwWord) || kwWord.includes(qWord)) {
                            // Partial/substring match
                            score += 1;
                        } else if (levenshtein(qWord, kwWord) <= 2 && kwWord.length > 3) {
                            // Fuzzy match (allow up to 2 edit distance for longer words)
                            score += 0.5;
                        }
                    }
                }
            }

            if (score > bestScore) {
                bestScore = score;
                bestMatch = intent;
            }
        }

        // Threshold: need at least a score of 1.5 to be considered a match
        if (bestMatch && bestScore >= 1.5) {
            return {
                text: bestMatch.respond(),
                tag: bestMatch.tag
            };
        }

        // Fallback
        return {
            text: FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)],
            tag: 'general'
        };
    }

    /**
     * Levenshtein distance — for fuzzy string matching
     */
    function levenshtein(a, b) {
        const matrix = [];
        const aLen = a.length;
        const bLen = b.length;

        if (aLen === 0) return bLen;
        if (bLen === 0) return aLen;

        for (let i = 0; i <= bLen; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= aLen; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= bLen; i++) {
            for (let j = 1; j <= aLen; j++) {
                const cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }

        return matrix[bLen][aLen];
    }

})();
