import { auth } from "./firebase"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

// Helper function to get the current user's token
async function getAuthToken() {
  const user = auth.currentUser
  if (!user) return null

  try {
    return await user.getIdToken()
  } catch (error) {
    console.error("Error getting auth token:", error)
    return null
  }
}

// Generic fetch function with authentication
export async function fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await getAuthToken()

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || "An error occurred")
  }

  return response.json()
}

// Medicine API
export const medicineApi = {
  getAll: () => fetchWithAuth("/api/medicines"),
  getById: (id: string) => fetchWithAuth(`/api/medicines/${id}`),
  create: (data: any) =>
    fetchWithAuth("/api/medicines", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchWithAuth(`/api/medicines/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  requestMedicine: (data: any) =>
    fetchWithAuth("/api/medicines/request", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getRequests: () => fetchWithAuth("/api/medicines/requests/all"),
  getMyRequests: () => fetchWithAuth("/api/medicines/requests/my"),
  processRequest: (id: string, data: any) =>
    fetchWithAuth(`/api/medicines/requests/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}

// Health API
export const healthApi = {
  createReport: (data: any) =>
    fetchWithAuth("/api/health/reports", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getAllReports: () => fetchWithAuth("/api/health/reports"),
  getMyReports: () => fetchWithAuth("/api/health/reports/my"),
  getReportById: (id: string) => fetchWithAuth(`/api/health/reports/${id}`),
  updateReport: (id: string, data: any) =>
    fetchWithAuth(`/api/health/reports/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  addComment: (reportId: string, comment: string) =>
    fetchWithAuth(`/api/health/reports/${reportId}/comments`, {
      method: "POST",
      body: JSON.stringify({ comment }),
    }),
  getComments: (reportId: string) => fetchWithAuth(`/api/health/reports/${reportId}/comments`),
}

// User API
export const userApi = {
  getProfile: () => fetchWithAuth("/api/users/profile"),
  updateProfile: (data: any) =>
    fetchWithAuth("/api/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  getAllUsers: () => fetchWithAuth("/api/users"),
  getVeterinarians: () => fetchWithAuth("/api/users/veterinarians"),
}

// Notification API
export const notificationApi = {
  getAll: () => fetchWithAuth("/api/notifications"),
  markAsRead: (id: string) =>
    fetchWithAuth(`/api/notifications/${id}/read`, {
      method: "PUT",
    }),
}

// Location API
export const locationApi = {
  updateLocation: (data: any) =>
    fetchWithAuth("/api/locations", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  getNearbyServices: (latitude: number, longitude: number, radius?: number) =>
    fetchWithAuth(
      `/api/locations/services?latitude=${latitude}&longitude=${longitude}${radius ? `&radius=${radius}` : ""}`,
    ),
}

