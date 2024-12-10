document.addEventListener('DOMContentLoaded', function() {
// Add event listeners
window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);
window.addEventListener('load', updateScrollProgress);

const sidebar = document.querySelector('.sidebar');
    const categoryTitle = document.querySelector('.category h2');

    if (window.innerWidth <= 768) {
        categoryTitle.addEventListener('click', function() {
            sidebar.classList.toggle('expanded');
        });

        // Close sidebar when clicking a category link
        const categoryLinks = document.querySelectorAll('.category-link');
        categoryLinks.forEach(link => {
            link.addEventListener('click', function() {
                sidebar.classList.remove('expanded');
            });
        });
    }

    const scrollBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll for category links
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            } else {
                // For HTML, CSS, JS categories, scroll to the web-dev section
                const webDevProject = document.querySelector('[data-categories*="html css js"]');
                if (webDevProject) {
                    webDevProject.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }); 

    // Highlight active category based on scroll position
    const projectBoxes = document.querySelectorAll('.project-box');
    const categoryLinks = document.querySelectorAll('.category-link');

    const observerOptions = {
        rootMargin: '-10% 0px -70% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get categories from the project box
                const projectCategories = entry.target.dataset.categories.split(' ');
                
                // Remove active class from all links
                categoryLinks.forEach(link => {
                    const linkCategory = link.dataset.category;
                    if (projectCategories.includes(linkCategory)) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    projectBoxes.forEach(box => observer.observe(box));

    // PDF Modal handling
    const pdfModal = new bootstrap.Modal(document.getElementById('pdfModal'));
    
    document.querySelectorAll('.pdf-trigger').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const pdfPath = this.dataset.pdf;
            
            // Force reload by creating new elements
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <object id="pdfObject" type="application/pdf" width="100%" height="600px">
                    <iframe id="pdfFallback" width="100%" height="600px"></iframe>
                </object>
            `;
            
            const pdfObject = document.getElementById('pdfObject');
            const pdfFallback = document.getElementById('pdfFallback');
            
            pdfObject.data = pdfPath;
            pdfFallback.src = pdfPath;
            
            pdfModal.show();
        });
    });
    
    document.getElementById('pdfModal').addEventListener('hidden.bs.modal', function () {
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = '';
    });
});

// Add scroll progress functionality
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const navbar = document.querySelector('.navbar');
    
    if (scrollProgress && navbar) {
        const navbarHeight = navbar.offsetHeight;
        
        if (window.innerWidth <= 768) {
            scrollProgress.style.top = `${navbarHeight}px`;
        } else {
            scrollProgress.style.top = '0';
        }
        
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const progressPercentage = (scrolled / scrollable) * 100;
        scrollProgress.style.width = `${progressPercentage}%`;
    }
}

