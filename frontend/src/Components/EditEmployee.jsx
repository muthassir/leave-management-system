import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
} from '@mui/material';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    salary: '',
    address: '',
    category_id: '',
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/category')
      .then((res) => {
        if (res.data.Status) {
          setCategory(res.data.Result);
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:3000/auth/employee/' + id)
      .then((res) => {
        const emp = res.data.Result[0];
        setEmployee({
          name: emp.name,
          email: emp.email,
          salary: emp.salary,
          address: emp.address,
          category_id: emp.category_id,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:3000/auth/edit_employee/' + id, employee)
      .then((res) => {
        if (res.data.Status) {
          navigate('/dashboard/employee');
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper elevation={3} sx={{ p: 3, width: '50%' }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Edit Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={employee.name}
            onChange={(e) =>
              setEmployee({ ...employee, name: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            autoComplete="off"
            value={employee.email}
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }
          />
          <TextField
            label="Salary"
            fullWidth
            margin="normal"
            type="text"
            autoComplete="off"
            value={employee.salary}
            onChange={(e) =>
              setEmployee({ ...employee, salary: e.target.value })
            }
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={employee.address}
            onChange={(e) =>
              setEmployee({ ...employee, address: e.target.value })
            }
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={employee.category_id}
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
              label="Category"
            >
              {category.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Update Employee
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditEmployee;
