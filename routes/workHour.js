const express = require("express");
const { createWorkHour } = require("../models/WorkHour");

module.exports = (db) => {
  const router = express.Router();

  router.post("/", (req, res) => {
    const { userId, workDate, hoursWorked, breakStart, breakEnd } = req.body;

    createWorkHour(
      db,
      userId,
      workDate,
      hoursWorked,
      breakStart,
      breakEnd,
      (err, result) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ success: true, workHourId: result.id });
      }
    );
  });

  return router;
};
