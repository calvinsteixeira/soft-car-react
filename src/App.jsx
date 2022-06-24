import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
