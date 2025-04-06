document.addEventListener("DOMContentLoaded", function() {
    const marksTableBody = document.querySelector("#marks-table tbody");
    const scores = JSON.parse(localStorage.getItem("studentScores")) || [];

    scores.forEach(score => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = score.name;
        const gradeCell = document.createElement("td");
        gradeCell.textContent = score.grade; // New cell for grade
        const scoreCell = document.createElement("td");
        scoreCell.textContent = score.score;
        row.appendChild(nameCell);
        row.appendChild(gradeCell); // Append the new grade cell
        row.appendChild(scoreCell);
        marksTableBody.appendChild(row);
    });

    function getLocalStorageSize() {
        let total = 0;
        for (let x in localStorage) {
            if (localStorage.hasOwnProperty(x)) {
                total += ((localStorage[x].length + x.length) * 2);
            }
        }
        console.log(`Total used storage: ${(total / 1024).toFixed(2)} KB`);
        return total;
    }
    
    getLocalStorageSize();

    document.getElementById("back-button").addEventListener("click", function() {
        window.location.href = "../login/login.html";
    });
});
