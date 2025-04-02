import { Employee } from "../models/Employee";
import { query } from "../config/db.config";
import { TYPES } from "mssql";
import { inSqlParameters } from "../types/queryParams.type";

class EmployeeService {
  async createEmployee(name: string, money: number): Promise<void> {
    const params: inSqlParameters = {
      inNameEmployee: [name, TYPES.VarChar],
      inSalary: [money.toString(), TYPES.Money],
    };

    try {
      const response = await query("sp_create_employee", params,{});
      if (response.output.outResultCode == 0) {
        return;
      } else if( response.output.outResultCode == 5001){
        throw new Error("Employ was not created due to name already exist");
      }else {
        throw new Error("Employ was not created due to DB error");
      }
    } catch (error) {
      console.error("Error details:", error);
      throw new Error(`An error occurred while creating the employ: ${error}`);
    }
  }

  async getEmployees(): Promise<Employee[]> {
    try {
      const response = await query("sp_get_all_employees", {},{});
      if (response.output.outResultCode == 0) {
        return response.recordset;
      } else {
        throw new Error("Employ was not created due to DB error");
      }
    } catch (error) {
      throw new Error("Error fetching the data.");
    }
  }

  async getEmployeeById(id: number): Promise<Employee[]> {
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

  async getEmployeesSortedByName(): Promise<Employee[]> {
    try {
      const response = await query("sp_get_all_employees", {},{});
      if (response.output.outResultCode == 0) {
        return response.recordset.sort((a, b) => a.NameEmployee.localeCompare(b.NameEmployee));
      } else {
        throw new Error("Employ was not created due to DB error");
      }
    } catch (error) {
      throw new Error("Error fetching the data.");
    }
  }
}

export default new EmployeeService();
