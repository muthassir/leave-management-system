import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      terms: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(4, "Too short").required("Password is required"),
      terms: Yup.boolean().oneOf([true], "Please accept terms & conditions"),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      axios
        .post("http://localhost:3000/employee/employee_login", {
          email: values.email,
          password: values.password,
        })
        .then((result) => {
          if (result.data.loginStatus) {
            localStorage.setItem("valid", true);
            navigate("/employee_detail/" + result.data.id);
          } else {
            setErrors({ server: result.data.Error });
          }
        })
        .catch((err) => {
          setErrors({ server: "Server error. Try again." });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "#232e32" }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Employee Login
        </Typography>

        {formik.errors.server && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formik.errors.server}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <FormControlLabel
            control={
              <Checkbox
                id="terms"
                name="terms"
                checked={formik.values.terms}
                onChange={formik.handleChange}
                color="primary"
              />
            }
            label="You agree with terms & conditions"
          />
          {formik.touched.terms && formik.errors.terms && (
            <Typography variant="caption" color="error">
              {formik.errors.terms}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            color="success"
            type="submit"
            sx={{ mt: 2 }}
          >
            Log in
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EmployeeLogin;
