"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Nav />

      <h1>🌳 Home</h1>

      {tasks.length === 0 && <p>No tasks yet. Go to Routine.</p>}

      {tasks.map((t) => (
        <div key={t.id}>
          <strong>{t.name}</strong> ({t.category})  
          <br />
          min: {t.min} | max: {t.max}
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
