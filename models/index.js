const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config.json")["development"];
const sequelize = new Sequelize(config);

const Employee = sequelize.define("Employee", {
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Departments",
      key: "id",
    },
  },
});

const Department = sequelize.define("Department", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Hierarchy = sequelize.define("Hierarchy", {
  supervisorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: "employeeId",
    },
  },
  subordinateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: "employeeId",
    },
  },
});

const TimeEntry = sequelize.define("TimeEntry", {
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: "employeeId",
    },
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  breakTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const LeaveRequest = sequelize.define("LeaveRequest", {
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: "employeeId",
    },
  },
  supervisorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: "employeeId",
    },
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
});

Employee.belongsTo(Department, { foreignKey: "departmentId" });
Hierarchy.belongsTo(Employee, { as: "Supervisor", foreignKey: "supervisorId" });
Hierarchy.belongsTo(Employee, {
  as: "Subordinate",
  foreignKey: "subordinateId",
});
TimeEntry.belongsTo(Employee, { foreignKey: "employeeId" });
LeaveRequest.belongsTo(Employee, { as: "Employee", foreignKey: "employeeId" });
LeaveRequest.belongsTo(Employee, {
  as: "Supervisor",
  foreignKey: "supervisorId",
});

sequelize.sync();

module.exports = {
  sequelize,
  Employee,
  Department,
  Hierarchy,
  TimeEntry,
  LeaveRequest,
};
