import ErrorResponseDTO from "./ErrorResponseDTO";

export interface PositionDataDTO {
  Id: number;
  Nombre: string;
  SalarioPorHora: number;
}

export interface GetPositionsSuccessResponseDTO {
  success: boolean;
  data: {
    total: number;
    puestos: PositionDataDTO[];
  };
}

export interface PositionErrorResponseDTO extends ErrorResponseDTO {}
