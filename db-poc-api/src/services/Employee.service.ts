import { query } from "../config/db.config";
import { TYPES } from "mssql";
import { inSqlParameters } from "../types/queryParams.type";
import { useMock } from "../app";
import {
  GetEmployeesSuccessResponseDTO,
  EmployeesErrorResponseDTO,
  CreateEmployeesSuccessResponseDTO,
  CreateEmployeesDTO  
} from "../dtos/EmployeeDTO";

class EmployeeService {
  async createEmployee(data : CreateEmployeesDTO): Promise<CreateEmployeesSuccessResponseDTO | EmployeesErrorResponseDTO> {
    const params: inSqlParameters = {
      inNombrePuesto: [data.NombrePuesto, TYPES.VarChar],
      inValorDocumentoIndentidad: [data.ValorDocumentoIdentidad, TYPES.VarChar],
      inNombreEmpleado: [data.NombreEmpleado, TYPES.VarChar],
    };

    try {
      if (useMock) return { success:true , data: { id: 1, detail: "Employ was created" } };
      else{
        const response = await query("sp_create_employee", params,{});
        if (response.output.outResultCode == 0) {
          const data = response.recordset[0];
          return  { success:true , data: { id: data.Id, detail: "Employ was created" } };
        } else if( response.output.outResultCode == 50005){
          return { success:false ,code: 50005, details: "Employee name already exists" };
        }else if(response.output.outResultCode == 50004){
          return { success:false ,code: 50004, details: "Employee Document ID already exists" };
        } else if(response.output.outResultCode == 50009){
          return { success:false ,code: 50009, details: "Employee name no alphabetic " };
        } else if (response.output.outResultCode == 50010){
          return { success:false ,code: 50010, details: "Employee Document ID no valid" };
        } else if (response.output.outResultCode == 50008){
          return { success:false ,code: 50008, details: "DB error" };
        } else {
          throw new Error("Employ was not created due to DB error");
        }
      }
    } catch (error) {
      console.error("Error details:", error);
      throw new Error(`An error occurred while creating the employ: ${error}`);
    }
  }

  async getEmployees(): Promise<GetEmployeesSuccessResponseDTO | EmployeesErrorResponseDTO> {
    if (useMock) return { success:true , data: { total: 1, empleados: [{ Id: 1, IdPuesto: 1, NombrePuesto: "test", ValorDocumentoIdentidad: "test", Nombre: "test", FechaContratacion: "2023-10-01", SaldoVacaciones: 0, EsActivo: true }] } };
    else {
      try {
        const response = await query("sp_get_all_employees", {},{});
        if (response.output.outResultCode == 0) {
          const sortedEmployees = response.recordset.sort((a, b) => a.NameEmployee.localeCompare(b.NameEmployee));
          return { success:true , data: { total: response.recordset.length, empleados: sortedEmployees } };
        } else {
          return { success:false , code: 50008, details: "DB error" };
        }
      } catch (error) {
        throw new Error("Error fetching the data in the DB.");
      }
    }
  }

  async getEmployeeById(id: number): Promise<any> {
    if (!id || id < 1) {
      throw new Error("Invalid id");
    }

    const inParams: inSqlParameters = {
      inId: [id.toString(), TYPES.Int],
    };

    try {
      const response = await query("sp_get_employee_by_id", inParams,{});
      if (response.output.outResultCode == 0) {
        return response.recordset[0];
      } else {
        throw new Error("Employ was not created due to DB error");
      }
    } catch (error) {
      throw new Error("Error fetching the data.");
    }
  }


}

export default new EmployeeService();
