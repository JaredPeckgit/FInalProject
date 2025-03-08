document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.fade-section');
    const progressBar = document.querySelector('.progress-bar');
    const factText = document.getElementById('fact-text');
    const nextFactButton = document.getElementById('next-fact');

    const gameFacts = [
        "The first video game, Tennis for Two, was created in 1958 using an oscilloscope.",
        "Nintendo, founded in 1889, originally made playing cards before entering gaming.",
        "The 1983 video game crash nearly ended the industry due to market saturation.",
        "The PlayStation was originally a joint project with Nintendo before Sony went solo.",
        "Fortnite earned over $9 billion in its first two years after launching in 2017."
    ];

    let factIndex = 0;

    nextFactButton.addEventListener('click', () => {
        for (let i = 0; i < gameFacts.length; i++) {
            if (i === factIndex) {
                factText.textContent = gameFacts[i];
                factIndex = (factIndex + 1) % gameFacts.length;
                break;
            }
        }
    });

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

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    }

    checkScroll();
    window.addEventListener('scroll', checkScroll);
});