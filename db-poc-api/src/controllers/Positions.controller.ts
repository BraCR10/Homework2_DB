import { Request, Response } from "express";
import PositionService from "../services/Position.service";
import { PositionErrorResponseDTO } from "../dtos/PositionDTO";

export const getPositions = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const response = await PositionService.getPositions();
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error("Error retrieving movement types:", error);
    const errorMessage: PositionErrorResponseDTO = {
      success: false,
      code: 50010,
      details: "An error occurred while retrieving positions",
    };
    res.status(500).json({
      success: errorMessage.success,
      error: { code: errorMessage.code, details: errorMessage.details },
    });
  }
};
