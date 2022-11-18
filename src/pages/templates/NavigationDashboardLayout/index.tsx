import React from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

const drawerWidth = 240;

const NavigationDashboardLayout: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h4" noWrap component="div">
            Logo
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          [theme.breakpoints.down('md')]: {
            display: 'none'
          },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List sx={{ paddingTop: 3 }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Início" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 9.5 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default NavigationDashboardLayout;
