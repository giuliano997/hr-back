const createLeaveRequest = (db, userId, startDate, endDate, callback) => {
  const sql = `INSERT INTO leave_requests (user_id, start_date, end_date) VALUES (?, ?, ?)`;
  db.run(sql, [userId, startDate, endDate], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID });
  });
};

const updateLeaveRequestStatus = (
  db,
  requestId,
  status,
  approvedBy,
  callback
) => {
  const sql = `UPDATE leave_requests SET status = ?, approved_by = ? WHERE id = ?`;
  db.run(sql, [status, approvedBy, requestId], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
};

module.exports = { createLeaveRequest, updateLeaveRequestStatus };
