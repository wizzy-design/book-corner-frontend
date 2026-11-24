export interface OrderItem {
  id?: number;
  order_id?: number;
  book_id: number;
  book_title?: string;
  quantity: number;
  unit_price?: number;
}

export interface Order {
  id: number;
  customer_name: string;
  phone: string;
  email: string;
  address: string;
  note?: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | string;
  payment_status: "pending" | "paid" | "failed" | string;
  payment_method: "pay_on_delivery" | "paystack" | string;
  total: number;
  created_at: string;
  items: OrderItem[];
}

export interface SingleOrderApiResponse {
  data: Order;
}

export interface CreateOrderPayload {
  customer_name: string;
  phone: string;
  email: string;
  address: string;
  note?: string;
  payment_method: "pay_on_delivery" | "paystack" | string;
  items: {
    book_id: number;
    quantity: number;
  }[];
}
