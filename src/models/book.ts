import type { Tag } from "./tag";

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  status: "published" | "draft" | string;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
}

export interface SingleBookApiResponse {
  data: Book;
}

export interface BooksApiResponse {
  data: Book[];
  limit: number;
  page: number;
  total: number;
}

export interface BookLookupResult {
  title: string;
  author: string;
  description: string;
  image_url: string;
  suggested_tags: string[];
}

export interface BookLookupApiResponse {
  data: BookLookupResult[];
}

export interface CreateBookPayload {
  title: string;
  author: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  status: "published" | "draft";
  tag_ids?: number[];
}
