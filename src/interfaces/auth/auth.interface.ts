export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    status: boolean
    message: string
    accessToken: string
    expiresIn: number
    user?: any
}

export interface RegisterRequest {
    username: string
    fullName: string
    email: string
    password: string
}

export interface RegisterResponse {
    status: boolean
    message: string
}

export interface LogoutResponse {
    status: boolean
    message: string
}
