import { Request, Response } from "express";
import EmployeeService from "../services/Employee.service";
import {
  CreateEmployeesDTO,
  EmployeesErrorResponseDTO,
  UpdateEmployeesDTO,
  TryDeleteEmployeeDTO,
  DeleteEmployeeDTO,
  GetEmployeeByNameDTO,
  GetEmployeeByDNIDTO,
} from "../dtos/EmployeeDTO";

export const createEmployee = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data: CreateEmployeesDTO = req.body;

    if (
      !data.NombreEmpleado ||
      !data.ValorDocumentoIdentidad ||
      !data.NombrePuesto
    ) {
      console.error("Request body is required.");
      const errorResponse: EmployeesErrorResponseDTO = {
        success: false,
        code: 400,
        details: "Request body is required.",
      };
      res.status(400).json({ success: false, error: errorResponse });
      return;
    }

    const response = await EmployeeService.createEmployee(data);

    if (response.success) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error("Error during employee creation:", error);
    const errorMessage: EmployeesErrorResponseDTO = {
      success: false,
      code: 50008,
      details: "An error occurred while creating the employee",
    };
    res.status(500).json({
      success: errorMessage.success,
      error: { code: errorMessage.code, details: errorMessage.details },
    });
  }
};

export const getEmployees = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const response = await EmployeeService.getEmployees();
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({
      success: false,
      error: {
        code: 50008,
        details: "An error occurred while getting employees",
      },
    });
  }
};

/*
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
*/

export const updateEmployee = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const IdEmpleado = Number(req.params.IdEmpleado);

    if (!isNaN(IdEmpleado) || IdEmpleado <= 0) {
      const errorResponse: EmployeesErrorResponseDTO = {
        success: false,
        code: 400,
        details: "Valid employee ID is required",
      };
      res.status(400).json({ success: false, error: errorResponse });
      return;
    }

    const { NombrePuesto, ValorDocumentoIdentidad, NombreEmpleado } = req.body;
    // Warning : This function requires all the parameters to be passed, even if they are not updated.
    if (!NombrePuesto || !ValorDocumentoIdentidad || !NombreEmpleado) {
      console.error("Request body is required.");
      const errorResponse: EmployeesErrorResponseDTO = {
        success: false,
        code: 400,
        details: "Request body is required.",
      };
      res.status(400).json({ success: false, error: errorResponse });
      return;
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ \s]+$/;
    if (!nameRegex.test(NombrePuesto || NombreEmpleado)) {
      const errorResponse: EmployeesErrorResponseDTO = {
        success: false,
        code: 400,
        details:
          "Employee name or Position must contain only alphabetic characters",
      };
      res.status(400).json({ success: false, error: errorResponse });
      return;
    }

    const dniRegex = /^[0-9]+$/;
    if (!dniRegex.test(ValorDocumentoIdentidad)) {
      const errorResponse: EmployeesErrorResponseDTO = {
        success: false,
        code: 400,
        details: "Employee DNI has an invalid format",
      };
      res.status(400).json({ success: false, error: errorResponse });
      return;
    }

    const data: UpdateEmployeesDTO = {
      IdEmpleado,
      NombrePuesto,
      ValorDocumentoIdentidad,
      NombreEmpleado,
    };

    const response = await EmployeeService.updateEmployee(data);

    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error("Error during employee update:", error);
    const errorMessage: EmployeesErrorResponseDTO = {
      success: false,
      code: 50008,
      details: "An error occurred while updating the employee",
    };
    res.status(500).json({
      success: errorMessage.success,
      error: { code: errorMessage.code, details: errorMessage.details },
    });
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const IdEmpleado = Number(req.params.IdEmpleado);

  if (!isNaN(IdEmpleado) || IdEmpleado <= 0) {
    const errorResponse: EmployeesErrorResponseDTO = {
      success: false,
      code: 400,
      details: "Valid employee ID is required",
    };
    res.status(400).json({ success: false, error: errorResponse });
    return;
  }
  const data: DeleteEmployeeDTO = { IdEmpleado };
  try {
    const response = await EmployeeService.deleteEmployee(data);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error("Error during employee deletion:", error);
    const errorMessage: EmployeesErrorResponseDTO = {
      success: false,
      code: 50008,
      details: "An error occurred while deleting the employee",
    };
    res.status(500).json({
      success: errorMessage.success,
      error: { code: errorMessage.code, details: errorMessage.details },
    });
  }
};

export const tryDeleteEmployee = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const IdEmpleado = Number(req.params.IdEmpleado);

  if (!isNaN(IdEmpleado) || IdEmpleado <= 0) {
    const errorResponse: EmployeesErrorResponseDTO = {
      success: false,
      code: 400,
      details: "Valid employee ID is required",
    };
    res.status(400).json({ success: false, error: errorResponse });
    return;
  }
  const data: TryDeleteEmployeeDTO = { IdEmpleado };
  try {
    const response = await EmployeeService.tryDeleteEmployee(data);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error("Error during employee deletion:", error);
    const errorMessage: EmployeesErrorResponseDTO = {
      success: false,
      code: 50008,
      details: "An error occurred while deleting the employee",
    };
    res.status(500).json({
      success: errorMessage.success,
      error: { code: errorMessage.code, details: errorMessage.details },
    });
  }
};
export const getEmployeeByName = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const employeeName = req.params.employeeName;

  if (
    !employeeName ||
    typeof employeeName !== "string" ||
    employeeName.trim() === ""
  ) {
    const errorResponse: EmployeesErrorResponseDTO = {
      success: false,
      code: 400,
      details: "Employee name is required",
    };
    res.status(400).json({ success: false, error: errorResponse });
    return;
  }

  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ \s]+$/;
  if (!nameRegex.test(employeeName)) {
    const errorResponse: EmployeesErrorResponseDTO = {
      success: false,
      code: 400,
      details: "Employee name must contain only alphabetic characters",
    };
    res.status(400).json({ success: false, error: errorResponse });
    return;
  }

  const data: GetEmployeeByNameDTO = { employeeName };

  if (!data.employeeName) {
    console.error("Employee name is required.");
    const errorResponse: EmployeesErrorResponseDTO = {
      success: false,
      code: 400,
      details: "Employee name is required.",
    };
    res.status(400).json({ success: false, error: errorResponse });
    return;
  }
  try {
    const response = await EmployeeService.getEmployeeByName(data);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error("Error fetching employees by name:", error);
    const errorMessage: EmployeesErrorResponseDTO = {
      success: false,
      code: 50008,
      details: "Error fetching employees by name",
    };
    res.status(500).json({
      success: errorMessage.success,
      error: { code: errorMessage.code, details: errorMessage.details },
    });
  }
};

export const getEmployeeByDNI = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const employeeDNI = req.params.employeeDNI;

  if (
    !employeeDNI ||
    typeof employeeDNI !== "string" ||
    employeeDNI.trim() === ""
  ) {
    const errorResponse: EmployeesErrorResponseDTO = {
      success: false,
      code: 400,
      details: "Valid employee DNI is required",
    };
    res.status(400).json({ success: false, error: errorResponse });
    return;
  }

  const dniRegex = /^[0-9]+$/;
  if (!dniRegex.test(employeeDNI)) {
    const errorResponse: EmployeesErrorResponseDTO = {
      success: false,
      code: 400,
      details: "Employee DNI has an invalid format",
    };
    res.status(400).json({ success: false, error: errorResponse });
    return;
  }

  const data: GetEmployeeByDNIDTO = { employeeDNI };

  if (!data.employeeDNI) {
    console.error("Employee DNI is required.");
    const errorResponse: EmployeesErrorResponseDTO = {
      success: false,
      code: 400,
      details: "Employee DNI is required.",
    };
    res.status(400).json({ success: false, error: errorResponse });
    return;
  }
  try {
    const response = await EmployeeService.getEmployeeByDNI(data);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error("Error fetching employees by DNI:", error);
    const errorMessage: EmployeesErrorResponseDTO = {
      success: false,
      code: 50008,
      details: "Error fetching employees by DNI",
    };
    res.status(500).json({
      success: errorMessage.success,
      error: { code: errorMessage.code, details: errorMessage.details },
    });
  }
};
