import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <Header />
      <AppRouter />
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}