import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function Task({ task, index, completeTask, removeTask }) {
  return (
    <div className="task">
      {task.title}
      <button onClick={() => removeTask(index)}>remove</button>
      <button onClick={() => completeTask(index)}>completeTask</button>
    </div>
  );
}

function CreateTask({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="add task"
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

const App = () => {
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasks, setTasks] = useState([
    {
      title: "Do some coding",
      completed: true,
    },
    {
      title: "Preparing Food",
      completed: true,
    },
    {
      title: "Use facebook",
      completed: false,
    },
  ]);
  useEffect(() => {
    setTasksRemaining(tasks.filter((task) => !task.completed).length);
  },);

  const addTask = (title) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };
  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div className="App">

      <div className="taskremain">
        <p>TasksRemaining</p>
        {tasksRemaining}</div>
      <div className="tasks">
        {tasks.map((task, index) => {
          return (
            <Task
              task={task}
              index={index}
              completeTask={completeTask}
              removeTask={removeTask}
              key={index}
            />
          );
        })}
        <div className="create-task">
          <CreateTask addTask={addTask} />
        </div>
      </div>
    </div>
  );
};

export default App;
