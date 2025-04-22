import ErrorResponseDTO from "./ErrorResponseDTO";
import { EmployeesDataDTO } from "./EmployeeDTO";

export interface MovementsDataDTO {
  Id: number;
  IdEmpleado: number;
  IdTipoMovimiento: number;
  NombreTipoMovimiento: string;
  Fecha: Date;
  Monto: number;
  NuevoSaldo: number;
  IdPostByUser: number;
  UsernamePostByUser: string;
  PostInIp: string;
  PostTime: Date;
}

export interface GetEmployeeMovementsDTO {
  idEmpleado: number;
}

export interface GetEmployeeMovementsSuccessResponseDTO {
  success: boolean;
  data: {
    empleado: EmployeesDataDTO;
    total: number;
    movimientos: MovementsDataDTO[];
  };
}

export interface CreateMovementsDTO {
  NombreTipoMovimiento: string;
  Monto: number;
  IdEmpleado: number;
  UsernameUsuario: string;
}

export interface CreateMovementsSuccessResponseDTO {
  success: boolean;
  data: {
    id: number;
    message: string;
  };
}

export interface MovementsTypesDataDTO {
  Id: number;
  Nombre: string;
  TipoAccion: string;
}

export interface getMovementsTypesSuccessResponseDTO {
  success: boolean;
  data: {
    total: number;
    tiposMovimientos: MovementsTypesDataDTO[];
  };
}

export interface MovementsErrorResponseDTO extends ErrorResponseDTO {}
