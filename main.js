document.addEventListener('DOMContentLoaded', () => {
    // Initialize Splitting.js for text effects
    Splitting();
    
    // Initialize ScrollOut for scroll animations
    ScrollOut({
      threshold: 0.2,
      once: true
    });
    
    // Loader animation
    const loader = document.querySelector('.loader');
    
    // Simulate loading (replace with actual preloading if needed)
    setTimeout(() => {
      loader.classList.add('fade-out');
      
      // Remove loader from DOM after animation completes
      loader.addEventListener('transitionend', () => {
        loader.remove();
      });
    }, 1500);
    
    // Cursor effects (optional)
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cta-button');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });
    });
  });