import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import App from "./Components/LoginPage";
import App from "./Components/HomeScreen";
// import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
