import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Avatar,
  Stack,
} from "@mui/material";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((res) => {
        if (res.data.Status) {
          setEmployee(res.data.Result);
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/auth/delete_employee/${id}`)
      .then((res) => {
        if (res.data.Status) {
          setEmployee((prev) => prev.filter((emp) => emp.id !== id));
        } else {
          alert(res.data.Error);
        }
      });
  };

  return (
    <Box sx={{ px: 5, mt: 3 }}>
      <Box display="flex" justifyContent="center" mb={2}>
        <Typography variant="h5">Employee List</Typography>
      </Box>

      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Button
          variant="contained"
          component={Link}
          to="/dashboard/add_employee"
          color="success"
        >
          Add Employee
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Image</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Salary</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{e.name}</TableCell>
                <TableCell>
                  <Avatar
                    src={`http://localhost:3000/Images/${e.image}`}
                    alt={e.name}
                    sx={{ width: 40, height: 40 }}
                  />
                </TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e.address}</TableCell>
                <TableCell>${e.salary}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/dashboard/edit_employee/${e.id}`}
                      color="info"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Employee;
