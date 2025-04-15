import  {LoginErrorResponseDTO,LoginDTO,LoginSuccessResponseDTO}  from "../dtos/AuthDTO";
import { query } from "../config/db.config";
import { TYPES } from "mssql";
import { inSqlParameters } from "../types/queryParams.type";
import { useMock } from "../app";

class AuthService {

    async loginUser(credentials: LoginDTO): Promise<LoginErrorResponseDTO | LoginSuccessResponseDTO> {

        const { Username: username, Password: password } = credentials;
        const params: inSqlParameters = {
            inUsername: [username, TYPES.VarChar],
            inPassword: [password, TYPES.VarChar],
        };

        try {
            if (useMock) return { success:true , Id : 1, Username: "test" };
            else{
                const response = await query("sp_login", params,{});
                if (response.output.outResultCode == 0) {
                    let data = response.recordset[0];
                    const loginResponse: LoginSuccessResponseDTO = {
                        success:true ,
                        Id: data.Id,
                        Username: data.Username,
                    };
                    return loginResponse;
                } else if( response.output.outResultCode == 50001){
                    return { success:false ,code: 50001, details: "username doesn't exist" };
                } else if(response.output.outResultCode == 50002){
                    return { success:false ,code: 50002, details: "Password doesn't match" };
                }
                else if(response.output.outResultCode == 50003){
                    return { success:false ,code: 50003, details: "User is blocked" };
                }
                else if(response.output.outResultCode == 50008){
                    return { success:false ,code: 50008, details: "DB error" };
                } 
                else {
                    throw new Error("Employ was not created due to DB error");
                }
            }
        } catch (error) {
            console.error("Error details:", error);
            throw new Error(`An error occurred while creating the employ: ${error}`);
        }
    }

    async logoutUser(userId: number): Promise<boolean> {
        if (!userId){
            false
        }
        const params: inSqlParameters = {
            inUserId: [String(userId), TYPES.Int],
        };
        try {
            if (useMock) return true;
            else {
                const response = await query("sp_logout", params, {});
                if (response.output.outResultCode == 0) {
                    return true;
                } 
                else {
                    throw new Error("DB error");
                }
            }
        }
        catch (error) {
            console.error("Error details:", error);
            throw new Error(`An error occurred while creating the employ: ${error}`);
        }
    }

}

export default new AuthService();