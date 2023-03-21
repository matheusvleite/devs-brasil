export interface IRegisterUser {
    _id?: string
    name: string,
    email: string,
    password: string,
    confirmPassword?: string,
}

export interface ILogin {
    email: string,
    password: string,
}

export interface IUser {
    _id: string
    name: string,
    profileImage: string,
    bio: string,
    email?: string,
    area: string,
    stars: string[]
}
