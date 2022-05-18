{
  let tasks = [];
  let hideDoneTasks = false;

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    const taskToHTML = (task) => `
              <li class="tasks__item ${
                task.done && hideDoneTasks ? "tasks__item--hidden" : ""
              } js-task">
                  <button class="tasks__button tasks__button--done js-done">
                      ${task.done ? "✔" : " "}
                  </button>
                  <span class="tasks__content${
                    task.done ? " tasks__content--done" : ""
                  }">
                      ${task.content}
                  </span>
                  <button class="tasks__button tasks__button--remove js-remove">🗑</button>
              </li>
      `;

    const tasksElement = document.querySelector(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");
    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }

    buttonsElement.innerHTML = `
      <button class="buttons__button js-toggleHideDoneTasks">
          ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
      </button>
      <button class="buttons__button js-markAllDone"
      ${tasks.every(({ done }) => done) ? "disabled" : ""}
      >
      Ukończ wszystkie
      </button>`;
  };

  const bindButtonEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");
    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllTasksDone);
    }

    const toggleHideDoneTasksButton = document.querySelector(
      ".js-toggleHideDoneTasks"
    );

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const onFormSumbit = (event) => {
    event.preventDefault();

    const newElement = document.querySelector(".js-newTask").value.trim();
    const newTaskContent = document.querySelector(".js-newTask");

    if (newElement !== "") {
      addNewTask(newElement);
      newTaskContent.value = "";
    }
    newTaskContent.focus();
  };

  const render = () => {
    renderTasks();
    bindRemoveEvents();
    bindToggleDoneEvents();
    renderButtons();
    bindButtonEvents();
  };

  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSumbit);
  };

  init();
}
