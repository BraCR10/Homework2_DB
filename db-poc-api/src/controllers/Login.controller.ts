import {Request, Response} from "express";
import LoginService from "../services/Login.service";
import  {LoginErrorResponseDTO,LoginDTO,LoginSuccessResponseDTO}  from "../dtos/LoginDTO";

export async function loginUser(req: Request, res: Response): Promise<void> {
    try {
        const credentials: LoginDTO = req.body;
        const { username, password } = credentials;
        if (!username || !password) {
            console.error("Username and password are required.");
            const errorResponse: LoginErrorResponseDTO = { success:false , code: 400, details: "Username and password are required." };
            res.status(400).json({ success: false, error: errorResponse });
        }

        if (typeof username !== "string" || typeof password !== "string") {
            console.error("Username and password must be strings.");
            const errorResponse: LoginErrorResponseDTO = {success:false , code: 400, details: "Username and password must be strings." };
            res.status(400).json({ success: false, error: errorResponse });
        }

        const response = await LoginService.loginUser(credentials);

        if (response.success) {
            const { success, Id, username } = response as LoginSuccessResponseDTO;
            res.status(200).json({success:success, 
                data:{userState:{
                    Id: Id,
                    username: username
                } }
            });
        } else {
            const { success, code, details } = response as LoginErrorResponseDTO;
            res.status(401).json({ success: success, error: { code: code, detail: details } });
        }
        
    } catch (error) {
        const errorMessage: LoginErrorResponseDTO = { success:false ,code: 500, details: "An error occurred while logging in" };
        res.status(500).json({ success: errorMessage.success, error: {code: errorMessage.code,details : errorMessage.details} });
    }

}