const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

// view all roles
router.get("/api/employees", (req, res) => {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Create an employee
router.post("/employee", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "role_id",
    "department_id"
  );
  if (errors) {
    const sql = `INSERT INTO role (first_name, last_name, role_id, manager_id)
          VALUES (?)`;
    const params = [
      body.first_name,
      body.last_name,
      body.role_id,
      body.manager_id,
    ];

    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: body,
      });
    });
    res.status(400).json({ error: errors });
    return;
  }
});

// Update employee role
router.put("/employee/:id", (req, res) => {
  const errors = inputCheck(req.body, "role_id");

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE employee SET role_id = ? 
                   WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: "employee not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

module.exports = router;
