import { Request, Response } from "express";
import EmployeeService from "../services/Employee.service";
import {
  GetEmployeesSuccessResponseDTO, 
  EmployeesErrorResponseDTO,
  CreateEmployeesDTO,
  CreateEmployeesSuccessResponseDTO 
} from "./../dtos/EmployeeDTO";

export const createEmployee = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data : CreateEmployeesDTO = req.body;

    if (!data.NombreEmpleado || !data.ValorDocumentoIdentidad || !data.NombrePuesto) {
      console.error("Request body is required.");
      const errorResponse: EmployeesErrorResponseDTO = { success:false , code: 400, details: "Request body is required." };
      res.status(400).json({ success: false, error: errorResponse });
      return;
    }

    const response = await EmployeeService.createEmployee(data);

    if (response.success) {
      const { success, data: employeeData } = response as CreateEmployeesSuccessResponseDTO;
      res.status(201).json({ success, data: employeeData });
    } else {
      const { success, code, details } = response as EmployeesErrorResponseDTO;
      res.status(500).json({ success, error: { code, details } });
    }
  } catch (error) {
    console.error("Error during employee creation:", error);
    const errorMessage: EmployeesErrorResponseDTO = { success:false , code: 50008, details: "An error occurred while creating the employee" };
    res.status(500).json({ success: errorMessage.success, error: { code: errorMessage.code, details: errorMessage.details } });
  }
};

export const getEmployees = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const response = await EmployeeService.getEmployees();
    if (response.success) {
      const { success, data } = response as GetEmployeesSuccessResponseDTO;
      res.status(200).json({ success, data });
    } else {
      const { success, code, details } = response as EmployeesErrorResponseDTO;
      res.status(500).json({ success, error: { code, details } });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ success: false, error: { code: 50008, details: "An error occurred while getting employees" } });
  }
};



export const getEmployeeById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await EmployeeService.getEmployeeById(Number(id));
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, error: errorMessage });
  }
};
