import ErrorResponseDTO  from "./ErrorResponseDTO";

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
    }

}

export interface CreateEmployeesDTO {
    NombrePuesto: string;
    ValorDocumentoIdentidad: string;
    NombreEmpleado: string;
}

export interface CreateEmployeesSuccessResponseDTO{
    success: boolean;
    data: {
        id : number;
        detail : string;
    }
}



export interface EmployeesErrorResponseDTO extends  ErrorResponseDTO{}