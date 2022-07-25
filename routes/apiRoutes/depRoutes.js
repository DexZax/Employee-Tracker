const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

// view all departments
router.get("/api/departments", (req, res) => {
  const sql = `SELECT * FROM department`;
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

// Create a department
router.post("/department", ({ body }, res) => {
  const errors = inputCheck(body, "dep_name");
  if (errors) {
    const sql = `INSERT INTO department (dep_name)
          VALUES (?)`;
    const params = [body.dep_name];

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
