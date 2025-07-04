import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddCategory = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: Yup.object({
      category: Yup.string()
        .min(2, "Too short")
        .max(30, "Too long")
        .required("Category is required"),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      axios
        .post("http://localhost:3000/auth/add_category", values)
        .then((res) => {
          if (res.data.Status) {
            navigate("/dashboard/category");
          } else {
            setErrors({ server: res.data.Error });
          }
        })
        .catch(() => {
          setErrors({ server: "Something went wrong." });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h6" gutterBottom>
          Add Category
        </Typography>

        {formik.errors.server && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formik.errors.server}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="category"
            name="category"
            label="Category"
            value={formik.values.category}
            onChange={formik.handleChange}
            error={
              formik.touched.category && Boolean(formik.errors.category)
            }
            helperText={formik.touched.category && formik.errors.category}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            color="success"
            type="submit"
          >
            Add Category
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddCategory;
