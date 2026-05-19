import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CreatePaste from "./pages/CreatePaste";
import ViewPaste from "./pages/ViewPaste";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route → redirect to create paste page */}
          <Route path="/" element={<Navigate to="/create" />} />

          {/* Create new paste */}
          <Route path="/create" element={<CreatePaste />} />

          {/* View paste by ID */}
          <Route path="/paste/:id" element={<ViewPaste />} />

          {/* 404 fallback */}
          <Route path="*" element={<h2 style={{ textAlign: "center", marginTop: "50px" }}>Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
