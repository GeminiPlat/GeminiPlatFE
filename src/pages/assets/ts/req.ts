import axios from 'axios';

// 创建一个 axios 实例
const apiClient = axios.create({
    baseURL: 'http://localhost:521/castor/api/v1',
    timeout: 1000,
    // headers: {'Content-Type': 'multipart/form-data'},
    headers: {'Content-Type': 'application/json'}
});

// 发送 GET 请求
export const getData = async <T>(endpoint: string, responseType: 'json' | 'blob'): Promise<{
    statusCode: number;
    body: T
}> => {
    try {
        const response = await apiClient.get<T>(endpoint, {responseType});
        return {
            statusCode: response.status,
            body: response.data,
        };
    } catch (error) {
        // console.error('Error fetching data:', error);
        // throw error;
        return {
            // statusCode: error.response ? err.response.status : 500,
            statusCode: (error as { response: { status: number } }).response?.status || 500,
            body: {} as T
        }
    }
};

// 发送 POST 请求
export const postData = async <T>(endpoint: string, data: object, responseType?: 'json' | 'blob'): Promise<{
    statusCode: number;
    headers: { [key: string]: string };
    body: T
}> => {
    try {
        const response = await apiClient.post<T>(endpoint, data, {
            headers: {'Content-Type': 'multipart/form-data'},
            withCredentials: true,
            timeout: 10000,
            responseType: responseType ? responseType : 'json'
        });
        return {
            statusCode: response.status,
            headers: response.headers,
            body: response.data,
        };
    } catch (error) {
        console.error('Error posting data:', error);
        return {
            // statusCode: error.response ? err.response.status : 500,
            statusCode: (error as { response: { status: number } }).response?.status || 500,
            headers: {},
            body: {} as T
        }
    }
};