export interface User {
    name: string,
    email: string,
    password: string,
    confirmPassword?: string,
    errors?: [],
}

export interface RootState {
    auth: {
        loading: boolean
        error: string
    }
}