const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// SQLite database setup
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  // Create tables
  db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        supervisor_id INTEGER,
        FOREIGN KEY (supervisor_id) REFERENCES users (id)
    )`);

  db.run(`CREATE TABLE work_hours (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        work_date DATE NOT NULL,
        hours_worked DECIMAL(5, 2) NOT NULL,
        break_start TIME,
        break_end TIME,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

  db.run(`CREATE TABLE leave_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status TEXT DEFAULT 'pending',
        approved_by INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (approved_by) REFERENCES users (id)
    )`);
});

app.use("/leave-requests", require("./routes/leaveRequest")(db));
app.use("/work-hours", require("./routes/workHour")(db));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = db;
