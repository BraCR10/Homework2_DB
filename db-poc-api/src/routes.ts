import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  tryDeleteEmployee,
  getEmployeeByName,
  getEmployeeByDNI,
} from "./controllers/Employee.controller";
import { loginUser, logoutUser } from "./controllers/Login.controller";
import {
  getEmployeeMovements,
  createMovement,
  getMovementsTypes,
} from "./controllers/Movement.controller";
import { getPositions } from "./controllers/Positions.controller";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
});

// Employee routes
router.get("/employee", getEmployees);
router.post("/employee", createEmployee);
router.patch("/employee/:IdEmpelado", updateEmployee);
router.delete("/employee/:IdEmpelado", deleteEmployee);
router.post("/employee/deleteTry/:IdEmpelado", tryDeleteEmployee);
router.get("/employee/name/:employeeName", getEmployeeByName);
router.get("/employee/DNI/:employeeDNI", getEmployeeByDNI);

// Movement routes
router.get("/movement/:idEmpleado", getEmployeeMovements);
router.post("/movement", createMovement);
router.get("/movementType", getMovementsTypes);

// Position routes
router.get("/position", getPositions);

// Login routes
router.post("/logout", logoutUser);
router.post("/login", loginUser);

export default router;
