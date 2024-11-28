import { apiConfig, getApiUrl } from "@/config/api.config";

export const transactionsService = {
    getTransactions: async ({
        page = 1,
        limit = 10,
        startDate,
        endDate,
        category,
        minAmount,
        maxAmount,
        transactionType,
        search,
        sortBy = 'completionTime',
        sortOrder = 'desc',
        uploadId
    } = {}) => {
        try {
            const queryParams = new URLSearchParams({
                page: String(page),
                limit: String(limit),
                sortBy,
                sortOrder,
                uploadId
            });

            // Add optional filters to query params
            if (startDate) queryParams.append('startDate', startDate);
            if (endDate) queryParams.append('endDate', endDate);
            if (category) queryParams.append('category', category);
            if (minAmount) queryParams.append('minAmount', minAmount);
            if (maxAmount) queryParams.append('maxAmount', maxAmount);
            if (transactionType) queryParams.append('transactionType', transactionType);
            if (search) queryParams.append('search', search);

            const response = await fetch(
                getApiUrl(`/transactions?${queryParams.toString()}`),
                {
                    method: 'GET',
                    headers: apiConfig.getHeaders(true)
                }
            );
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch transactions');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    },

    getTransactionSummary: async (uploadId) => {
        try {
            const response = await fetch(
                getApiUrl(`/mpesa-transactions/${uploadId}/summary`),
                {
                    method: 'GET',
                    headers: apiConfig.getHeaders(true)
                }
            );
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch transaction summary');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching transaction summary:', error);
            throw error;
        }
    },

    uploadTransactionFile: async (file, source) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('source', source);

            const response = await fetch(
                getApiUrl('/credit-data/upload'),
                {
                    method: 'POST',
                    headers: {
                        ...apiConfig.getHeaders(true),
                        // Don't set Content-Type here as FormData will set it automatically
                        // with the correct boundary
                    },
                    body: formData
                }
            );
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to upload transaction file');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error uploading transaction file:', error);
            throw error;
        }
    },

    getUploadStatus: async (fileId) => {
        try {
            const response = await fetch(
                getApiUrl(`/credit-data/status/${fileId}`),
                {
                    method: 'GET',
                    headers: apiConfig.getHeaders(true)
                }
            );
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to get upload status');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error getting upload status:', error);
            throw error;
        }
    },

    getUploadHistory: async () => {
        try {
            const response = await fetch(
                getApiUrl('/credit-data/history'),
                {
                    method: 'GET',
                    headers: apiConfig.getHeaders(true)
                }
            );
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch upload history');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching upload history:', error);
            throw error;
        }
    },

    deleteUpload: async (fileId) => {
        try {
            const response = await fetch(
                getApiUrl(`/credit-data/${fileId}`),
                {
                    method: 'DELETE',
                    headers: apiConfig.getHeaders(true)
                }
            );
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete upload');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error deleting upload:', error);
            throw error;
        }
    }
};