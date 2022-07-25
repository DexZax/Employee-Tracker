const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

// view all roles
router.get("/api/roles", (req, res) => {
  const sql = `SELECT * FROM role`;
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

// Create a role
router.post("/role", ({ body }, res) => {
  const errors = inputCheck(body, "title", "salary", "department_id");
  if (errors) {
    const sql = `INSERT INTO role (title, salary, department_id)
          VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.department_id];

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

module.exports = router;
