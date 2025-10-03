export interface Product {
  id: number;
  type?: "bread" | "accompaniment";
  image?: string;
  name: string;
  price: string;
  totalPrice?: string;
  quantity: number;
  inTheCart: boolean;
} 