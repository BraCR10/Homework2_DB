export  interface LoginDTO {
    username: string;
    password: string;
}

export interface LoginSuccessResponseDTO { 
    success: boolean;
    Id: number;
    username: string;
}

export interface LoginErrorResponseDTO { 
    success: boolean;
    code : number;
    details : string;
}
