import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";

// import App from "./Components/LoginPage";
// import App from "./Components/HomeScreen";
import App from "./App";
Amplify.configure(awsExports);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
