import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "./routes";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <MainRoutes />
      </Router>
    </React.Fragment>
  );
};

export default App;
