const express = require("express");
const {
  createLeaveRequest,
  updateLeaveRequestStatus,
} = require("../models/LeaveRequest");

module.exports = (db) => {
  const router = express.Router();

  router.post("/", (req, res) => {
    const { userId, startDate, endDate } = req.body;

    createLeaveRequest(db, userId, startDate, endDate, (err, result) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ success: true, requestId: result.id });
    });
  });

  router.post("/approve", (req, res) => {
    const { requestId, approve, approvedBy } = req.body;
    const status = approve ? "approved" : "rejected";

    updateLeaveRequestStatus(
      db,
      requestId,
      status,
      approvedBy,
      (err, result) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.status(200).json({ success: true, changes: result.changes });
      }
    );
  });

  return router;
};
