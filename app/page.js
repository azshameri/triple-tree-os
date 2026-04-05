"use client";
import { useState, useEffect } from "react";

/* ---------- THEMES ---------- */

const themes = {
  light: {
    bg: "#f4f7f4",
    card: "#ffffff",
    text: "#2f5d50",
    sub: "#6b8f7a",
    accent: "#7bcf9a"
  },
  dark: {
    bg: "#1f2a25",
    card: "#2c3a33",
    text: "#d7f2e3",
    sub: "#9ecfb6",
    accent: "#7bcf9a"
  }
};

/* ---------- HELPERS ---------- */

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getWeekDates() {
  const today = new Date();
  const day = today.getDay();

  const start = new Date(today);
  start.setDate(today.getDate() - day);

  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d.toISOString().split("T")[0];
  });
}

/* ---------- DEFAULT DATA ---------- */

const defaultTasks = [
  { id: 1, name: "Drink water", category: "Care", min: "1 glass", max: "2L" },
  { id: 2, name: "Study", category: "Consume", min: "10 min", max: "1 hour" },
  { id: 3, name: "Create content", category: "Create", min: "1 post", max: "3 posts" }
];

const defaultGoals = {
  Care: { current: 0, target: 12 },
  Create: { current: 0, target: 500 },
  Consume: { current: 0, target: 100 }
};

/* ---------- APP ---------- */

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [state, setState] = useState({});
  const [energyLog, setEnergyLog] = useState({});
  const [energy, setEnergy] = useState("Medium");
  const [badDay, setBadDay] = useState(false);
  const [goals, setGoals] = useState(defaultGoals);
  const [theme, setTheme] = useState("light");
  const [isPro, setIsPro] = useState(false);

  const t = themes[theme];
  const today = getTodayKey();
  const weekDates = getWeekDates();

  /* ---------- LOAD ---------- */

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")) || defaultTasks);
    setState(JSON.parse(localStorage.getItem("state")) || {});
    setGoals(JSON.parse(localStorage.getItem("goals")) || defaultGoals);
    setEnergyLog(JSON.parse(localStorage.getItem("energyLog")) || {});
  }, []);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
    localStorage.setItem("goals", JSON.stringify(goals));
    localStorage.setItem("energyLog", JSON.stringify(energyLog));
  }, [state, goals, energyLog]);

  /* ---------- TASK LOGIC ---------- */

  const isMinDone = (id) => state[today]?.[id]?.min;
  const isMaxDone = (id) => state[today]?.[id]?.max;

  const toggleMin = (id) => {
    setState((prev) => ({
      ...prev,
      [today]: {
        ...prev[today],
        [id]: { ...prev[today]?.[id], min: !prev[today]?.[id]?.min }
      }
    }));
  };

  const toggleMax = (id) => {
    setState((prev) => ({
      ...prev,
      [today]: {
        ...prev[today],
        [id]: { ...prev[today]?.[id], max: !prev[today]?.[id]?.max }
      }
    }));
  };

  const allMinComplete =
    tasks.length > 0 && tasks.every((t) => isMinDone(t.id));

  /* ---------- ENERGY ---------- */

  const updateEnergy = (val) => {
    setEnergy(val);
    setEnergyLog((prev) => ({
      ...prev,
      [today]: val
    }));
  };

  /* ---------- WEEKLY STATUS ---------- */

  const getDayStatus = (date) => {
    const dayTasks = state[date];
    if (!dayTasks) return { min: false, max: false };

    const ids = Object.keys(dayTasks);
    const min = ids.length > 0 && ids.every(id => dayTasks[id]?.min);
    const max = ids.length > 0 && ids.every(id => dayTasks[id]?.max);

    return { min, max };
  };

  /* ---------- STREAK ---------- */

  const minStreak = Object.keys(state).length;

  /* ---------- ENERGY GRAPH ---------- */

  const energyValue = (val) => {
    if (val === "Low") return 1;
    if (val === "Medium") return 2;
    if (val === "High") return 3;
    return 0;
  };

  /* ---------- UI ---------- */

  return (
    <div style={{
      background: t.bg,
      color: t.text,
      minHeight: "100vh",
      padding: 20,
      fontFamily: "system-ui",
      maxWidth: 520,
      margin: "auto"
    }}>

      <h1>🌳 Triple Tree OS</h1>

      {/* THEME */}
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      {/* ENERGY */}
      <div style={card(t)}>
        <h3>Energy</h3>
        <select value={energy} onChange={(e) => updateEnergy(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        {/* ENERGY GRAPH */}
        <div style={{ display: "flex", marginTop: 10 }}>
          {weekDates.map((d) => (
            <div key={d} style={{
              width: 20,
              height: energyValue(energyLog[d]) * 15 || 5,
              background: t.accent,
              marginRight: 5,
              borderRadius: 4
            }} />
          ))}
        </div>
      </div>

      {/* BAD DAY */}
      <div style={card(t)}>
        <label>
          <input type="checkbox" checked={badDay} onChange={() => setBadDay(!badDay)} />
          Low Capacity Day
        </label>
      </div>

      {/* MINIMUM */}
      <div style={card(t)}>
        <h2>🌱 Minimum</h2>
        {tasks.map((task) => (
          <div key={task.id}>
            <input type="checkbox" checked={!!isMinDone(task.id)} onChange={() => toggleMin(task.id)} />
            {task.name} — <span style={{ color: t.sub }}>{task.min}</span>
          </div>
        ))}
      </div>

      {/* MAXIMUM */}
      {!badDay && (
        <div style={card(t)}>
          <h2 style={{ opacity: allMinComplete ? 1 : 0.5 }}>🌿 Maximum</h2>
          {tasks.map((task) =>
            allMinComplete ? (
              <div key={task.id}>
                <input type="checkbox" checked={!!isMaxDone(task.id)} onChange={() => toggleMax(task.id)} />
                {task.name} — <span style={{ color: t.sub }}>{task.max}</span>
              </div>
            ) : (
              <div key={task.id}>🔒 Locked</div>
            )
          )}
        </div>
      )}

      {/* WEEKLY */}
      <div style={card(t)}>
        <h3>📅 Weekly</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {weekDates.map((date) => {
            const s = getDayStatus(date);
            return (
              <div key={date} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 12 }}>
                  {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div>{s.min ? "🌱" : "○"}</div>
                <div>{s.max ? "🌿" : ""}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* GOALS */}
      <div style={card(t)}>
        <h3>🎯 Goals</h3>
        {Object.keys(goals).map((key) => (
          <div key={key}>
            {key}: {goals[key].current} / {goals[key].target}
          </div>
        ))}
      </div>

      {/* STREAK */}
      <div style={card(t)}>
        <h3>🔥 Streak</h3>
        <p>{minStreak} days showing up</p>
      </div>

      {/* PRO */}
      {!isPro && (
        <div style={{ ...card(t), background: t.accent, color: "#fff" }}>
          🌿 Pro coming soon
        </div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */

const card = (t) => ({
  background: t.card,
  padding: 15,
  marginBottom: 15,
  borderRadius: 12,
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
});
