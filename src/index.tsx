import ReactDOM from "react-dom/client";
import App from "./App";

(global as any).HOST = "http://localhost:8080";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
