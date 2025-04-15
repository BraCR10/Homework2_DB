export  interface LoginDTO {
    Username: string;
    Password: string;
}

export interface LoginSuccessResponseDTO { 
    success: boolean;
    Id: number;
    Username: string;
}

export interface LoginErrorResponseDTO { 
    success: boolean;
    code : number;
    details : string;
}
