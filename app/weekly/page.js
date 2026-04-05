export default function Weekly() {
  return (
    <div style={{ padding: 20 }}>
      <Nav />
      <h1>Weekly</h1>
      <p>Weekly tracking coming next</p>
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
