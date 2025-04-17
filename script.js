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
                // Сохраняем изменения при завершении редактирования
                const input = li.querySelector('input[type="text"]');
                span.innerText = input.value; // Берем значение из input
                li.removeChild(input);
                li.classList.remove("editing");
                li.prepend(span);
                editBtn.textContent = "✎";
                saveData(); // Добавляем сохранение данных
            } else {
                const input = document.createElement("input");
                input.type = "text";
                input.value = span.textContent;
                li.insertBefore(input, span);
                li.removeChild(span);
                li.classList.add("editing");
                editBtn.textContent = "✓"; // Изменяем на галочку для сохранения
                input.focus();

                // Добавляем обработчик Enter для сохранения
                input.addEventListener("keydown", function (e) {
                    if (e.key === "Enter") {
                        editBtn.click(); // Имитируем клик на кнопке редактирования
                    }
                });
            }
        });

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
    },
    false
);

function saveData() {
    // Получаем все элементы списка
    const items = Array.from(listContainer.querySelectorAll("li"));

    // Сортируем: сначала невыполненные, затем выполненные
    items.sort((a, b) => {
        const aChecked = a.querySelector("span").classList.contains("checked");
        const bChecked = b.querySelector("span").classList.contains("checked");
        return aChecked - bChecked;
    });

    // Очищаем контейнер и добавляем отсортированные элементы
    listContainer.innerHTML = "";
    items.forEach((item) => listContainer.appendChild(item));

    // Сохраняем в localStorage
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    // После загрузки нужно повторно привязать обработчики событий
    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            const li = this.parentElement;
            const isEditing = li.classList.contains("editing");
            if (isEditing) {
                const span = document.createElement("span");
                span.textContent = li.querySelector("input").value;
                li.prepend(span);
                li.removeChild(li.querySelector("input"));
                li.classList.remove("editing");
                this.textContent = "✎";
                saveData();
            } else {
                const span = li.querySelector("span");
                const input = document.createElement("input");
                input.type = "text";
                input.value = span.textContent;
                li.insertBefore(input, span);
                li.removeChild(span);
                li.classList.add("editing");
                this.textContent = "✓";
                input.focus();

                input.addEventListener("keydown", function (e) {
                    if (e.key === "Enter") {
                        btn.click();
                    }
                });
            }
        });
    });
}
showTask();
