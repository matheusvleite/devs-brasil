import axios from "axios"
import { api } from "../utils/config"

const profile = async (id: string) => {

    try {
        const res = await axios.get(api + '/users/' + id)
        .then(res => res.data)
        .catch(err => err)

        return res;
    } catch (error) {
        console.log(error)
    }

    return 
}

const userDetails = async (id: string) => {

    try {
        const res = await axios.get(api + '/users/' + id)
        .then(res => res.data)
        .catch(err => err)

        return res;
    } catch (error) {
        console.log(error)
    }

    return 
}

const userService = {
    profile,
    userDetails,
}

export default userService;