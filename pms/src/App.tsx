import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { defaultPMSTheme } from "./config/theme";
import { Home } from "./pages/Home";


function App() {
  return (
    <ThemeProvider theme={defaultPMSTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
