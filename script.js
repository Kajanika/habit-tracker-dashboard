let habits = [];

function addHabit() {
    const text = document.getElementById("habitText").value;
    if (text === "") return;

    habits.push({
        name: text,
        progress: [0, 0, 0, 0, 0, 0, 0]
    });

    save();
    render();
    document.getElementById("habitText").value = "";
}

function markCompleted(index) {
    const today = new Date().getDay(); // 0–6
    habits[index].progress[today] = 1;
    save();
    render();
}

function deleteHabit(i) {
    habits.splice(i, 1);
    save();
    render();
}

function save() {
    localStorage.setItem("habitData", JSON.stringify(habits));
}

function render() {
    const list = document.getElementById("habitList");
    list.innerHTML = "";

    habits.forEach((h, i) => {
        list.innerHTML += `
            <div class="habit">
                <div><strong>${h.name}</strong></div>
                <div>
                    <button class="complete-btn" onclick="markCompleted(${i})">Complete Today</button>
                    <button class="delete-btn" onclick="deleteHabit(${i})">Delete</button>
                </div>
            </div>
        `;
    });

    const tbody = document.querySelector("#progressTable tbody");
    tbody.innerHTML = "";

    habits.forEach(h => {
        let row = `<tr><td>${h.name}</td>`;
        h.progress.forEach(p => {
            row += `<td>${p === 1 ? "✔️" : "—"}</td>`;
        });
        row += "</tr>";
        tbody.innerHTML += row;
    });
}

window.onload = () => {
    const saved = localStorage.getItem("habitData");
    if (saved) habits = JSON.parse(saved);
    render();
};
