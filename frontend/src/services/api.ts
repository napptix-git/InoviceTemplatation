import axios, { AxiosInstance } from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = {
  // Initialize app - get initial invoice data and clients
  async getInitialData(): Promise<{ [key: string]: any }> {
    try {
      const response = await axiosInstance.get('/api/invoice/initial');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch initial data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get all clients
  async getClients(): Promise<{ name: string; address?: string }[]> {
    try {
      const response = await axiosInstance.get('/api/clients');
      return response.data.clients || [];
    } catch (error) {
      // Return empty array if clients endpoint doesn't exist
      return [];
    }
  },

  // Add new client
  async addClient(name: string, address: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axiosInstance.post('/api/clients/add', { name, address });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to add client: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Save invoice
  async saveInvoice(data: { [key: string]: any }): Promise<{ success: boolean; output_path: string }> {
    try {
      const response = await axiosInstance.post('/api/invoice/save', data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to save invoice: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get next invoice number
  async getNextInvoiceNumber(): Promise<string> {
    try {
      const response = await axiosInstance.get('/api/invoice/next-number');
      return response.data.number;
    } catch (error) {
      return 'AUTO-GENERATED';
    }
  },

  // Validate invoice data
  async validateInvoice(data: { [key: string]: any }): Promise<{ valid: boolean; errors?: string[] }> {
    try {
      const response = await axiosInstance.post('/api/invoice/validate', data);
      return response.data;
    } catch (error) {
      throw new Error(`Validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};
