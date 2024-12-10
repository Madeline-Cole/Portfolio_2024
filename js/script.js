// ===============================
// INITIALIZATION AND DOM LOADING
// ===============================
document.addEventListener('DOMContentLoaded', function() {
    initializeSkillCards();
    initializeAboutSection();
    initializeModalHandlers(); 
    initializeSmoothScroll();
    initializeTypingAnimation();
    initializeStoryAnimation();


    // Get all links that point to contact section
    const contactLinks = document.querySelectorAll('a[data-scroll-to="contact"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If already on index page
            if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                e.preventDefault();
                document.querySelector('#contact-section').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // If coming from another page
                sessionStorage.setItem('scrollToContact', 'true');
            }
        });
    });

    // Check if we need to scroll after page load
    if (sessionStorage.getItem('scrollToContact')) {
        sessionStorage.removeItem('scrollToContact');
        setTimeout(() => {
            document.querySelector('#contact-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 100); // Small delay to ensure smooth transition
    }

   // Initialize scroll handlers
   const scrollTop = document.querySelector('.scroll-top');
   if (scrollTop) {
       window.addEventListener('scroll', () => {
           if (window.pageYOffset > 300) {
               scrollTop.classList.add('visible');
           } else {
               scrollTop.classList.remove('visible');
           }
       });
       
       scrollTop.addEventListener('click', (e) => {
           e.preventDefault();
           window.scrollTo({
               top: 0,
               behavior: 'smooth'
           });
       });
   }
   // Add event listener for scroll
window.addEventListener('scroll', updateScrollProgress);
// Initialize on page load
window.addEventListener('load', updateScrollProgress);
});

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const year = item.getAttribute('data-year');
        const yearDiv = item.querySelector('.timeline-year');
        if (yearDiv) {
            yearDiv.textContent = year;
        }
    });

    const scrollTop = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });
    
    scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

function copyEmail() {
    const email = 'madelinecolebusiness@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        // Create and show notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #4CAF50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            animation: fadeInOut 2s ease-in-out forwards;
        `;
        notification.textContent = 'Email copied to clipboard!';
        document.body.appendChild(notification);
        
        // Remove notification after animation
        setTimeout(() => {
            notification.remove();
        }, 2000);
    });
}

function initializeStoryAnimation() {
    const storyContent = document.querySelector('.story-content');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (!storyContent || !timelineItems.length) return;
    
    storyContent.classList.add('active');
    
    const animateTimelineItems = () => {
        timelineItems.forEach((item, index) => {
            // Add initial state classes
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            // Trigger animation with increasing delay for each item
            setTimeout(() => {
                item.style.transition = 'all 0.8s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                
                // Add a subtle scale effect when fully visible
                item.addEventListener('transitionend', () => {
                    item.style.transform = 'scale(1)';
                }, { once: true });
                
            }, 300 * (index + 1)); // Stagger the animations
        });
    };

    // Use Intersection Observer to trigger animation when timeline is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTimelineItems();
                observer.disconnect(); // Only animate once
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(storyContent);
}

function typeText(element, text, speed, callback) {
    let index = 0;
    element.textContent = '';
    
    const typeNextChar = () => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            requestAnimationFrame(() => setTimeout(typeNextChar, speed));
        } else if (callback) {
            callback();
        }
    };
    
    typeNextChar();
}
// ===============================
// CONTACT FORM HANDLING
// ===============================

// ===============================
// ABOUT SECTION FUNCTIONALITY
// ===============================
function initializeStorySection(storyContent, storyChevron) {
    if (!storyContent || !storyChevron) {
        return; // Exit if elements don't exist
    }
    // Rest of your story section initialization code
}

function initializeAboutSection() {
    const skillsBoxes = document.querySelectorAll('.skills-box');
    const storyContent = document.querySelector('.story-content');
    const storyChevron = document.querySelector('.story-header .chevron-icon');
    
    // Initialize skills sections
    skillsBoxes.forEach(box => {
        initializeSkillBox(box);
    });

    // Only initialize story section if elements exist
    if (storyContent && storyChevron) {
        initializeStorySection(storyContent, storyChevron);
    }
    
    initializeProfileCard();
    initializeScrollAnimations();
}

// ===============================
// SKILLS FUNCTIONALITY
// ===============================
function initializeSkillCards() {
    document.querySelectorAll('.skills-box').forEach(box => {
        const toggleBtn = box.querySelector('.toggle-btn');
        const content = box.querySelector('.skills-content');
        const chevron = box.querySelector('.chevron-icon');
        
        // Set initial state
        toggleBtn.setAttribute('aria-expanded', 'true');
        
        function toggleState(e) {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            chevron.style.transform = !isExpanded ? 'rotate(180deg)' : 'rotate(0)';
            
            // Toggle the content using the hidden class
            if (isExpanded) {
                content.classList.add('hidden');
            } else {
                content.classList.remove('hidden');
            }
        }
        
        // Box click handler
        box.addEventListener('click', (e) => {
            if (!e.target.closest('.toggle-btn')) {
                toggleState(e);
            }
        });
        
        // Button click handler
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleState(e);
        });
    });
}

// ===============================
// MODAL HANDLING
// ===============================
function initializeModalHandlers() {
     // Handle description expansion
    const expandBtns = document.querySelectorAll('.expand-btn');
    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleDescription(btn);
        });
    });

    // Handle case study modal
    const caseStudyBtns = document.querySelectorAll('.case-study-btn');
    caseStudyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <embed src="path/to/case-study.pdf" type="application/pdf" width="100%" height="600px">
                </div>
            `;
            document.body.appendChild(modal);

            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.onclick = () => modal.remove();
            
            window.onclick = (event) => {
                if (event.target === modal) {
                    modal.remove();
                }
            };
        });
    });
}

// ===============================
// NAVIGATION AND SCROLLING
// ===============================
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===============================
// HELPER FUNCTIONS
// ===============================
function initializeSkillBox(box) {
    const content = box.querySelector('.skills-content');
    const chevron = box.querySelector('.chevron-icon');
    const header = box.querySelector('.skills-header');
    
    // Set initial state
    content.classList.remove('hidden');
    chevron.style.transform = 'rotate(180deg)';
    
    header.addEventListener('click', (e) => {
        // Only toggle the clicked box's content
        const isHidden = content.classList.contains('hidden');
        content.classList.toggle('hidden');
        chevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0)';
    });
}


function initializeStorySection(storyContent, storyChevron) {
    storyContent.classList.add('active');
    storyChevron.style.transform = 'rotate(180deg)';
    
    const storyHeader = document.querySelector('.story-header');
    storyHeader.addEventListener('click', () => {
        storyContent.classList.toggle('active');
        storyChevron.style.transform = storyContent.classList.contains('active')
            ? 'rotate(180deg)'
            : 'rotate(0)';
    });
}

function initializeProfileCard() {
    const profileCard = document.getElementById('profileCard');
    
    profileCard.addEventListener('mouseover', () => {
        profileCard.style.transform = 'translateY(-8px)';
        profileCard.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
    });
    
    profileCard.addEventListener('mouseout', () => {
        profileCard.style.transform = 'translateY(0)';
        profileCard.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
}

function toggleDescription(button) {
    const card = button.closest('.project-card');
    const fullDesc = card.querySelector('.description-full');
    const preview = card.querySelector('.description-preview');
    
    fullDesc.classList.toggle('active');
    preview.classList.toggle('hidden');
    
    // Update button text and arrow
    const isExpanded = fullDesc.classList.contains('active');
    button.innerHTML = isExpanded ? 'Show Less ▲' : 'Read More ▼';
    
    // If collapsing (Show Less clicked), scroll to the top of the project card
    if (!isExpanded) {
        card.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
}

// Add scroll progress bar functionality
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    
    const progressPercentage = (scrolled / scrollable) * 100;
    scrollProgress.style.width = progressPercentage + '%';
}

function initializeTypingAnimation() {
    const text = document.querySelector('.typing-text');
    if (text) {
        text.style.width = '0';
        setTimeout(() => {
            text.style.width = '100%';
        }, 500);
    }
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message!');
        this.reset();
    });
}

// When showing/hiding content
function toggleContent(element) {
    if (element.hasAttribute('aria-hidden')) {
        // Remove focus from any focused elements inside
        const focusedElement = element.querySelector(':focus');
        if (focusedElement) {
            focusedElement.blur();
        }
    }
    // Toggle visibility
    element.setAttribute('aria-hidden', element.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');
}