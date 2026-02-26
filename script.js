document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksArray = document.querySelectorAll('.nav-links a');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close menu on link click
        navLinksArray.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // WhatsApp Inquiry Integration
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('form-name').value;
            const company = document.getElementById('form-company').value;
            const interest = document.getElementById('form-interest').value;
            const message = document.getElementById('form-message').value;

            const whatsappNumber = "919359194023"; // Country code + number
            const text = `*New Inquiry - Indian Traders Corporation*%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Company:* ${company}%0A` +
                `*Interest:* ${interest}%0A` +
                `*Message:* ${message}`;

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

            // Optional: Show "Sending..." feedback on button
            const btn = inquiryForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Redirecting to WhatsApp...";
            btn.disabled = true;

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                btn.innerText = originalText;
                btn.disabled = false;
                inquiryForm.reset();
            }, 800);
        });
    }

    // Form Submission Handling
    const form = document.querySelector('.quote-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Thank you! Your quote request has been sent to Indian Traders Corporation.');
                form.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 0';
            navbar.style.background = 'rgba(10, 12, 16, 0.98)';
        } else {
            navbar.style.padding = '1.2rem 0';
            navbar.style.background = 'rgba(10, 12, 16, 0.95)';
        }
    });

    // --- Chatbot Logic ---
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatBody = document.getElementById('chat-body');
    const chatOptions = document.getElementById('chat-options');

    let chatState = {
        step: 'greeting',
        data: {}
    };

    const productOptions = [
        "Valves", "Pipes", "Pneumatics", "Hydraulics", "Instrumentation", "Other Product"
    ];

    const valveTypes = ["Ball Valve", "Gate Valve", "Butterfly Valve", "Other"];

    if (chatBubble && chatWindow && chatClose) {
        chatBubble.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
            if (chatWindow.classList.contains('active')) {
                resetChat();
            }
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
    }

    function addMessage(text, sender = 'bot') {
        const msg = document.createElement('div');
        msg.className = `chat-message ${sender}`;
        msg.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showOptions(options) {
        chatOptions.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            btn.onclick = () => handleOption(opt);
            chatOptions.appendChild(btn);
        });
    }

    function resetChat() {
        // Clear only the messages, keep the chat-options container
        const messages = chatBody.querySelectorAll('.chat-message');
        messages.forEach(m => m.remove());

        addMessage("Welcome to Indian Traders Corporation.");
        addMessage("How may we assist you today?");

        chatState = { step: 'greeting', data: {} };
        showOptions(productOptions);
    }

    function handleOption(option) {
        addMessage(option, 'user');
        chatOptions.innerHTML = '';

        if (chatState.step === 'greeting') {
            chatState.data.product = option;
            if (option === 'Valves') {
                chatState.step = 'valve_type';
                setTimeout(() => {
                    addMessage("Please select type of valve:");
                    showOptions(valveTypes);
                }, 500);
            } else {
                chatState.step = 'specification';
                setTimeout(() => {
                    addMessage(`Great Choice! Kindly mention size / pressure rating for ${option} (if known).`);
                    showInput();
                }, 500);
            }
        } else if (chatState.step === 'valve_type') {
            chatState.data.valveType = option;
            chatState.step = 'specification';
            setTimeout(() => {
                addMessage("Kindly mention size / pressure rating (if known).");
                showInput();
            }, 500);
        }
    }

    function showInput() {
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'chat-input-wrapper active';
        inputWrapper.innerHTML = `<input type="text" class="chat-input" placeholder="Type here..." id="temp-input">`;
        chatBody.appendChild(inputWrapper);
        chatBody.scrollTop = chatBody.scrollHeight;

        const input = document.getElementById('temp-input');
        input.focus();
        input.onkeypress = (e) => {
            if (e.key === 'Enter' && input.value.trim() !== "") {
                const val = input.value.trim();
                handleInput(val);
                inputWrapper.remove();
            }
        };
    }

    function handleInput(value) {
        addMessage(value, 'user');

        if (chatState.step === 'specification') {
            chatState.data.specs = value;
            chatState.step = 'quantity';
            setTimeout(() => addMessage("Required quantity?"), 500);
            setTimeout(() => showInput(), 600);
        } else if (chatState.step === 'quantity') {
            chatState.data.quantity = value;
            chatState.step = 'company';
            setTimeout(() => addMessage("Your company name?"), 500);
            setTimeout(() => showInput(), 600);
        } else if (chatState.step === 'company') {
            chatState.data.company = value;
            chatState.step = 'contact';
            setTimeout(() => addMessage("Contact number?"), 500);
            setTimeout(() => showInput(), 600);
        } else if (chatState.step === 'contact') {
            chatState.data.contact = value;
            chatState.step = 'email';
            setTimeout(() => addMessage("Email (optional). Type 'N/A' to skip."), 500);
            setTimeout(() => showInput(), 600);
        } else if (chatState.step === 'email') {
            chatState.data.email = value;
            finishEnquiry();
        }
    }

    function finishEnquiry() {
        setTimeout(() => {
            addMessage("Thank you. Our sales team will contact you shortly.");
            sendNotifications(chatState.data);
        }, 500);
    }

    function sendNotifications(data) {
        console.log("Enquiry captured:", data);

        // 1. WhatsApp Notification
        const whatsappNumber = "919359194023";
        const text = `*Chatbot Enquiry - ITC*%0A%0A` +
            `*Product:* ${data.product}%0A` +
            (data.valveType ? `*Type:* ${data.valveType}%0A` : "") +
            `*Specs:* ${data.specs}%0A` +
            `*Qty:* ${data.quantity}%0A` +
            `*Company:* ${data.company}%0A` +
            `*Contact:* ${data.contact}%0A` +
            `*Email:* ${data.email}`;

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

        // 2. Email (mailto) fallback
        const mailtoUrl = `mailto:info@itcnagpur.com?subject=New Chatbot Enquiry&body=Product: ${data.product}%0ACompany: ${data.company}%0AContact: ${data.contact}`;

        // 3. Google Sheets Integration (Placeholder)
        // To use this, create a Google Apps Script and deploy as Web App
        const scriptUrl = ""; // Add your Web App URL here
        if (scriptUrl) {
            fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(() => console.log("Data sent to Google Sheets"))
                .catch(err => console.error("Error sending to Google Sheets:", err));
        }

        // Add a button to manually trigger WhatsApp/Email if auto-open is blocked
        const actionDiv = document.createElement('div');
        actionDiv.className = 'chat-options';
        actionDiv.innerHTML = `
            <button class="option-btn" onclick="window.open('${whatsappUrl}', '_blank')">Send to WhatsApp</button>
            <button class="option-btn" onclick="window.location.href='${mailtoUrl}'">Send via Email</button>
        `;
        chatBody.appendChild(actionDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Optional: Auto-open WhatsApp after 2 seconds
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 2000);
    }
});
