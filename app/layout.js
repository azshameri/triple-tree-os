export const metadata = {
  title: "Triple Tree OS",
  description: "Minimum counts. Maximum grows."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui",
          background: "#f4f7f4",
          color: "#2f5d50"
        }}
      >
        <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
          <nav
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
              fontSize: 14,
              color: "#6b8f7a"
            }}
          >
            <a href="/" style={link}>Home</a>
            <a href="/routine" style={link}>Routine</a>
            <a href="/weekly" style={link}>Weekly</a>
            <a href="/streaks" style={link}>Streaks</a>
            <a href="/goals" style={link}>Goals</a>
          </nav>

          {children}
        </div>
      </body>
    </html>
  );
}

const link = {
  textDecoration: "none",
  color: "#4f7f6b"
};
