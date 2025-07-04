import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [category, setCategory] = useState([]);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

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

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      salary: "",
      address: "",
      category_id: "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(4, "Too short").required("Required"),
      salary: Yup.number().typeError("Must be a number").required("Required"),
      address: Yup.string().required("Required"),
      category_id: Yup.string().required("Select a category"),
      image: Yup.mixed().required("Image required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }

      axios
        .post("http://localhost:3000/auth/add_employee", formData)
        .then((res) => {
          if (res.data.Status) {
            navigate("/dashboard/employee");
          } else {
            setServerError(res.data.Error || "Something went wrong.");
          }
        })
        .catch(() => setServerError("Server error. Try again later."))
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper elevation={3} sx={{ p: 4, width: 500 }}>
        <Typography variant="h5" gutterBottom>
          Add Employee
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            autoComplete="off"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            label="Salary"
            name="salary"
            margin="normal"
            value={formik.values.salary}
            onChange={formik.handleChange}
            error={formik.touched.salary && Boolean(formik.errors.salary)}
            helperText={formik.touched.salary && formik.errors.salary}
          />

          <TextField
            fullWidth
            label="Address"
            name="address"
            margin="normal"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />

          <FormControl fullWidth sx={{ mt: 2 }} error={formik.touched.category_id && Boolean(formik.errors.category_id)}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category_id"
              value={formik.values.category_id}
              label="Category"
              onChange={formik.handleChange}
            >
              {category.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.category_id && formik.errors.category_id && (
              <Typography variant="caption" color="error">
                {formik.errors.category_id}
              </Typography>
            )}
          </FormControl>

          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2 }}
            fullWidth
          >
            Upload Image
            <input
              type="file"
              hidden
              name="image"
              onChange={(e) =>
                formik.setFieldValue("image", e.currentTarget.files[0])
              }
            />
          </Button>
          {formik.touched.image && formik.errors.image && (
            <Typography variant="caption" color="error">
              {formik.errors.image}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 3 }}
          >
            Add Employee
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddEmployee;
