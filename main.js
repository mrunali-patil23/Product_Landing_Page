// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        const spans = menuToggle.querySelectorAll('span');
        
        if (mobileMenu.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
      
      // Close mobile menu when clicking on a link
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
          const spans = menuToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        });
      });
    }
    
    // Scroll animation for elements
    function reveal() {
      const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
      
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        } else {
          // Only remove the active class if element is far outside viewport
          if (elementTop > windowHeight) {
            reveals[i].classList.remove('active');
          }
        }
      }
    }
    
    // Initial check on load
    reveal();
    
    // Header scroll effect
    const header = document.getElementById('header');
    
    function headerScroll() {
      if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
      } else {
        header.style.padding = '16px 0';
        header.style.boxShadow = 'none';
      }
    }
    
    // Initial check on load
    headerScroll();
    
    // Run functions on scroll
    window.addEventListener('scroll', function() {
      reveal();
      headerScroll();
    });
    
    // Run on resize
    window.addEventListener('resize', reveal);
    
    // Image carousel functionality
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (carousel && prevBtn && nextBtn) {
      const itemWidth = carousel.querySelector('.carousel-item').offsetWidth + 16; // Width + gap
      
      // Scroll to next items
      nextBtn.addEventListener('click', function() {
        carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
      });
      
      // Scroll to previous items
      prevBtn.addEventListener('click', function() {
        carousel.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      });
      
      // Check if carousel is at the start or end
      carousel.addEventListener('scroll', function() {
        if (carousel.scrollLeft <= 0) {
          prevBtn.style.opacity = '0.5';
        } else {
          prevBtn.style.opacity = '1';
        }
        
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 10) {
          nextBtn.style.opacity = '0.5';
        } else {
          nextBtn.style.opacity = '1';
        }
      });
      
      // Initial check
      if (carousel.scrollLeft <= 0) {
        prevBtn.style.opacity = '0.5';
      }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Preload images for smoother experience
    function preloadImages() {
      const imagesToPreload = [
        "lovable-uploads/d5922fea-18f3-4602-a29b-af12a593b8f0.png",
        "lovable-uploads/42f33148-63fc-4bde-a06e-549a31c45f50.png",
        "lovable-uploads/7fa03223-0a15-4a6e-81d2-bef38b819ca2.png",
        "lovable-uploads/8dc93f62-2b6f-46ec-8281-73d92c3564f6.png",
        "lovable-uploads/2313c1ad-664b-4540-bbdd-04b4673fb0fc.png",
        "lovable-uploads/b09d52d2-f298-4771-8529-2f90fd5629c3.png",
        "lovable-uploads/a0f75a49-ed3a-43b6-9cfe-0323a74267db.png"
      ];
      
      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
    
    preloadImages();
  });
  