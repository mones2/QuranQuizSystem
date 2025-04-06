document.addEventListener("DOMContentLoaded", function() {
    const setupForm = document.getElementById("setup-form");
    const countdownDiv = document.getElementById("countdown");

    setupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const studentName = document.getElementById("student-name").value;
        const studentGrade = document.getElementById("student-grade").value; // New field
        const studentlevel = document.getElementById("student-level").value;//added by mones
        const teacherPassword = document.getElementById("teacher-password").value;
        const startTime = document.getElementById("start-time").value;
        const correctPassword = "Mones123"; // Correct password
        
        if (teacherPassword !== correctPassword) {
            alert("كلمة مرور المعلم غير صحيحة");
            return;
        }
        
        const now = new Date();
        const [hours, minutes] = startTime.split(":").map(Number);
        const startTimeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        
        if (startTimeDate <= now) {
            alert("يجب أن يكون وقت البدء في المستقبل");
            return;
        }

        // Save the student name and grade in local storage
        localStorage.setItem("currentStudentName", studentName);
        localStorage.setItem("currentStudentGrade", studentGrade); // New storage
        localStorage.setItem("studentlevel", studentlevel); // add by mnones
        
        
        


        setupForm.style.display = "none";
        startCountdown(startTimeDate);
    });

    function startCountdown(startTimeDate) {
        const interval = setInterval(() => {
            const now = new Date();
            const timeDifference = startTimeDate - now;

            if (timeDifference <= 0) {
                clearInterval(interval);
                countdownDiv.textContent = "الاختبار يبدأ الآن!";
                // Redirect to the index.html page
                window.location.href = "../exam/index.html"; // Replace with your index page URL
            } else {
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                countdownDiv.textContent = `الوقت المتبقي: ${hours}س  ${minutes}د  ${seconds} ث`;
            }
        }, 1000);
    }
});
