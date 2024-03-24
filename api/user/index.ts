import { apiInstance } from '@/api/request';
import { AxiosResponse } from 'axios';


interface User {
    id: number;
    username: string;
    email: string;
}

interface Memonic {
    mnemonic: string;
}

//获取助记词
async function getMnemonic(): Promise<AxiosResponse<Memonic>>{
    try {
        const response = await apiInstance.get<Memonic>('/api/account/createMnemonic', {});
        return response
    } catch (error) {
        throw error
    }
}

// 注册接口
async function register(username: string, email: string, password: string): Promise<AxiosResponse<User>> {
    try {
        const response = await apiInstance.post<User>('/register', { username, email, password });
        return response;
    } catch (error) {
        throw error;
    }
}

// 登录接口
async function login(username: string, password: string): Promise<AxiosResponse<{ token: string }>> {
    try {
        const response = await apiInstance.post<{ token: string }>('/login', { username, password });
        return response;
    } catch (error) {
        throw error;
    }
}

//上传人脸面
async function uploadUserFace(facePhoto:string,publicKey:string): Promise<AxiosResponse<{ success: boolean }>> {
    try {
        const response = await apiInstance.post<{ success: boolean }>('/api/account/uploadFacePhoto', {publicKey , facePhoto });
        return response;
    } catch (error) {
        throw error;
    }
}

export { User, register, login , getMnemonic , uploadUserFace };