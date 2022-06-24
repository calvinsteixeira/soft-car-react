import { Routes, Route } from "react-router-dom";
import { LoginView } from "../views/pages/LoginView";
import { RegisterView } from "../views/pages/RegisterView";
import { HomeView } from "../views/pages/HomeView";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="/novo-cadastro" element={<RegisterView />} />
      <Route path="/meus-carros" element={<HomeView />} />
    </Routes>
  );
}
