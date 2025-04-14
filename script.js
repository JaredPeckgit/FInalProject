document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.fade-section');
    const progressBar = document.querySelector('.progress-bar');
    const factText = document.getElementById('fact-text');
    const nextFactButton = document.getElementById('next-fact');
    const quizButton = document.getElementById('quiz-btn');
    const resetQuizButton = document.getElementById('reset-quiz');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizFeedback = document.getElementById('quiz-feedback');
    const eraButtons = document.querySelectorAll('.era-btn');
    const submitFeedbackButton = document.getElementById('submit-feedback');
    const feedbackName = document.getElementById('feedback-name');
    const feedbackText = document.getElementById('feedback-text');
    const feedbackResult = document.getElementById('feedback-result');
    const scoreCount = document.getElementById('score-count'); // New

    let quizScore = 0; 

    const gameFacts = [
        "The first video game, Tennis for Two, was created in 1958 using an oscilloscope.",
        "Nintendo, founded in 1889, originally made playing cards before entering gaming.",
        "The 1983 video game crash nearly ended the industry due to market saturation.",
        "The PlayStation was originally a joint project with Nintendo before Sony went solo.",
        "Fortnite earned over $9 billion in its first two years after launching in 2017."
    ];

    let factIndex = 0;

    
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
    }

    
    function showNotification(title, body) {
        try {
            if (Notification.permission === "granted") {
                new Notification(title, { body });
            } else {
                alert(`${title}: ${body}`); // Fallback
            }
        } catch (error) {
            console.error(`Notification error: ${error.message}`);
            alert(`${title}: ${body}`); // Fallback on error
        } finally {
            console.log("Notification attempt completed.");
        }
    }

    // Fact cycling
    nextFactButton.addEventListener('click', () => {
        try {
            if (!gameFacts.length) throw new Error("No facts available!");
            for (let i = 0; i < gameFacts.length; i++) {
                if (i === factIndex) {
                    factText.textContent = gameFacts[i];
                    factIndex = (factIndex + 1) % gameFacts.length;
                    break;
                }
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            console.log("Fact cycling attempt completed.");
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

    const quizData = [
        { question: "What year was the first video game, Tennis for Two, created?", answers: ["1958", "1965", "1972", "1980"], correct: "1958" },
        { question: "What did Nintendo originally make before video games?", answers: ["Toys", "Playing cards", "Board games", "Electronics"], correct: "Playing cards" },
        { question: "What caused the 1983 video game crash?", answers: ["High prices", "Market saturation", "Lack of interest", "Console failure"], correct: "Market saturation" },
        { question: "Who was Sony's original partner for the PlayStation?", answers: ["Sega", "Microsoft", "Nintendo", "Atari"], correct: "Nintendo" },
        { question: "How much did Fortnite earn in its first two years?", answers: ["$1 billion", "$5 billion", "$9 billion", "$12 billion"], correct: "$9 billion" }
    ];

    
    function generateQuiz() {
        try {
            if (!quizData.length) throw new Error("No quiz data available!");
            const randomQuiz = quizData[Math.floor(Math.random() * quizData.length)];
            quizQuestion.textContent = randomQuiz.question;
            quizOptions.innerHTML = "";
            quizFeedback.textContent = "";

            randomQuiz.answers.forEach(answer => {
                const button = document.createElement('button');
                button.textContent = answer;
                button.addEventListener('click', () => checkAnswer(answer, randomQuiz.correct));
                quizOptions.appendChild(button);
            });
            showNotification("Quiz Started", "Answer the question to earn points!");
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            console.log("Quiz generation attempt completed.");
        }
    }

   
    function checkAnswer(selected, correct) {
        try {
            if (selected === correct) {
                let feedbackMessage;
                switch (correct) {
                    case "1958": feedbackMessage = "Correct! Tennis for Two kicked it all off!"; break;
                    case "Playing cards": feedbackMessage = "Correct! Nintendo’s card days were legendary!"; break;
                    case "Market saturation": feedbackMessage = "Correct! Too many games crashed the market!"; break;
                    case "Nintendo": feedbackMessage = "Correct! Sony and Nintendo almost teamed up!"; break;
                    case "$9 billion": feedbackMessage = "Correct! Fortnite’s a cash machine!"; break;
                    default: feedbackMessage = "Correct! Great job!";
                }
                quizFeedback.textContent = feedbackMessage;
                quizFeedback.style.color = "#4dabf7";
                quizScore += 10; // Increment score
                scoreCount.textContent = quizScore;
                showNotification("Correct Answer!", "You earned 10 points!");
            } else {
                quizFeedback.textContent = `Wrong! The correct answer was ${correct}.`;
                quizFeedback.style.color = "#e91e63";
                showNotification("Wrong Answer", "Try again next time!");
            }
        } catch (error) {
            alert(`Error checking answer: ${error.message}`);
        } finally {
            console.log("Answer check completed.");
        }
    }

    
    resetQuizButton.addEventListener('click', () => {
        try {
            quizQuestion.textContent = "";
            quizOptions.innerHTML = "";
            quizFeedback.textContent = "";
            quizScore = 0; 
            scoreCount.textContent = quizScore;
            showNotification("Quiz Reset", "Score cleared, start again!");
        } catch (error) {
            alert(`Error resetting quiz: ${error.message}`);
        } finally {
            console.log("Quiz reset attempt completed.");
        }
    });

    // Era buttons
    eraButtons.forEach(button => {
        button.addEventListener('click', () => {
            try {
                const era = button.getAttribute('data-era');
                if (!era) throw new Error("Era data missing!");
                button.classList.add('visited'); // Mark as visited
                const popup = window.open("", `EraPopup-${era}`, "width=400,height=300");
                if (!popup) throw new Error("Popup blocked or failed!");
                popup.document.write(`
                    <h3>${button.textContent}</h3>
                    <p>${button.nextElementSibling.nextElementSibling.textContent}</p>
                    <button onclick="window.close()">Close</button>
                `);
                showNotification(`Exploring ${era}`, "Check out the era details!");
            } catch (error) {
                alert(`Error: ${error.message}`);
                const era = button.getAttribute('data-era');
                alert(`Details for ${era}: ${button.nextElementSibling.nextElementSibling.textContent}`);
            } finally {
                console.log("Era popup attempt completed.");
            }
        });
    });

    // Feedback submission
    submitFeedbackButton.addEventListener('click', () => {
        try {
            const name = feedbackName.value.trim();
            const text = feedbackText.value.trim();

            if (!name) throw new Error("Name cannot be empty!");
            if (!text) throw new Error("Feedback cannot be empty!");

            feedbackResult.textContent = `Thanks, ${name}! Your feedback: "${text}" has been noted.`;
            feedbackResult.style.color = "#4dabf7";
            feedbackName.value = "";
            feedbackText.value = "";
            showNotification("Feedback Submitted", "Thank you for your input!");
        } catch (error) {
            feedbackResult.textContent = `Error: ${error.message}`;
            feedbackResult.style.color = "#e91e63";
        } finally {
            console.log("Feedback submission attempt completed.");
        }
    });

    quizButton.addEventListener('click', generateQuiz);
    checkScroll();
    window.addEventListener('scroll', checkScroll);
});