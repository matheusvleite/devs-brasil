import axios from "axios";
import { IRegisterUser } from "../interfaces/User";
import { api } from "../utils/config";


const register = async (data: IRegisterUser) => {
  
    try {
        const res = await axios.post(api + '/users/register', data)
            .then(res => res.data)
            .catch(err => err)

        if (res._id) {
            localStorage.setItem("user", JSON.stringify(res))
        }
        return res.response.data;
    } catch (error) {
        console.log(error)
    }
};

const logout = () => {
    localStorage.removeItem("user");
}

const authService = {
    register,
    logout,
}

export default authService;