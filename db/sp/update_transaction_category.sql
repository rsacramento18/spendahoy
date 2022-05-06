CREATE PROCEDURE update_transaction_category(
  transacationID int,
  categoryID int
)
LANGUAGE sql
AS $$
UPDATE transaction
SET category_id = categoryID
WHERE transaction_id = transacationID;
$$;
