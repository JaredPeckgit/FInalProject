
# History of Video Games Website

This project is an interactive web-based timeline exploring the evolution of video games from the 1970s to the present, featuring dynamic visuals and engaging user interactions.

## Features

### Timeline with Fade Effect
- **Description**: Sections for each era  fade in as you scroll down and fade out as you scroll up.
- **How It Works**: JavaScript detects scroll position and applies CSS transitions to `.fade-section` elements.


### Quiz Functionality
- **Description**: A "Quiz Me!" button generates a random multiple-choice question about video game history.
- **How It Works**: 
  - Questions and answers are stored in the quiz data array.
  - Clicking "Quiz Me!" displays a question and buttons for options.
  - Selecting an answer provides instant feedback 

### Progress Bar
- **Description**: A light blue bar at the top tracks your scroll progress through the timeline.
- **How It Works**: JavaScript calculates scroll percentage and updates the progress bar width.

### Images
- **Description**: Each era includes a representative image
- **Details**: 
  added images `pong.png`, `pacman.jpg`, `doom.png`, `WOW.png`, `mc.jpg`, `elden.jpg`.
  - Displayed below each `<h2>` 
  - Styled with a light blue border, centered in each section.
