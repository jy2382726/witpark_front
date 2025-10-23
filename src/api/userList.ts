import { DataType } from "../pages/users/interface";
import { del, post } from "../utils/http/request";


export interface SearchParams {
    page: number;
    pageSize: number;
    companyName?: string;
    contact?: string;
    phone?: string;
}

export function getUserList(data: SearchParams) {
    return post("users/list", data)
}

export function deleteUser(data: { id: string }) {
    return del("users/delete", data)
}

export function deleteUserList(data: { ids: string[] }) {
    return del("users/deleteBatch", data)
}

export function addUser(data: DataType) {
    return post("users/add", data)
}

export function updateUser(data: DataType) {
    return post("users/update", data)
}
