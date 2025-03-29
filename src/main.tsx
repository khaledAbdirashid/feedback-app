import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { FeedbackContextProvider } from "./context/Feedback.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <FeedbackContextProvider>
        <App />
      </FeedbackContextProvider>
    </BrowserRouter>
  </StrictMode>
);
