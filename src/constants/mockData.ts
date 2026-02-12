
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string | null;
  colors: string[];
}

export interface DeviceSummary {
  id: number;
  name: string;
  chargingType: string;
  color: string;
  image: string | null;
}
