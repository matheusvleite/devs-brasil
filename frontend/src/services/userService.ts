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
            .then(res => res.data)
            .catch(err => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const getUsers = async () => {
    try {
        const res = await axios.get(api + '/users/')
            .then(res => res.data)
            .then(err => err)

        return res;
    } catch (error) {
        console.log(error)
    }
}

const starAnUser = async (id: string, token: string) => {
    try {
        const res = await axios.put(api + '/users/stars/' + id, null, {
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

const userService = {
    profile,
    userDetails,
    updateProfile,
    searchUser,
    getUsers,
    starAnUser,
}

export default userService;