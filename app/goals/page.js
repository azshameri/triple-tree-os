export default function Goals() {
  return (
    <div style={{ padding: 20 }}>
      <Nav />
      <h1>Goals</h1>
      <p>Goals coming next</p>
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
