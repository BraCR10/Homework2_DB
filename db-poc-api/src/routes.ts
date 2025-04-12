import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  getEmployeesSortedByName,
} from "./controllers/Employee.controller";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
});

router.get("/employee", getEmployees);
router.get("/employee/sorted", getEmployeesSortedByName);
router.post("/employee", createEmployee);

// router.patch("/employee/", updateEmployee);
// router.post("employee/deleteTry", deleteTry);
// router.delete("/employee/", deleteEmployee);
// router.get("/employee/name/:employeeName", getEmployeeByName);
// router.get("/employee/name/DNI/:employeeDNI", getEmployeeById);
// router.get("login", login);
// router.get("logout", logout);
// router.get("movement/:idEmpleado", getMovementsByIdEmployee);
// router.get("movement", getMovements);
// router.get("movementType", getMovementTypes);
// router.get("position", getPositions);






export default router;
