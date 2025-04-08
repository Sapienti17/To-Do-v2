const inputText = document.getElementById("input-text");
const listContainer = document.getElementById("list-container");

inputText.addEventListener("keydown", function (elem) {
    if (elem.key === "Enter") {
        addTask();
    }
});

function addTask() {
    if (inputText.value === "") {
        alert("Необходимо записать задачу!");
    } else {
        const li = document.createElement("li");
        li.innerText = inputText.value;
        listContainer.appendChild(li);

        const deleteBtn = document.createElement("button");
        li.appendChild(deleteBtn);
        deleteBtn.innerText = "X";
        deleteBtn.classList.add("delete-btn");
    }
    inputText.value = "";
    saveData();
}

listContainer.addEventListener(
    "click",
    (e) => {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
        } else if (e.target.tagName === "BUTTON") {
            e.target.parentElement.remove();
            saveData();
        }
    },
    false
);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
