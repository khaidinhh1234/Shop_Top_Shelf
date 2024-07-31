export interface IProduct {
  productId: any;
  _id?: string;
  name: string;
  category?: string;
  regular_price: number;
  quantity: number;
  description?: string;
  discount: number;
  featured?: boolean;
  countIn_stock?: number;
  feature_image?: string;
  gallery_images?: string[];
}
