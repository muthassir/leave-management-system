import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Container,
  Divider,
} from "@mui/material";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    axios.get("http://localhost:3000/auth/admin_count").then((res) => {
      if (res.data.Status) setAdminTotal(res.data.Result[0].admin);
    });

    axios.get("http://localhost:3000/auth/employee_count").then((res) => {
      if (res.data.Status) setEmployeeTotal(res.data.Result[0].employee);
    });

    axios.get("http://localhost:3000/auth/salary_count").then((res) => {
      if (res.data.Status) setSalaryTotal(res.data.Result[0].salaryOFEmp);
    });

    axios.get("http://localhost:3000/auth/admin_records").then((res) => {
      if (res.data.Status) setAdmins(res.data.Result);
    });
  };

  return (
    <Container  sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Admin
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography>Total:</Typography>
                <Typography>{adminTotal}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Employee
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography>Total:</Typography>
                <Typography>{employeeTotal}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Salary
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography>Total:</Typography>
                <Typography>${salaryTotal}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          List of Admins
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((a, i) => (
              <TableRow key={i}>
                <TableCell>{a.email}</TableCell>
                <TableCell>
            
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default Home;
