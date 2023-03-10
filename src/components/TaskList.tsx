import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    if (!newTaskTitle) return; //Quando eu coloco o sinal de negação , eu transformo o valor do useState em booleano ou seja, quando ele for true(Com este código ele não vai criar uma task com valor vazio ou seja, se não tiver valor) se eu colocar duas exclamações ele é false, uma ele é true, ele ja começa true, ja começa vazio

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false, //Começa como false, pq a gente não quer adicionar uma task que já esteja completa
    };
    setTasks((oldState) => [...oldState, newTask]); //Estou utilizando em formato de callback , pegando o valor antigo(Estou utilizando o spread operator ... =>ele Pega todos os valores que tinha antigamente)
    //Perceba que eu to pegando todos os valores antigos dentro do setTasks e estou mesclando , juntando com o newTask, ele vai salvar no nosso setTask, o nosso id,title e o isComplete
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTasks = tasks.map((task) =>
      task.id == id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const FilteredTasks = tasks.filter((task) => task.id != id);
    setTasks(FilteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
