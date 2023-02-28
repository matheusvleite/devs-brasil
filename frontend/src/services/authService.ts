import axios from "axios";
import { ILogin, IRegisterUser } from "../interfaces/User";
import { api } from "../utils/config";


const register = async (data: IRegisterUser) => {
  
    try {
        const res = await axios.post(api + '/users/register', data)
            .then(res => res.data)
            .catch(err => err)

        if (res._id) {
            localStorage.setItem("user", JSON.stringify(res))
        }
        return res;
    } catch (error) {
        console.log(error)
    }
};

const login = async (data: ILogin) => {
    
    try {
        const res = await axios.post(api + '/users/login', data)
        .then(res => res.data)
        .catch(err => err)
        
        if(res._id) {
            localStorage.setItem("user", JSON.stringify(res))
        }

        return res;
    } catch (error) {
        console.log(error)
    }
}

const logout = () => {
    localStorage.removeItem("user");
}

const authService = {
    register,
    logout,
    login,
}

export default authService;