import React from "react";
import { Outlet, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  AppBar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";
import { BsSpeedometer2, BsPeople, BsBoxArrowRight } from "react-icons/bs";
import { MdCategory, MdPerson } from "react-icons/md";
import axios from "axios";

const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((res) => {
      if (res.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };

  const navItems = [
    { text: "Dashboard", icon: <BsSpeedometer2 />, path: "/dashboard" },
    { text: "Manage Employees", icon: <BsPeople />, path: "/dashboard/employee" },
    { text: "Category", icon: <MdCategory />, path: "/dashboard/category" },
    { text: "Leave List", icon: <MdPerson />, path: "/dashboard/leavelist" },
  ];

  return (
    <Box sx={{ display: "flex"}}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: 1201 }} style={{backgroundColor: "#232e32"}}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Employee Leave Management System
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#232e32",
            color: "white",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", mt: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={item.path}
                  sx={{ color: "#fff" }}
                >
                  <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ my: 1, backgroundColor: "#555" }} />

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout} sx={{ color: "#fff" }}>
                <ListItemIcon sx={{ color: "#fff" }}>
                  <BsBoxArrowRight />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f5f5",
          p: 3,
          minHeight: "100vh",
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
