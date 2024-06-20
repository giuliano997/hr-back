const express = require("express");
const router = express.Router();
const { Employee, Department } = require("../models");

router.get("/", async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
});

router.post("/", async (req, res) => {
  const employee = await Employee.create(req.body);
  res.json(employee);
});

router.get("/:id", async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  res.json(employee);
});

router.put("/:id", async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  await employee.update(req.body);
  res.json(employee);
});

router.delete("/:id", async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  await employee.destroy();
  res.json({ message: "Employee deleted" });
});

router.get("/departments", async (req, res) => {
  const departments = await Department.findAll();
  res.json(departments);
});

router.post("/departments", async (req, res) => {
  const department = await Department.create(req.body);
  res.json(department);
});
