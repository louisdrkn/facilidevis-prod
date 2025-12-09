import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("🚀 [MAIN] Page Start - Initialisation React");

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("❌ [MAIN] Root element not found!");
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);
console.log("✅ [MAIN] React app rendered");
