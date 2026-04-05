export default function Streaks() {
  return (
    <div style={{ padding: 20 }}>
      <Nav />
      <h1>Streaks</h1>
      <p>Streak system coming next</p>
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
