import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Chip
} from "@mui/material";

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/leave/all");
      
      if (res.data.success) {
        setLeaves(res.data.Result);
      } else {
        console.error("Server error:", res.data.message);
      }
    } catch (err) {
      console.error("Failed to fetch leaves:", err.message || err);
    }
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:3000/auth/leave/update/${id}`, { status });
    fetchLeaves();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>All Leave Requests</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.name}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>
                <Chip
                  label={leave.status}
                  color={
                    leave.status === "approved"
                      ? "success"
                      : leave.status === "rejected"
                      ? "error"
                      : "warning"
                  }
                />
              </TableCell>
              <TableCell>
                {leave.status === "pending" && (
                  <>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => updateStatus(leave.id, "approved")}
                      sx={{ mr: 1 }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => updateStatus(leave.id, "rejected")}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default LeaveList;
