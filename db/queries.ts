// ====================================================================
// Organization
// ====================================================================
export const Get_Organization = `
  SELECT o.organization_id as id, o.name, os.delimiter, os.encoding 
  FROM organization o 
  INNER JOIN organization_settings os ON o.organization_id = os.organization_settings_id 
  WHERE o.organization_id = $1`;

// ====================================================================
// Transaction
// ====================================================================

export const SPROC_Insert_Transaction = `
  CALL insert_transaction($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

export const SPROC_Insert_Transaction_Credit = `
  CALL insert_transaction_credit($1, $2, $3, $4, $5, $6, $7)`;

// ====================================================================
// Category
// ====================================================================

export const Get_All_Categories = `
  SELECT * FROM category`;

export const Get_Category_Rules = `
  SELECT c.category_id, c.name, r.rule, o.operator
  FROM category c
  INNER JOIN category_rule cr ON cr.category_id = c.category_id
  INNER JOIN rule r ON r.rule_id = cr.rule_id
  INNER JOIN operator o ON o.operator_id = r.operator_id`;

export const Insert_Category = `
  Insert Into category (name) values ($1)`;


// ====================================================================
// Transactions
// ====================================================================

export const Get_Transactions = `
  SELECT t.transaction_id, t.date, t.description, t.value, t.type, o.name, c.name as category
  FROM transaction t 
  INNER JOIN Organization o ON o.organization_id = t.organization_id
  LEFT JOIN Category c ON c.category_id = t.category_id`;

export const Get_Transactions_by_year_month = `
  SELECT t.transaction_id, t.date, t.description, t.value, t.type, o.name, t.category_id, c.name as category
  FROM transaction t 
  INNER JOIN Organization o ON o.organization_id = t.organization_id
  LEFT JOIN Category c ON c.category_id = t.category_id
  WHERE t.year = $1 and t.month = $2`;

export const Get_Transactions_by_year = `
  SELECT t.transaction_id, t.date, t.description, t.value, t.type, o.name, c.name as category
  FROM transaction t 
  INNER JOIN Organization o ON o.organization_id = t.organization_id
  LEFT JOIN Category c ON c.category_id = t.category_id
  WHERE t.year = $1`;

export const Get_Grouped_Categories_by_year_month = `
  SELECT c.category_id, coalesce(c.name, 'Não Identificado') as name, sum(value)
  FROM transaction t
  LEFT JOIN category c ON c.category_id = t.category_id
  WHERE t.year = $1 and t.month = $2
  GROUP BY c.category_id, c.name`;

export const Get_Grouped_Categories_by_year = `
  SELECT c.category_id, coalesce(c.name, 'Outros') as name, sum(value)
  FROM transaction t
  LEFT JOIN category c ON c.category_id = t.category_id
  WHERE t.year = $1
  GROUP BY c.category_id, c.name`;

export const Get_Grouped_Categories = `
  SELECT c.category_id, coalesce(c.name, 'Outros') as name, sum(value)
  FROM transaction t
  LEFT JOIN category c ON c.category_id = t.category_id
  GROUP BY c.category_id, c.name`;

// export const Get_Grouped_Categories_by_year_month_without_credit = `
//   SELECT c.name, sum(value)
//   FROM transaction t
//   INNER JOIN category c ON c.category_id = t.category_id
//   WHERE t.year = $1 and t.month = $2 and value < 0
//   GROUP BY c.name`;

// export const Get_Grouped_Categories_by_year_without_credit = `
//   SELECT c.name, sum(value)
//   FROM transaction t
//   INNER JOIN category c ON c.category_id = t.category_id
//   WHERE t.year = $1 and t.month = $2 and value < 0
//   GROUP BY c.name`;

// export const Get_Grouped_Categories_without_credit = `
//   SELECT c.name, sum(value)
//   FROM transaction t
//   INNER JOIN category c ON c.category_id = t.category_id
//   WHERE t.year = $1 and t.month = $2 and value < 0
//   GROUP BY c.name`;

// ====================================================================
// Credit
// ====================================================================

export const Get_Credit_Transactions = `
  SELECT tc.transaction_credit_id, tc.date, tc.description, tc.value, o.name, c.name
  FROM transaction_credit tc
  INNER JOIN Organization o ON o.organization_id = tc.organization_id
  LEFT JOIN Category c ON c.category_id = tc.category_id`;

export const Get_Credit_Transactions_by_year_month = `
  SELECT tc.transaction_credit_id, tc.date, tc.description, tc.value, o.name, c.name
  FROM transaction_credit tc
  INNER JOIN Organization o ON o.organization_id = tc.organization_id
  LEFT JOIN Category c ON c.category_id = tc.category_id
  WHERE tc.year = $1 and tc.month = $2`;

export const Get_Credit_Transactions_by_year = `
  SELECT tc.transaction_credit_id, tc.date, tc.description, tc.value, o.name, c.name
  FROM transaction_credit tc
  INNER JOIN Organization o ON o.organization_id = tc.organization_id
  LEFT JOIN Category c ON c.category_id = tc.category_id
  WHERE tc.year = $1`;


