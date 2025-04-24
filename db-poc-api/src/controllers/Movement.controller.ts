import { Request, Response } from "express";
import MovementService from "../services/Movement.service";
import {
  GetEmployeeMovementsDTO,
  MovementsErrorResponseDTO,
  CreateMovementsDTO,
} from "../dtos/MovementsDTO";

export const getEmployeeMovements = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const idEmpleado = req.params.idEmpleado;

  if (!idEmpleado || isNaN(Number(idEmpleado)) || Number(idEmpleado) <= 0) {
    const errorResponse: MovementsErrorResponseDTO = {
      success: false,
      error: {
        code: 400,
        detail: "Valid employee ID is required",
      },
    };
    res.status(400).json({ success: false, error: errorResponse });
    return;
  }

  const data: GetEmployeeMovementsDTO = {
    idEmpleado: Number(idEmpleado),
  };
  try {
    const response = await MovementService.employeeMovements(data);

    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error("Error during employee movements retrieval:", error);
    const errorMessage: MovementsErrorResponseDTO = {
      success: false,
      error: {
        code: 50008,
        detail: "An error occurred while retrieving employee movements",
      },
    };
    res.status(500).json({
      success: errorMessage.success,
      error: {
        code: errorMessage.error.code,
        details: errorMessage.error.detail,
      },
    });
  }
};

export const createMovement = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const data: CreateMovementsDTO = req.body;

  if (!data) {
    const errorResponse: MovementsErrorResponseDTO = {
      success: false,
      error: {
        code: 400,
        detail: "Request body is required",
      },
    };
    res.status(400).json({ success: false, error: errorResponse });
    return;
  }

  if (
    !data.NombreTipoMovimiento ||
    typeof data.NombreTipoMovimiento !== "string" ||
    data.NombreTipoMovimiento.trim() === ""
  ) {
    const errorResponse: MovementsErrorResponseDTO = {
      success: false,
      error: {
        code: 400,
        detail: "Movement type name is required",
      },
    };
    res.status(400).json({ success: false, error: errorResponse });
    return;
  }

  if (
    data.Monto === undefined ||
    typeof data.Monto !== "number" ||
    isNaN(data.Monto)
  ) {
    const errorResponse: MovementsErrorResponseDTO = {
      success: false,
      error: {
        code: 400,
        detail: "Valid amount is required",
      },
    };
    res.status(400).json({ success: false, error: errorResponse });
    return;
  }

  if (
    !data.IdEmpleado ||
    typeof data.IdEmpleado !== "number" ||
    data.IdEmpleado <= 0
  ) {
    const errorResponse: MovementsErrorResponseDTO = {
      success: false,
      error: {
        code: 400,
        detail: "Valid employee ID is required",
      },
    };
    res.status(400).json({ success: false, error: errorResponse });
    return;
  }

  if (
    !data.UsernameUsuario ||
    typeof data.UsernameUsuario !== "string" ||
    data.UsernameUsuario.trim() === ""
  ) {
    const errorResponse: MovementsErrorResponseDTO = {
      success: false,
      error: {
        code: 400,
        detail: "Username is required",
      },
    };
    res.status(400).json({ success: false, error: errorResponse });
    return;
  }

  try {
    const response = await MovementService.createMovement(data);

    if (response.success) {
      res.status(201).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    console.error("Error during movement creation:", error);
    const errorMessage: MovementsErrorResponseDTO = {
      success: false,
      error: {
        code: 50009,
        detail: "An error occurred while creating the movement",
      },
    };
    res.status(500).json({
      success: errorMessage.success,
      error: {
        code: errorMessage.error.code,
        details: errorMessage.error.detail,
      },
    });
  }
};

export const getMovementsTypes = async (_req: Request, res: Response) => {
  try {
    const response = await MovementService.getMovementsTypes();

    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error("Error retrieving movement types:", error);
    const errorMessage: MovementsErrorResponseDTO = {
      success: false,
      error: {
        code: 50010,
        detail: "An error occurred while retrieving movement types",
      },
    };
    res.status(500).json({
      success: errorMessage.success,
      error: {
        code: errorMessage.error.code,
        details: errorMessage.error.detail,
      },
    });
  }
};
