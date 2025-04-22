import ErrorResponseDTO from "./ErrorResponseDTO";

export interface EmployeesDataDTO {
  Id: number;
  IdPuesto: number;
  NombrePuesto: string;
  ValorDocumentoIdentidad: string;
  Nombre: string;
  FechaContratacion: string;
  SaldoVacaciones: number;
  EsActivo: boolean;
}

export interface GetEmployeesSuccessResponseDTO {
  success: boolean;
  data: {
    total: number;
    empleados: EmployeesDataDTO[];
  };
}

export interface CreateEmployeesDTO {
  NombrePuesto: string;
  ValorDocumentoIdentidad: string;
  NombreEmpleado: string;
}

export interface CreateEmployeesSuccessResponseDTO {
  success: boolean;
  data: {
    id: number;
    detail: string;
  };
}

export interface UpdateEmployeesDTO {
  IdEmpleado: number;
  NombrePuesto: string;
  ValorDocumentoIdentidad: string;
  NombreEmpleado: string;
}

export interface UpdateEmployeesSuccessResponseDTO {
  success: boolean;
  data: {
    message: string;
    updatedFields: string[];
  };
}

export interface TryDeleteEmployeeDTO {
  IdEmpleado: number;
}
export interface TryDeleteEmployeeSuccessResponseDTO {
  success: boolean;
  data: {
    canDelete: boolean;
    detail: string;
  };
}

export interface DeleteEmployeeDTO {
  IdEmpleado: number;
}
export interface DeleteEmployeeSuccessResponseDTO {
  success: boolean;
  data: {
    detail: string;
  };
}

export interface GetEmployeeByNameDTO {
  employeeName: string;
}
export interface GetEmployeeByNameSuccessResponseDTO {
  success: boolean;
  data: {
    total: number;
    empleados: EmployeesDataDTO[];
  };
}

export interface GetEmployeeByDNIDTO {
  employeeDNI: string;
}
export interface GetEmployeeByDNISuccessResponseDTO {
  success: boolean;
  data: {
    total: number;
    empleados: EmployeesDataDTO[];
  };
}

export interface EmployeesErrorResponseDTO extends ErrorResponseDTO {}
