export type Role = 'MANAGER' | 'STORE_KEEPER';

export type Session = {
  id: string;
  email: string;
  role: Role;
  accessToken: string;
};

export type Product = {
  id: string;
  name: string;
  commodityType: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
};
