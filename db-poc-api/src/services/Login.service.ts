import  {LoginErrorResponseDTO,LoginDTO,LoginSuccessResponseDTO}  from "../dtos/LoginDTO";
import { query } from "../config/db.config";
import { TYPES } from "mssql";
import { inSqlParameters } from "../types/queryParams.type";

class AuthService {

    async loginUser(credentials: LoginDTO): Promise<LoginErrorResponseDTO | LoginSuccessResponseDTO> {

        const { username, password } = credentials;
        const params: inSqlParameters = {
            inUsername: [username, TYPES.VarChar],
            inPassword: [password, TYPES.VarChar],
        };

        try {
            const response = await query("sp_login", params,{});
            if (response.output.outResultCode == 0) {
                let data = response.recordset[0];
                const loginResponse: LoginSuccessResponseDTO = {
                    success:true ,
                    Id: data.Id,
                    username: data.username,
                };
                return loginResponse;
            } else if( response.output.outResultCode == 50001){
                return { success:false ,code: 50001, details: "username doesn't exist" };
            } else if(response.output.outResultCode == 50002){
                return { success:false ,code: 50002, details: "Password doesn't match" };
            }
            else if(response.output.outResultCode == 50003){
                return { success:false ,code: 50003, details: "User is blocked" };
            }else {
                throw new Error("Employ was not created due to DB error");
            }
        } catch (error) {
            console.error("Error details:", error);
            throw new Error(`An error occurred while creating the employ: ${error}`);
        }
    }
}

export default new AuthService();