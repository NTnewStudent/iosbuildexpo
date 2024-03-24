import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import config from "./config"
class HttpClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 15000, // 设置请求超时时间
        });

        // 请求拦截器
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // 可在此处添加请求拦截逻辑，如添加请求头等
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // 响应拦截器
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                // 可在此处添加响应拦截逻辑，如处理响应数据等
                return response.data;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            const response = await this.axiosInstance.get<T>(url, config);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async post<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        try {
            const response = await this.axiosInstance.post<T>(url, data, config);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

const apiInstance = new HttpClient(config.baseURL)
export {
    apiInstance,
    HttpClient
}