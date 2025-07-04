import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper, Stack } from "@mui/material";

const Start = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3000/verify")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/employee_detail/" + result.data.id);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
      gap={10}
      sx={{ backgroundColor: "#232e32" }}
    >
      <Typography variant="h3" align="center" mt={12} color="white">
        Leave Management
      </Typography>
      <Paper elevation={6} sx={{ p: 4, width: 300 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Login As
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="space-between" mt={5}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/employee_login")}
          >
            Employee
          </Button>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={() => navigate("/adminlogin")}
          >
            Admin
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Start;
