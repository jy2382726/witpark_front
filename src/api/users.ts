import { post, get } from "../utils/http/request";

export type LoginData = {
    username: string;
    password: string;
}

export function login(data: LoginData){
    return post("login", data)
}

export function getMenu(){
    return get("menu")
}