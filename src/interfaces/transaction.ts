export interface Transaction {
  id: number;
  year: number;
  month: number;
  date: string;
  description: string;
  value: number;
  balance: number;
  type: string;
  organizationId: number;
  categoryId: number;
}
