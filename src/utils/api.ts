import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = Cookies.get('admin_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'x-auth-token': token }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'An error occurred',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Network error or invalid response',
      };
    }
  }

  // Public endpoints
  async getProjects(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/projects`);
    return this.handleResponse(response);
  }

  async getPricing(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/pricing`);
    return this.handleResponse(response);
  }

  async incrementProjectView(projectId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/view`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    return this.handleResponse(response);
  }

  async submitContact(data: any): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  // Admin endpoints - Dashboard
  async getDashboardStats(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard-stats`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Admin endpoints - Projects
  async createProject(data: any): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/projects`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async updateProject(id: string, data: any): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async deleteProject(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Admin endpoints - Pricing
  async createPricing(data: any): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/pricing`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async updatePricing(id: string, data: any): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/pricing/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async deletePricing(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/pricing/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Admin endpoints - Contacts
  async getContacts(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/contacts`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getContact(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/contacts/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async deleteContact(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/contacts/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // File upload
  async uploadImage(file: File): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('image', file);

    const token = Cookies.get('admin_token');
    const response = await fetch(`${API_BASE_URL}/admin/upload`, {
      method: 'POST',
      headers: {
        ...(token && { 'x-auth-token': token }),
      },
      body: formData,
    });
    return this.handleResponse(response);
  }
}

export const api = new ApiService();