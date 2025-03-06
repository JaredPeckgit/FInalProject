document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.fade-section');

    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.8 && sectionBottom > 0) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }

    checkScroll();
    window.addEventListener('scroll', checkScroll);
});