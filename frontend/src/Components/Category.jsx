import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((res) => {
        if (res.data.Status) {
          setCategory(res.data.Result);
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ px: 5, mt: 3 }}>
      <Box display="flex" justifyContent="center" mb={2}>
        <Typography variant="h5">Category List</Typography>
      </Box>

      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Button
          variant="contained"
          component={Link}
          to="/dashboard/add_category"
          color="success"
        >
          Add Category
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Category Name</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category.map((cat, index) => (
              <TableRow key={index}>
                <TableCell>{cat.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Category;
