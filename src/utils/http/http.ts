import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { message } from 'antd'
import { store } from '../../store'

const http: AxiosInstance = axios.create({
    baseURL: "https://www.demo.com",
    timeout: 5000
})

// 请求拦截器
http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = store.getState().authSlice.token
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 响应拦截器
http.interceptors.response.use(
    (response: AxiosResponse) => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        const { code, msg } = response.data
        if (code !== 200) {
            // message是react的组件，但是在axios的拦截器中不能直接使用
            // 所以这里使用antd的message组件api方式来弹出提示错误信息
            message.error(code + ": " + msg)
            return Promise.reject(new Error(msg))
        }
        return response.data
    },
    (error) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)

export default http
