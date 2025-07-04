import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState({});
  const [leaveList, setLeaveList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/detail/${id}`)
      .then(res => {
        setEmployee(res.data[0]);
      })
      .catch(err => console.log(err));

    axios.get(`http://localhost:3000/employee/leave/${id}`)
      .then(res => {
        if (res.data.success) {
          setLeaveList(res.data.data);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(res => {
        if (res.data.Status) {
          localStorage.removeItem('valid');
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  };

  const handleLeaveApply = () => {
    navigate(`/employee_detail/${id}/apply_leave`);
  };

  return (
    <Box>
      <Box p={2} display="flex" justifyContent="center" boxShadow={2} bgcolor="#232e32" color="white">
        <Typography variant="h5">Employee Management System</Typography>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Avatar
          src={`http://localhost:3000/Images/${employee.image}`}
          alt={employee.name}
          sx={{ width: 120, height: 120, mb: 3 }}
        />

        <Paper elevation={3} sx={{ p: 3, width: '350px', textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>Name: {employee.name}</Typography>
          <Typography variant="h6" gutterBottom>Email: {employee.email}</Typography>
          <Typography variant="h6" gutterBottom>Salary: ${employee.salary}</Typography>

          <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
            <Button variant="contained" color="primary" onClick={handleLeaveApply}>
              Apply Leave
            </Button>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Paper>

        <Paper elevation={3} sx={{ mt: 5, p: 2, width: '80%', maxWidth: 600, bgcolor: '#232e32', color: 'white' }}>
          <Typography variant="h6" gutterBottom>Leave Status</Typography>
          {leaveList.length === 0 ? (
            <Typography variant="body2">No leave requests yet.</Typography>
          ) : (
            <List>
              {leaveList.map((leave) => (
                <React.Fragment key={leave.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Reason: ${leave.reason}`}
                      secondary={`Applied On: ${new Date(leave.created_at).toLocaleString()}`}
                    />
                    <Chip
                      label={leave.status}
                      color={
                        leave.status === 'approved'
                          ? 'success'
                          : leave.status === 'rejected'
                          ? 'error'
                          : 'warning'
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default EmployeeDetail;
