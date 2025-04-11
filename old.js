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
        const span = document.createElement("span");
        span.innerText = inputText.value;
        li.prepend(span);
        listContainer.appendChild(li);

        const editBtn = document.createElement("button");
        li.appendChild(editBtn);
        editBtn.innerText = "✎";
        editBtn.classList.add("edit-btn");

        editBtn.addEventListener("click", function () {
            const isEditing = li.classList.contains("editing");
            if (isEditing) {
                const input = li.querySelector('input[type="text"]');
                span.innerText = input.value;
                li.removeChild(input);
                li.prepend(span);
                li.classList.remove("editing");
                editBtn.classList.remove("save-btn");
                editBtn.textContent = "✎";
                saveData();
            } else {
                const input = document.createElement("input");
                input.type = "text";
                input.value = span.textContent;
                li.insertBefore(input, span);
                li.removeChild(span);
                li.classList.add("editing");
                editBtn.classList.add("save-btn");
                editBtn.textContent = "✓";
                input.focus();
                saveData();
            }
        });
        saveData();

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        deleteBtn.classList.add("delete-btn");
        li.appendChild(deleteBtn);
    }
    inputText.value = "";
    saveData();
}

listContainer.addEventListener(
    "click",
    (e) => {
        if (e.target.tagName === "SPAN") {
            e.target.classList.toggle("checked");
            saveData();
        } else if (e.target.className === "delete-btn") {
            e.target.parentElement.remove();
            saveData();
        }
        // else if (e.target.classList.contains("edit-btn")) {
        //     editBtn(e.target.parentElement);
        // }
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
