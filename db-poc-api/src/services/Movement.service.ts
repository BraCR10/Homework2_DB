import { execute } from "../config/db.config";
import { TYPES } from "mssql";
import { inSqlParameters } from "../types/queryParams.type";
import { useMock } from "../app";
import ErrorHandler from "../utils/ErrorHandler";
import {
  CreateMovementsSuccessResponseDTO,
  CreateMovementsDTO,
  GetEmployeeMovementsSuccessResponseDTO,
  GetEmployeeMovementsDTO,
  getMovementsTypesSuccessResponseDTO,
  MovementsErrorResponseDTO,
} from "../dtos/MovementsDTO";

class MovementService {
  async employeeMovements(
    data: GetEmployeeMovementsDTO,
  ): Promise<
    GetEmployeeMovementsSuccessResponseDTO | MovementsErrorResponseDTO
  > {
    const params: inSqlParameters = {
      inIdEmpleado: [String(data.idEmpleado), TYPES.Int],
    };

    try {
      if (useMock)
        return {
          success: true,
          data: {
            empleado: {
              Id: 1,
              IdPuesto: 1,
              NombrePuesto: "test",
              ValorDocumentoIdentidad: "test",
              Nombre: "test",
              FechaContratacion: "2023-10-01",
              SaldoVacaciones: 0,
              EsActivo: true,
            },
            total: 0,
            movimientos: [
              {
                Id: 123,
                IdEmpleado: 1,
                IdTipoMovimiento: 2,
                NombreTipoMovimiento: "Vacaciones",
                Fecha: new Date("2024-03-10T14:30:22Z"),
                Monto: 3,
                NuevoSaldo: 12,
                IdPostByUser: 5,
                UsernamePostByUser: "admin",
                PostInIp: "192.168.1.5",
                PostTime: new Date("2024-03-10T14:30:22Z"),
              },
            ],
          },
        };
      else {
        const response = await execute(
          "sp_get_empleado_movimientos",
          params,
          {},
        );
        if (response.output.outResultCode == 0) {
          let data = response.recordset[0];
          const employeeMovementsResponse: GetEmployeeMovementsSuccessResponseDTO =
            {
              success: true,
              data: {
                empleado: data.empleado,
                total: data.total,
                movimientos: data.movimientos,
              },
            };
          return employeeMovementsResponse;
        } else {
          return ErrorHandler(response) as MovementsErrorResponseDTO;
        }
      }
    } catch (error) {
      console.error("Error details:", error);
      throw new Error(
        `An error occurred while fetching employee movements: ${error}`,
      );
    }
  }

  async createMovement(
    data: CreateMovementsDTO,
  ): Promise<CreateMovementsSuccessResponseDTO | MovementsErrorResponseDTO> {
    const params: inSqlParameters = {
      inNombreTipoMovimiento: [data.NombreTipoMovimiento, TYPES.VarChar],
      inMonto: [String(data.Monto), TYPES.Int],
      inIdEmpleado: [String(data.IdEmpleado), TYPES.Int],
      inUsernameUsuario: [data.UsernameUsuario, TYPES.VarChar],
    };
    try {
      if (useMock)
        return {
          success: true,
          data: {
            id: 1,
            message: "Movimiento creado exitosamente",
          },
        };
      else {
        const response = await execute("sp_create_movimiento", params, {});
        if (response.output.outResultCode == 0) {
          let data = response.recordset[0];
          const createMovementResponse: CreateMovementsSuccessResponseDTO = {
            success: true,
            data: {
              id: data.id,
              message: "Movimiento creado exitosamente",
            },
          };
          return createMovementResponse;
        } else {
          return ErrorHandler(response) as MovementsErrorResponseDTO;
        }
      }
    } catch (error) {
      console.error("Error details:", error);
      throw new Error(`An error occurred while creating movement: ${error}`);
    }
  }

  async getMovementsTypes(): Promise<
    getMovementsTypesSuccessResponseDTO | MovementsErrorResponseDTO
  > {
    try {
      if (useMock)
        return {
          success: true,
          data: {
            total: 2,
            tiposMovimientos: [
              {
                Id: 1,
                Nombre: "Vacaciones",
                TipoAccion: "RESTA",
              },
              {
                Id: 2,
                Nombre: "Aguinaldo",
                TipoAccion: "SUMA",
              },
            ],
          },
        };
      else {
        const response = await execute("sp_get_tipos_movimiento", {}, {});
        if (response.output.outResultCode == 0) {
          let data = response.recordset[0];
          const getMovementsTypesResponse: getMovementsTypesSuccessResponseDTO =
            {
              success: true,
              data: {
                total: data.total,
                tiposMovimientos: data.tiposMovimientos,
              },
            };
          return getMovementsTypesResponse;
        } else {
          return ErrorHandler(response) as MovementsErrorResponseDTO;
        }
      }
    } catch (error) {
      console.error("Error details:", error);
      throw new Error(
        `An error occurred while fetching movements types: ${error}`,
      );
    }
  }
}

export default new MovementService();
