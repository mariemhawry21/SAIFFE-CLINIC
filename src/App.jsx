import AppRoutes from "./routes/AppRoutes";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline /> {/* ← This resets browser styles */}
      <AppRoutes />
    </>
  );
}

export default App;
