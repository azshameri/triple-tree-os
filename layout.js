"use client";
import { useState } from "react";

export const metadata = {
  title: "Triple Tree OS",
  description: "Minimum counts. Maximum grows."
};

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

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");
  const t = themes[theme];

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: t.bg,
          color: t.text,
          fontFamily: "system-ui"
        }}
      >
        <div style={{ padding: 10 }}>
          <button
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        {children}
      </body>
    </html>
  );
}
