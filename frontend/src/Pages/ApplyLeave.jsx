import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Box
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ApplyLeave = () => {
  const [reason, setReason] = useState('');
  const [msg, setMsg] = useState('');
  const { id } = useParams();
  const navigate = useNavigate()


  const handleSubmit = async () => {
    if (!reason.trim()) {
      setMsg('Please enter a reason before submitting.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/employee/leave/apply', {
        employee_id: id,
        reason
      });

      if (res.data.success) {
        setMsg('Leave request submitted successfully.');
        setReason('');
        navigate(`/employee_detail/${id}`)
      } else {
        setMsg('Failed to submit leave request. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting leave:', err);
      setMsg('Something went wrong. Try again later.');
    }
  };

  return (
    <Container  style={{height: "100vh", background: "#232e32", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Leave Application
        </Typography>

        {msg && (
          <Alert severity={msg.includes('successfully') ? 'success' : 'error'} sx={{ mb: 2 }}>
            {msg}
          </Alert>
        )}

        <TextField
          label="Leave Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ApplyLeave;
