import axios from "axios";

const baseURL = import.meta.env.VITE_PRODUCTION === 'true'
                            ? import.meta.env.VITE_PROD_URL
                            : import.meta.env.VITE_DEV_URL;

// Create an Axios instance
const api = axios.create({
    baseURL: baseURL, // Replace with your backend URL
    withCredentials: true, // Ensures cookies are sent with requests
    headers: {'Content-Type' : 'application/json'},
});

// Add a response interceptor to handle 401 errors (Unauthorized)
api.interceptors.response.use(
   
    (response) => {
        console.log("interceptor")
        return response; // If the response is successful, just return it
    },
    async (error) => {
        //console.log("interceptor")
        const originalRequest = error.config;

        // If the error is a 401 (Unauthorized) and the request wasn't a token refresh request
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried

            try {
                // Attempt to refresh the token
                // await api.post('jwt/refresh/', null, {
                //     withCredentials: true,
                // });
                await api.post('jwt/refresh/')
                // Retry the original request with the new token
                return api(originalRequest);
            } catch (err) {
                // If refreshing the token fails, you may want to log the user out or redirect to the login page
                //console.error('Token refresh failed:', err);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error); // If the error is not a 401, just reject it
    }
);


api.interceptors.request.use((config) => {
    //console.log('Request Headers:', config.headers);
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;