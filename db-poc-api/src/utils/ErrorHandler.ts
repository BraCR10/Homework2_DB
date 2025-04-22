import ErrorResponseDTO  from "../dtos/ErrorResponseDTO";
import { IResult } from "mssql";


export default function ErrorHandler(response:IResult<any>): ErrorResponseDTO {
    const mssqlError = response.recordset[0].Descripcion;
    const errorResponse: ErrorResponseDTO = {
        success:false ,
        code: response.output.outResultCode,
        details: mssqlError,
    };
    return errorResponse;
}