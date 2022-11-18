import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "./routes";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import {
  SettingsConsumer,
  SettingsProvider,
} from "./contexts/settings-context";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => (
            <ThemeProvider
              theme={createTheme({
                direction: settings.direction,
                responsiveFontSizes: settings.responsiveFontSizes,
                mode: settings.theme,
              })}
            >
              <CssBaseline />
              <Router>
                <MainRoutes />
              </Router>
            </ThemeProvider>
          )}
        </SettingsConsumer>
      </SettingsProvider>
    </React.Fragment>
  );
};

export default App;
