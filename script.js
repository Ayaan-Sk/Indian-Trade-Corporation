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
});
