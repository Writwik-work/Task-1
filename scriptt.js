/***************************************
 * Question Data
 ****************************************/

// Example question sets. You can add or remove questions easily.
const menQuestions = [
    {
      question: "Do you think hours of cardio is beneficial for fat loss?",
      subtext: "(Many people think doing cardio every day is the answer.)",
      options: ["Yes", "No", "Not Sure"]
    },
    {
      question: "How many days a week do you currently exercise?",
      subtext: "(Include any form of physical activity.)",
      options: ["1-2 days", "3-4 days", "5+ days"]
    },
    {
      question: "What is your main fitness goal?",
      subtext: "(Choose the one that fits best.)",
      options: ["Build muscle", "Lose weight", "Improve endurance"]
    },
    {
      question: "How would you describe your diet?",
      subtext: "(Roughly speaking, do you watch your calorie intake?)",
      options: ["Strict", "Moderate", "Not at all"]
    }
  ];
  
  const womenQuestions = [
    {
      question: "Do you enjoy group fitness classes?",
      subtext: "(Some find it motivating, others prefer solo workouts.)",
      options: ["Yes", "No", "Not Sure"]
    },
    {
      question: "How often do you do strength training?",
      subtext: "(Lifting weights, resistance exercises, etc.)",
      options: ["Rarely", "1-2 times a week", "3+ times a week"]
    },
    {
      question: "Do you follow any specific diet plan?",
      subtext: "(Keto, Intermittent Fasting, etc.)",
      options: ["Yes", "No", "Sometimes"]
    },
    {
      question: "What is your current fitness goal?",
      subtext: "(Pick the best match.)",
      options: ["Toning", "Weight Loss", "Building Endurance"]
    },
    {
      question: "Do you track your daily calorie intake?",
      subtext: "(Using apps like MyFitnessPal, etc.)",
      options: ["Yes", "No", "Sometimes"]
    }
  ];
  
  // These will change when user selects Men or Women
  let currentQuiz = [];
  let currentQuestionIndex = 0;
  let userAnswers = [];
  
  /***************************************
   * Initial Setup / Start Quiz
   ****************************************/
  function startQuiz(gender) {
    // Hide main screen, show quiz section
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
  
    if (gender === 'men') {
      currentQuiz = menQuestions;
    } else {
      currentQuiz = womenQuestions;
    }
  
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.length).fill(null); // Initialize with null answers
  
    renderQuestion();
    updateProgress();
    updateFooterButtons();
  }
  
  /***************************************
   * Render Question
   ****************************************/  
    // Update question title and subtext
    function renderQuestion() {
      const questionObj = currentQuiz[currentQuestionIndex];
    
      // Update question title and subtext
      document.getElementById('question-title').textContent = questionObj.question;
      document.getElementById('question-subtext').textContent = questionObj.subtext;
    
      // Render options
      const optionsContainer = document.getElementById('options-container');
      optionsContainer.innerHTML = ''; // Clear previous
    
      questionObj.options.forEach((optionText, idx) => {
        const optionId = `option-${idx}`;
    
        // Create the container
        const optionItem = document.createElement('div');
        optionItem.classList.add('option-item');
    
        // Create the radio
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'quiz-option';
        radioInput.id = optionId;
        radioInput.value = optionText;
    
        // If user previously selected this option, keep it checked & highlight
        if (userAnswers[currentQuestionIndex] === optionText) {
          radioInput.checked = true;
          optionItem.classList.add('selected');
        }
    
        // Create label
        const label = document.createElement('label');
        label.setAttribute('for', optionId);
        label.classList.add('option-label');
        label.textContent = optionText;
    
        // ---- ADD THIS CLICK LISTENER ----
        optionItem.addEventListener('click', () => {
          // Remove 'selected' from all option items in this question
          optionsContainer
            .querySelectorAll('.option-item')
            .forEach(item => item.classList.remove('selected'));
          
          // Add 'selected' to the one we just clicked
          optionItem.classList.add('selected');
          
          // Make sure its radio is checked
          radioInput.checked = true;
        });
    
        // Append radio + label to container
        optionItem.appendChild(radioInput);
        optionItem.appendChild(label);
    
        // Add this option to the options container
        optionsContainer.appendChild(optionItem);
      });
    
      // Update question counter
      const questionCounter = document.getElementById('question-counter');
      questionCounter.textContent = `${currentQuestionIndex + 1}/${currentQuiz.length}`;
    }
    
  
  /***************************************
   * Navigation (Next / Prev)
   ****************************************/
  function nextQuestion() {
    // Check if an option is selected
    const selectedOption = getSelectedOption();
    if (!selectedOption) {
      alert('Please select at least one option!');
      return;
    }
  
    // Save answer
    userAnswers[currentQuestionIndex] = selectedOption;
  
    // Move to next question if not at the end
    if (currentQuestionIndex < currentQuiz.length - 1) {
      currentQuestionIndex++;
      renderQuestion();
      updateProgress();
      updateFooterButtons();
    } else {
      // If it's the last question, treat as submit
      submitQuiz();
    }
  }
  
  function prevQuestion() {
    // Just go back one question if possible
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderQuestion();
      updateProgress();
      updateFooterButtons();
    }
  }
  
  /***************************************
   * Get Selected Option
   ****************************************/
  function getSelectedOption() {
    const radios = document.querySelectorAll('input[name="quiz-option"]');
    let selectedValue = null;
    radios.forEach((radio) => {
      if (radio.checked) {
        selectedValue = radio.value;
      }
    });
    return selectedValue;
  }
  
  /***************************************
   * Update Footer Buttons (Arrows / Submit)
   ****************************************/
  function updateFooterButtons() {
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
  
    // If on the first question, hide the prev button
    if (currentQuestionIndex === 0) {
      prevBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'inline-block';
    }
  
    // If on the last question, show "Submit" instead of next arrow
    if (currentQuestionIndex === currentQuiz.length - 1) {
      nextBtn.textContent = "Submit";
    } else {
      nextBtn.textContent = "→";
    }
  }
  
  /***************************************
   * Update Progress Bar
   ****************************************/
  function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const progressPercent =
      ((currentQuestionIndex + 1) / currentQuiz.length) * 100;
    progressFill.style.width = `${progressPercent}%`;
  }
  
  /***************************************
   * Submit Quiz
   ****************************************/
  function submitQuiz() {
    // Make sure the last question is answered
    const selectedOption = getSelectedOption();
    if (!selectedOption) {
      alert('Please select at least one option!');
      return;
    }
    userAnswers[currentQuestionIndex] = selectedOption;
  
    // Instead of an alert, go to our loading screen
    showLoadingScreen();
  }
  
  
  /***************************************
   * Back to Main Screen
   ****************************************/
  function backToMain() {
    // Show main screen, hide quiz section
    document.getElementById('main-screen').style.display = 'flex';
    document.getElementById('quiz-section').style.display = 'none';
  
    // Optionally reset progress or do other cleanup
    userAnswers = [];
    currentQuestionIndex = 0;
    currentQuiz = [];
    // Reset the progress bar
    document.getElementById('progress-fill').style.width = '0%';
  }
  
  function showLoadingScreen() {
    // Hide the quiz & main screen
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('main-screen').style.display = 'none';
  
    // Show the loading screen
    document.getElementById('loading-screen').style.display = 'flex';
  
    // Animate from 0% to 100% in 5 seconds (5000 ms).
    let progress = 0;
    const totalTime = 5000; // 5 seconds total
    const intervalTime = 50; // update every 50ms -> 100 increments
  
    // Grab circle & compute circumference
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
  
    // Ensure the circle starts “empty”
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
  
    // Start interval
    const interval = setInterval(() => {
      progress++;
      // Update numeric text
      document.getElementById('progress-percentage').textContent = progress + '%';
      // Update circle offset
      const offset = circumference - (progress / 100) * circumference;
      circle.style.strokeDashoffset = offset;
  
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Show the results screen instead of main screen
          showResultsScreen();
        }, 500);
      }
    }, intervalTime);
  }
  
  function showResultsScreen() {
    // Hide loading screen
    document.getElementById('loading-screen').style.display = 'none';
    // Show results screen
    document.getElementById('results-screen').style.display = 'flex';
  }
  
  