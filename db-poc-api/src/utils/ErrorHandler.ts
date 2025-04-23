import ErrorResponseDTO from "../dtos/ErrorResponseDTO";
import { IResult } from "mssql";

export default function ErrorHandler(response: IResult<any>): ErrorResponseDTO {
  const mssqlError = response.recordset[0].detail;
  const errorResponse: ErrorResponseDTO = {
    success: false,
    code: response.output.outResultCode,
    detail: mssqlError,
  };
  return errorResponse;
}
