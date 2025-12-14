import axiosConfig from "./axiosConfig"
import { BaseUrl } from "./BaseUrl"


export const getResponse = async(reqBody,reqHeader) => {
    return await axiosConfig('post',`${BaseUrl}/getResponse`,reqBody,reqHeader)
}

export const registerUser = async(reqBody) => {
    return await axiosConfig('post',`${BaseUrl}/registerUser`,reqBody)
}

export const loginuser = async(reqBody) => {
    return await axiosConfig('post',`${BaseUrl}/loginUser`,reqBody)
}