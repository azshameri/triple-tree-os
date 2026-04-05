"use client";
import { useState, useEffect } from "react";

export default function Routine() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    category: "Care",
    min: "",
    max: ""
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.name) return;

    setTasks([...tasks, { id: Date.now(), ...newTask }]);

    setNewTask({ name: "", category: "Care", min: "", max: "" });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <Nav />

      <h1>Routine Builder</h1>

      <input
        placeholder="Task name"
        value={newTask.name}
        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
      />

      <select
        value={newTask.category}
        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
      >
        <option>Care</option>
        <option>Create</option>
        <option>Consume</option>
      </select>

      <input
        placeholder="Minimum"
        value={newTask.min}
        onChange={(e) => setNewTask({ ...newTask, min: e.target.value })}
      />

      <input
        placeholder="Maximum"
        value={newTask.max}
        onChange={(e) => setNewTask({ ...newTask, max: e.target.value })}
      />

      <button onClick={addTask}>Add Task</button>

      <h3>Your Tasks</h3>

      {tasks.map((t) => (
        <div key={t.id}>
          {t.name} ({t.category})
          <br />
          min: {t.min} | max: {t.max}
          <br />
          <button onClick={() => deleteTask(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

function Nav() {
  return (
    <nav style={{ marginBottom: 20 }}>
      <a href="/">Home</a> |{" "}
      <a href="/routine">Routine</a> |{" "}
      <a href="/weekly">Weekly</a> |{" "}
      <a href="/streaks">Streaks</a> |{" "}
      <a href="/goals">Goals</a>
    </nav>
  );
}
