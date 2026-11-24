import type {
  Book,
  BooksApiResponse,
  SingleBookApiResponse,
  BookLookupApiResponse,
  CreateBookPayload,
} from "@/models/book";
import type { Tag, TagsApiResponse } from "@/models/tag";
import type {
  QuizQuestionsApiResponse,
  QuizRecommendApiResponse,
  QuizRecommendPayload,
} from "@/models/quiz";
import type {
  Order,
  SingleOrderApiResponse,
  CreateOrderPayload,
} from "@/models/order";
import type { HealthApiResponse, AdminLoginResponse, ApiErrorResponse } from "@/models/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://book-corner-api.onrender.com";

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string = "internal_error", status: number = 500) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorCode = "internal_error";
    let errorMessage = `Request failed with status ${res.status}`;

    try {
      const errJson = (await res.json()) as ApiErrorResponse;
      if (errJson?.error) {
        errorCode = errJson.error.code || errorCode;
        errorMessage = errJson.error.message || errorMessage;
      }
    } catch {
      // response wasn't json
    }

    throw new ApiError(errorMessage, errorCode, res.status);
  }

  // Handle 204 or empty responses
  if (res.status === 204) {
    return {} as T;
  }

  return (await res.json()) as T;
}

// ==========================================
// Public Storefront Endpoints
// ==========================================

export async function getHealth(): Promise<HealthApiResponse> {
  return request<HealthApiResponse>("/health", { cache: "no-store" });
}

export interface GetBooksParams {
  query?: string;
  genre?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

export async function getBooks(params: GetBooksParams = {}): Promise<BooksApiResponse> {
  const searchParams = new URLSearchParams();
  if (params.query) searchParams.set("query", params.query);
  if (params.genre) searchParams.set("genre", params.genre);
  if (params.tag) searchParams.set("tag", params.tag);
  if (params.page) searchParams.set("page", params.page.toString());
  if (params.limit) searchParams.set("limit", params.limit.toString());

  const qs = searchParams.toString();
  const path = qs ? `/books?${qs}` : "/books";

  return request<BooksApiResponse>(path, {
    next: { revalidate: 30 },
  });
}

export async function getBookById(id: number | string): Promise<Book> {
  const response = await request<SingleBookApiResponse>(`/books/${id}`, {
    next: { revalidate: 60 },
  });
  return response.data;
}

export async function getTags(): Promise<Tag[]> {
  const response = await request<TagsApiResponse>("/tags", {
    next: { revalidate: 300 },
  });
  return response.data ?? [];
}

export async function getQuizQuestions(): Promise<QuizQuestionsApiResponse> {
  return request<QuizQuestionsApiResponse>("/quiz/questions", {
    cache: "no-store",
  });
}

export async function submitQuizRecommendation(
  payload: QuizRecommendPayload
): Promise<Book[]> {
  const response = await request<QuizRecommendApiResponse>("/quiz/recommend", {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  return response.data ?? [];
}

export async function placeOrder(payload: CreateOrderPayload): Promise<Order> {
  const response = await request<SingleOrderApiResponse>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  return response.data;
}

// ==========================================
// Admin Endpoints
// ==========================================

export async function adminLogin(
  email: string,
  password: string
): Promise<AdminLoginResponse> {
  return request<AdminLoginResponse>("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function adminGetBooks(
  page: number = 1,
  limit: number = 12,
  token: string
): Promise<BooksApiResponse> {
  return request<BooksApiResponse>(
    `/admin/books?page=${page}&limit=${limit}`,
    { cache: "no-store" },
    token
  );
}

export async function adminLookupBook(
  q: string,
  token: string
): Promise<BookLookupApiResponse> {
  return request<BookLookupApiResponse>(
    `/admin/books/lookup?q=${encodeURIComponent(q)}`,
    { cache: "no-store" },
    token
  );
}

export async function adminCreateBook(
  payload: CreateBookPayload,
  token: string
): Promise<SingleBookApiResponse> {
  return request<SingleBookApiResponse>(
    "/admin/books",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token
  );
}

export async function adminUpdateBook(
  id: number,
  payload: CreateBookPayload,
  token: string
): Promise<SingleBookApiResponse> {
  return request<SingleBookApiResponse>(
    `/admin/books/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
    token
  );
}

export async function adminToggleBookStatus(
  id: number,
  status: "published" | "draft",
  token: string
): Promise<{ message?: string }> {
  return request<{ message?: string }>(
    `/admin/books/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
    token
  );
}

export async function adminDeleteBook(
  id: number,
  token: string
): Promise<{ message: string }> {
  return request<{ message: string }>(
    `/admin/books/${id}`,
    {
      method: "DELETE",
    },
    token
  );
}

export async function adminCreateTag(
  name: string,
  token: string
): Promise<{ data: Tag }> {
  return request<{ data: Tag }>(
    "/admin/tags",
    {
      method: "POST",
      body: JSON.stringify({ name }),
    },
    token
  );
}

export async function adminReplaceBookTags(
  bookId: number,
  tagIds: number[],
  token: string
): Promise<{ message?: string }> {
  return request<{ message?: string }>(
    `/admin/books/${bookId}/tags`,
    {
      method: "PUT",
      body: JSON.stringify({ tag_ids: tagIds }),
    },
    token
  );
}
