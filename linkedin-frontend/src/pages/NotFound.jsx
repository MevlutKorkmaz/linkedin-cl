// src/pages/NotFound.jsx

import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function NotFound() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ marginLeft: "220px", padding: "2rem", flex: 1, textAlign: "center" }}>
        <h1>🚫 404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </main>
    </div>
  );
}
