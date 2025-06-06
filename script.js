document.addEventListener('DOMContentLoaded', () => {
    const projectBoxes = document.querySelectorAll('.project-box');
    
    // Add initial animation delay to each box
    projectBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            box.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            box.style.opacity = '1';
            box.style.transform = 'scale(1)';
        }, 100 * index);
    });

    // Add hover effect with slight rotation
    projectBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.transform = 'scale(1.02) rotate(1deg)';
        });

        box.addEventListener('mouseleave', () => {
            box.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Smooth scroll prevention
    document.body.addEventListener('wheel', (e) => {
        e.preventDefault();
    }, { passive: false });
}); 