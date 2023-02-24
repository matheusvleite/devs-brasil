import axios from "axios";
import { User } from "../interfaces/User";
import { api } from "../utils/config";


const register = async (data: User) => {
  
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

const authService = {
    register,
}

export default authService;