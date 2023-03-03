import axios from "axios";
import { api } from "../utils/config";

const profile = async (token: string) => {

    try {
        const res = await axios.get(api + '/users/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(err => err)

        return res;
    } catch (error) {
        console.log(error)
    }
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
}

const updateProfile = async (data: FormData, token: string) => {

    try {
        const res = await axios.put(api + '/users/', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(err => err)

        return res;
    } catch (error) {
        console.log(error)
    }
}

const searchUser = async (query: string) => {
    try {
        const res = await axios.get(api + '/users/search?q=' + query)
        .then((res => res.data))
        .catch(err => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const userService = {
    profile,
    userDetails,
    updateProfile,
    searchUser,
}

export default userService;