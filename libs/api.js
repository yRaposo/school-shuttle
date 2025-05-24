import axios from "axios";

class AppError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AppError';
    }
}

const apiUrl = 'https://694hfvjh-8080.brs.devtunnels.ms/api/v1';

export const api = axios.create({
    baseURL: apiUrl,
});

api.registerInterceptTokenManager = (signOut, getToken) => {
    api.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => response,
        async (requestError) => {
            if (
                requestError.response?.status === 403 ||
                requestError.response?.data?.message === 'Cliente não encontrado no sistema'
            ) {
                signOut();
                return Promise.reject(requestError);
            }

            if (requestError.response && requestError.response.data) {
                return Promise.reject(new AppError(requestError.response.data.message));
            } else {
                return Promise.reject(requestError);
            }
        }
    );
};
