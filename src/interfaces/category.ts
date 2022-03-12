export interface Category {
  id: number,
  category: string,
  rules: Rule[],
}

export interface Rule {
  rule: string,
  operator: string,
}
