const createUser = (db, email, name, role, supervisorId, callback) => {
  const sql = `INSERT INTO users (email, name, role, supervisor_id) VALUES (?, ?, ?, ?)`;
  db.run(sql, [email, name, role, supervisorId], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID });
  });
};

module.exports = { createUser };
