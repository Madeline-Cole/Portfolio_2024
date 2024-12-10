document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    const mockup = document.querySelector('.mockup');
    const contentSection = document.querySelector('.content-section');
    const gridSection = document.querySelector('.grid-section');
    let lastScrollY = window.scrollY;

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
    
    function handleScroll() {
        const contentBottom = contentSection.getBoundingClientRect().bottom;
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight));
        const scrollingDown = window.scrollY > lastScrollY;
        lastScrollY = window.scrollY;
        
        if (contentBottom <= 0) {
            mockup.classList.add('loaded');
            
            // When scrolling down, close the laptop
            if (scrollingDown) {
                mockup.classList.add('closing');
            } 
            // When scrolling up, open the laptop
            else {
                mockup.classList.remove('closing');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
    // Add event listeners
window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);
window.addEventListener('load', updateScrollProgress);
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






  /*old laptop code*/
  /*
    const laptopContainer = document.querySelector('.laptop-container');
    const laptopScreen = document.querySelector('.laptop-screen');
    const gridSection = document.querySelector('.grid-section');
    const sectionTitle = document.querySelector('.section-title');

    // Set initial states
    laptopContainer.style.position = 'fixed';
    laptopContainer.style.top = '50%';
    laptopContainer.style.left = '50%';
    laptopContainer.style.transform = 'translate(-50%, -50%)';
    laptopContainer.style.zIndex = '100';
    laptopContainer.style.opacity = '0';
    
    // Clone content for laptop screen
    const contentClone = document.querySelector('.content-section').cloneNode(true);
    laptopScreen.appendChild(contentClone);
    contentClone.style.transform = 'scale(0.8)';
    contentClone.style.width = '100%';
    contentClone.style.height = '100%';
    contentClone.style.position = 'absolute';
    contentClone.style.top = '0';
    contentClone.style.left = '0';
    contentClone.style.margin = '0';
    contentClone.style.padding = '0';
    contentClone.style.boxSizing = 'border-box';
    contentClone.style.overflow = 'hidden';
    contentClone.style.transformOrigin = 'top center';

    window.addEventListener('scroll', () => {
        const laptopSection = document.querySelector('.laptop-transition-section');
        const laptopSectionTop = laptopSection.offsetTop;
        const scrollY = window.scrollY;
        const sectionTitle = document.querySelector('.section-title');
        
        // Show title earlier
        if (scrollY >= laptopSectionTop - window.innerHeight * 1.5) {
            const titleProgress = (scrollY - (laptopSectionTop - window.innerHeight * 1.5)) / (window.innerHeight * 0.5);
            sectionTitle.style.opacity = Math.min(1, titleProgress);
        }
        
        // Laptop animation starts later
        if (scrollY >= laptopSectionTop - window.innerHeight) {
            const progress = (scrollY - (laptopSectionTop - window.innerHeight)) / window.innerHeight;
            
            laptopContainer.style.opacity = progress;
            
            if (progress > 0.5) {
                const closeAmount = (progress - 0.5) * 2;
                laptopScreen.style.transform = `rotateX(-${closeAmount * 90}deg)`;
                
                if (closeAmount > 0.3) {
                    const colorProgress = (closeAmount - 0.3) / 0.7;
                    contentClone.style.opacity = Math.max(0, 1 - colorProgress * 2);
                    laptopScreen.style.backgroundColor = `rgba(255, 105, 180, ${colorProgress * 0.8})`;
                }
                
                if (closeAmount > 0.8) {
                    gridSection.style.opacity = (closeAmount - 0.8) * 5;
                    gridSection.style.transform = 'translateY(0)';
                }
            }
        }
    });    
    */
