import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { configDotenv } from 'dotenv';
configDotenv()

const router = express.Router()

// employee kogin
router.post("/employee_login", (req, res) => {
    const sql = "SELECT * from employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response) {
                const email = result[0].email;
                const token = jwt.sign(
                    { role: "employee", email: email, id: result[0].id },
                    process.env.TOKEN,
                    { expiresIn: "1d" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id });
            }
        })
        
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
  });

// employee details
  router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
  })

  // logout employee
  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })


// leave apply
router.post('/leave/apply', (req, res) => {
  const { employee_id, reason } = req.body;
  const sql = "INSERT INTO leave_requests (employee_id, reason, status) VALUES (?, ?, 'pending')";
  con.query(sql, [employee_id, reason], (err, result) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// leave status
router.get('/leave/:employee_id', (req, res) => {
  const { employee_id } = req.params;
  const sql = "SELECT * FROM leave_requests WHERE employee_id = ? ORDER BY created_at DESC";
  con.query(sql, [employee_id], (err, result) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: result });
    
  });
});

  export {router as EmployeeRouter}