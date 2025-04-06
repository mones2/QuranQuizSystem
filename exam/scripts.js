document.addEventListener("DOMContentLoaded", function() {
    const studentNameDisplay = document.getElementById("student-name-display");
    const formDisplay = document.getElementById("form-display");
    const questionContainer = document.getElementById("question-container");
    const nextButton = document.getElementById("next-button");
    const timerDisplay = document.getElementById("timer");

    const studentName = localStorage.getItem("currentStudentName");
    const studentGrade = localStorage.getItem("currentStudentGrade");
    const selectedForm = localStorage.getItem("selectedForm");
    const questions = JSON.parse(localStorage.getItem("questions")); // Load questions from local storage

    console.log("Questions in scripts.js:", questions);

    if (!questions || questions.length === 0) {
        console.error("No questions available.");
        return;
    }

    if (studentName) {
        studentNameDisplay.textContent = `اسم الطالب: ${studentName}`;
    } else {
        alert("لم يتم تسجيل اسم الطالب. يرجى العودة إلى صفحة تسجيل الدخول.");
        window.location.href = "../login/login.html"; // Redirect to the login page if no student name is found
        return;
    }

    if (selectedForm) {
        formDisplay.textContent = `النموذج: ${selectedForm}`;
    }

    let currentQuestionIndex = 0;
    let score = 0;

    function showQuestion(index) {
        const question = questions[index];
        console.log("Displaying question:", question);
        questionContainer.innerHTML = `
            <div class="question">
                <h2>${question.question}</h2>
                ${question.options.map((option, i) => `
                    <div class="answers">
                        <input type="radio" name="question" value="${i}" id="option${i}">
                        <label for="option${i}">${option}</label>
                    </div>
                `).join('')}
            </div>
        `;
    }

    nextButton.addEventListener("click", function() {
        const selectedOption = document.querySelector('input[name="question"]:checked');
        if (!selectedOption) {
            alert("يجب عليك اختيار إجابة قبل الانتقال إلى السؤال التالي.");
            return;
        }
        if (parseInt(selectedOption.value) === questions[currentQuestionIndex].answer) {
            score += 1;
        }

        currentQuestionIndex += 1;

        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            saveScore(studentName, studentGrade, score);
            window.location.href = "../login/login.html"; // Redirect to the login form
        }
    });

    showQuestion(currentQuestionIndex);

    function saveScore(studentName, studentGrade, score) {
        const studentScores = JSON.parse(localStorage.getItem("studentScores")) || [];
        studentScores.push({ name: studentName, grade: studentGrade, score: score });
        localStorage.setItem("studentScores", JSON.stringify(studentScores));
    }

    const examDuration = 20 * 60 * 1000; // 20 minutes in milliseconds
    const endTime = Date.now() + examDuration;

    function updateTimer() {
        const now = Date.now();
        const timeRemaining = endTime - now;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("انتهى الوقت!");
            saveScore(studentName, studentGrade, score);
            window.location.href = "../login/login.html"; // Redirect to the login form
        } else {
            const minutes = Math.floor(timeRemaining / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            timerDisplay.textContent = `الوقت المتبقي: ${minutes}د ${seconds}ث`;
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call to set the timer immediately

    // Initial call to display the first question
    showQuestion(currentQuestionIndex);
});
