// Main JavaScript for Texas Grand Plumbing

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavbar();
  initFaqAccordion();
  initChatBot();
  initScrollAnimations();
});

// Navbar functionality
function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');
  const navItems = document.querySelectorAll('.nav-links a');
  
  // Toggle mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      navOverlay.classList.toggle('active');
      
      // Toggle hamburger icon
      if (this.querySelector('i').classList.contains('bx-menu')) {
        this.querySelector('i').classList.remove('bx-menu');
        this.querySelector('i').classList.add('bx-x');
      } else {
        this.querySelector('i').classList.remove('bx-x');
        this.querySelector('i').classList.add('bx-menu');
      }
    });
  }
  
  // Close menu when overlay is clicked
  if (navOverlay) {
    navOverlay.addEventListener('click', function() {
      navLinks.classList.remove('active');
      navOverlay.classList.remove('active');
      
      if (hamburger) {
        hamburger.querySelector('i').classList.remove('bx-x');
        hamburger.querySelector('i').classList.add('bx-menu');
      }
    });
  }
  
  // Close menu when nav item is clicked
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        
        if (hamburger) {
          hamburger.querySelector('i').classList.remove('bx-x');
          hamburger.querySelector('i').classList.add('bx-menu');
        }
      }
    });
  });
  
  // Add active class to current page nav link
  const currentPage = window.location.pathname.split('/').pop();
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      item.classList.add('active');
    }
  });
}

// FAQ Accordion functionality
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    if (header) {
      header.addEventListener('click', function() {
        // Toggle current accordion item without affecting others
        item.classList.toggle('active');
      });
    }
  });
}

// Chat Bot functionality
function initChatBot() {
  const chatBotButton = document.querySelector('.chat-bot-button');
  const chatBotPanel = document.querySelector('.chat-bot-panel');
  const chatBotClose = document.querySelector('.chat-bot-close');
  const chatBotForm = document.querySelector('.chat-bot-form');
  const chatBotBody = document.querySelector('.chat-bot-body');
  
  // Add bounce animation to chat bot button
  if (chatBotButton) {
    chatBotButton.classList.add('bounce');
    
    // Toggle chat panel
    chatBotButton.addEventListener('click', function() {
      if (chatBotPanel) {
        chatBotPanel.classList.toggle('active');
        chatBotButton.classList.remove('bounce');
      }
    });
  }
  
  // Close chat panel
  if (chatBotClose) {
    chatBotClose.addEventListener('click', function() {
      if (chatBotPanel) {
        chatBotPanel.classList.remove('active');
      }
    });
  }
  
  // Add suggested questions after initial greeting
  if (chatBotBody) {
    const suggestedQuestions = document.createElement('div');
    suggestedQuestions.classList.add('chat-suggested-questions');
    
    const questions = [
      'What services do you offer?',
      'How can I get a quote?',
      'Do you handle emergencies?',
      'What areas do you service?'
    ];
    
    questions.forEach(question => {
      const questionElement = document.createElement('div');
      questionElement.classList.add('chat-suggested-question');
      questionElement.textContent = question;
      
      questionElement.addEventListener('click', function() {
        // Add user message when question is clicked
        addChatMessage('user', question);
        
        // Simulate response after a short delay
        setTimeout(function() {
          let response = '';
          
          // Provide specific responses based on the question
          if (question === 'What services do you offer?') {
            response = 'We offer a wide range of plumbing services including construction plan drawings, custom home installations, commercial projects, and more. Would you like to know more about a specific service?';
          } else if (question === 'How can I get a quote?') {
            response = 'You can get a quote by calling us at (512) 938-8731 or by filling out the contact form on our website. We typically respond within 24 hours.';
          } else if (question === 'Do you handle emergencies?') {
            response = 'Yes, we handle plumbing emergencies! Please call us at (512) 938-8731 for immediate assistance.';
          } else if (question === 'What areas do you service?') {
            response = 'We service Austin and surrounding areas including Round Rock, Cedar Park, Georgetown, and San Marcos.';
          }
          
          addChatMessage('bot', response);
        }, 1000);
      });
      
      suggestedQuestions.appendChild(questionElement);
    });
    
    chatBotBody.appendChild(suggestedQuestions);
  }
  
  // Handle chat form submission
  if (chatBotForm) {
    chatBotForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const input = this.querySelector('.chat-bot-input');
      const message = input.value.trim();
      
      if (message !== '') {
        // Add user message
        addChatMessage('user', message);
        
        // Clear input
        input.value = '';
        
        // Simulate response after a short delay
        setTimeout(function() {
          const responses = [
            "Thanks for reaching out! We'll get back to you shortly.",
            "Our team will contact you as soon as possible.",
            "Thank you for your message. Please call us at (512) 938-8731 for immediate assistance."
          ];
          
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          addChatMessage('bot', randomResponse);
        }, 1000);
      }
    });
  }
  
  // Function to add chat messages
  function addChatMessage(sender, message) {
    if (!chatBotBody) return;
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', `chat-message-${sender}`);
    
    const textElement = document.createElement('div');
    textElement.classList.add('chat-message-text');
    textElement.textContent = message;
    
    messageElement.appendChild(textElement);
    chatBotBody.appendChild(messageElement);
    
    // Scroll to bottom
    chatBotBody.scrollTop = chatBotBody.scrollHeight;
  }
}

// Scroll Animations
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  // Initial check for elements in viewport
  checkFadeElements();
  
  // Check elements on scroll
  window.addEventListener('scroll', checkFadeElements);
  
  function checkFadeElements() {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});