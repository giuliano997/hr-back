const createWorkHour = (
  db,
  userId,
  workDate,
  hoursWorked,
  breakStart,
  breakEnd,
  callback
) => {
  const sql = `INSERT INTO work_hours (user_id, work_date, hours_worked, break_start, break_end) VALUES (?, ?, ?, ?, ?)`;
  db.run(
    sql,
    [userId, workDate, hoursWorked, breakStart, breakEnd],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
};

module.exports = { createWorkHour };
