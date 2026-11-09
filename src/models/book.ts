export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BooksApiResponse {
  data: Book[];
  limit: number;
  page: number;
  total: number;
}