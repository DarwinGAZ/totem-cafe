export type CategoryId = "quentes" | "gelados" | "salgados" | "doces";

export interface Category {
  id: CategoryId;
  label: string;
  glyph: string; // simple glyph/emoji stand-in for an icon set
}

export type SizeId = "p" | "m" | "g";

export interface SizeOption {
  id: SizeId;
  label: string;
  detail: string;
  priceDelta: number;
}

export type MilkId =
  | "integral"
  | "desnatado"
  | "aveia"
  | "amendoas"
  | "nenhum";

export interface MilkOption {
  id: MilkId;
  label: string;
  priceDelta: number;
}

export interface Product {
  id: string;
  categoryId: CategoryId;
  name: string;
  description: string;
  basePrice: number;
  tag?: string;
  customizable: boolean;
}

export interface CartCustomization {
  size?: SizeOption;
  milk?: MilkOption;
  extraShots: number;
  notes?: string;
}

export interface CartItem {
  lineId: string;
  product: Product;
  quantity: number;
  customization: CartCustomization;
}

export type OrderMode = "aqui" | "viagem";
