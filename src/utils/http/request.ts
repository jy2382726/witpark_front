import http from "./http";

type ApiResponse = {
    code: number;
    msg: string;
    data: any;
}

export function get(url: string, params?: any): Promise<ApiResponse> {
    return http.get(url, { params })
}

export function post(url: string, data?: any): Promise<ApiResponse> {
    return http.post(url, data)
}