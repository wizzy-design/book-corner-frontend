export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
  };
}

export interface HealthApiResponse {
  status: string;
  database: string;
}

export interface AdminLoginResponse {
  token: string;
}
