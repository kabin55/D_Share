import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Files from "./pages/Files";
import Users from "./pages/Users";
import Performance from "./pages/Performance";
import Settings from "./pages/setting";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="files" element={<Files />} />
        <Route path="users" element={<Users />} />

        <Route path="performance" element={<Performance />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
