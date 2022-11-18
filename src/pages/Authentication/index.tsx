import React from "react";
import { Paper, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Authentication: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          p: 3,
          maxWidth: 600,
          width: "100%",
          height: "35vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "100%", maxWidth: 400 }}
          component={Link}
          to="/dashboard"
        >
          Entrar
        </Button>
      </Paper>
    </Box>
  );
};

export default Authentication;
